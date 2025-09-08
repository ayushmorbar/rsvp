# Technical Architecture & Implementation - RSVP by Offbeats

## Architecture Overview

### System Philosophy
- **API-First Design**: Enable future integrations and mobile apps
- **Microservices Architecture**: Scalable, maintainable, independently deployable
- **Cloud-Native**: Auto-scaling, fault-tolerant, cost-optimized
- **Mobile-First**: PWA with native app capabilities
- **Security by Design**: End-to-end encryption, zero-trust architecture

### Technology Stack

#### Frontend Stack
```typescript
// Core Framework
React 18+ with TypeScript
- Next.js 14+ for SSR/SSG and routing
- TailwindCSS for utility-first styling
- Framer Motion for micro-interactions
- React Query for state management and caching

// PWA Capabilities
- Service Workers for offline functionality
- Web App Manifest for home screen installation
- Background Sync for offline actions
- Push Notifications API for engagement

// Performance Optimizations
- Code splitting with dynamic imports
- Image optimization with Next.js Image
- Bundle analysis and tree shaking
- Critical CSS inlining
```

**Alternative Consideration:** React Native for future native apps, sharing 80%+ business logic

#### Backend Stack
```javascript
// Core Framework: Node.js + NestJS
// Rationale: TypeScript consistency, excellent DX, built-in validation

// API Architecture
- RESTful APIs with OpenAPI documentation
- GraphQL for complex data fetching (future)
- WebSocket for real-time features
- Rate limiting and request validation

// Database Layer
- Primary: PostgreSQL 15+ for relational data
- Caching: Redis for sessions and hot data
- Search: Elasticsearch for event discovery
- Files: AWS S3 or Cloudflare R2 for media storage

// Authentication & Security
- JWT with refresh token rotation
- OAuth 2.0 (Google, Apple, Microsoft)
- bcrypt for password hashing
- Helmet.js for security headers
```

#### Infrastructure & DevOps
```yaml
# Cloud Platform: AWS (cost-effective scaling)
# Alternative: Vercel + Supabase for faster MVP

# Container Orchestration
- Docker for containerization
- AWS ECS/Fargate for container management
- Application Load Balancer for traffic distribution

# Infrastructure as Code
- Terraform for infrastructure provisioning
- GitHub Actions for CI/CD pipeline
- AWS CloudFormation for AWS resources

# Monitoring & Observability
- AWS CloudWatch for basic monitoring
- Sentry for error tracking and performance
- PostHog for product analytics
- Grafana for custom dashboards
```

---

## Database Design

### Entity Relationship Model

```sql
-- Core Entities
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    edu_email VARCHAR(255) UNIQUE,
    edu_verified BOOLEAN DEFAULT FALSE,
    password_hash VARCHAR(255),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    profile_image_url TEXT,
    campus_id UUID REFERENCES campuses(id),
    interests JSONB DEFAULT '[]',
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_active_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    logo_url TEXT,
    campus_id UUID REFERENCES campuses(id),
    verified BOOLEAN DEFAULT FALSE,
    admin_user_id UUID REFERENCES users(id),
    contact_email VARCHAR(255),
    social_links JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    banner_image_url TEXT,
    organizer_id UUID REFERENCES users(id) NOT NULL,
    organization_id UUID REFERENCES organizations(id),
    campus_id UUID REFERENCES campuses(id),
    
    -- Event Details
    start_datetime TIMESTAMP NOT NULL,
    end_datetime TIMESTAMP,
    timezone VARCHAR(50) DEFAULT 'UTC',
    location_name VARCHAR(255),
    location_address TEXT,
    location_coordinates POINT,
    venue_capacity INTEGER,
    
    -- Event Configuration
    category VARCHAR(100) NOT NULL,
    tags JSONB DEFAULT '[]',
    is_free BOOLEAN DEFAULT TRUE,
    ticket_price DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    requires_approval BOOLEAN DEFAULT FALSE,
    allow_waitlist BOOLEAN DEFAULT TRUE,
    
    -- Status and Visibility
    status VARCHAR(50) DEFAULT 'draft', -- draft, published, cancelled, completed
    visibility VARCHAR(50) DEFAULT 'public', -- public, private, campus_only
    featured BOOLEAN DEFAULT FALSE,
    
    -- Analytics
    view_count INTEGER DEFAULT 0,
    rsvp_count INTEGER DEFAULT 0,
    checkin_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    published_at TIMESTAMP,
    
    -- Constraints
    CONSTRAINT valid_status CHECK (status IN ('draft', 'published', 'cancelled', 'completed')),
    CONSTRAINT valid_visibility CHECK (visibility IN ('public', 'private', 'campus_only')),
    CONSTRAINT valid_datetime CHECK (end_datetime IS NULL OR end_datetime > start_datetime)
);

CREATE TABLE rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) NOT NULL,
    user_id UUID REFERENCES users(id) NOT NULL,
    
    -- RSVP Details
    status VARCHAR(50) DEFAULT 'confirmed', -- confirmed, waitlisted, cancelled
    rsvp_data JSONB DEFAULT '{}', -- dietary restrictions, accessibility needs, etc.
    checked_in BOOLEAN DEFAULT FALSE,
    checkin_time TIMESTAMP,
    
    -- Guest Information
    plus_ones INTEGER DEFAULT 0,
    guest_names JSONB DEFAULT '[]',
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Constraints
    UNIQUE(event_id, user_id),
    CONSTRAINT valid_status CHECK (status IN ('confirmed', 'waitlisted', 'cancelled'))
);

CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) NOT NULL,
    user_id UUID REFERENCES users(id) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Constraints
    UNIQUE(event_id, user_id)
);

-- Supporting Tables
CREATE TABLE campuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    domain VARCHAR(255) UNIQUE NOT NULL, -- for email verification
    location POINT,
    timezone VARCHAR(50),
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) NOT NULL,
    type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}',
    read BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP DEFAULT NOW(),
    read_at TIMESTAMP
);
```

### Indexing Strategy

```sql
-- Performance Indexes
CREATE INDEX idx_events_start_datetime ON events(start_datetime);
CREATE INDEX idx_events_campus_category ON events(campus_id, category) WHERE status = 'published';
CREATE INDEX idx_events_organizer ON events(organizer_id);
CREATE INDEX idx_events_search ON events USING gin(to_tsvector('english', title || ' ' || description));

-- User Activity Indexes
CREATE INDEX idx_rsvps_user_status ON rsvps(user_id, status);
CREATE INDEX idx_rsvps_event_status ON rsvps(event_id, status);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, read);

-- Geospatial Indexes
CREATE INDEX idx_events_location ON events USING gist(location_coordinates);
CREATE INDEX idx_campuses_location ON campuses USING gist(location);
```

### Data Migration Strategy

```javascript
// Migration versioning system
const migrations = [
  {
    version: '001_initial_schema',
    up: async (db) => {
      // Create initial tables
    },
    down: async (db) => {
      // Rollback changes
    }
  },
  {
    version: '002_add_ai_features',
    up: async (db) => {
      // Add AI-related columns
      await db.query(`
        ALTER TABLE users ADD COLUMN ai_preferences JSONB DEFAULT '{}';
        ALTER TABLE events ADD COLUMN ai_metadata JSONB DEFAULT '{}';
      `);
    }
  }
];
```

---

## API Design

### RESTful API Structure

```typescript
// API Versioning and Structure
const API_BASE = '/api/v1';

// Authentication Endpoints
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
POST   /api/v1/auth/verify-email
POST   /api/v1/auth/forgot-password

// User Management
GET    /api/v1/users/me
PUT    /api/v1/users/me
PUT    /api/v1/users/me/preferences
POST   /api/v1/users/me/verify-edu-email
GET    /api/v1/users/me/events
GET    /api/v1/users/me/rsvps

// Event Discovery
GET    /api/v1/events
GET    /api/v1/events/featured
GET    /api/v1/events/search
GET    /api/v1/events/:id
GET    /api/v1/events/:id/similar
GET    /api/v1/events/:id/attendees

// Event Management (Organizers)
POST   /api/v1/events
PUT    /api/v1/events/:id
DELETE /api/v1/events/:id
POST   /api/v1/events/:id/publish
GET    /api/v1/events/:id/analytics
POST   /api/v1/events/:id/announcements

// RSVP Management
POST   /api/v1/events/:id/rsvp
PUT    /api/v1/events/:id/rsvp
DELETE /api/v1/events/:id/rsvp
POST   /api/v1/events/:id/checkin

// Reviews and Ratings
POST   /api/v1/events/:id/reviews
GET    /api/v1/events/:id/reviews
PUT    /api/v1/reviews/:id
DELETE /api/v1/reviews/:id
```

### API Response Standards

```typescript
// Standard Response Format
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    filters?: Record<string, any>;
  };
}

// Example Event Response
interface EventResponse {
  id: string;
  title: string;
  description: string;
  organizer: {
    id: string;
    name: string;
    verified: boolean;
  };
  datetime: {
    start: string; // ISO 8601
    end?: string;
    timezone: string;
  };
  location: {
    name: string;
    address?: string;
    coordinates?: [number, number]; // [lat, lng]
  };
  capacity?: number;
  rsvpCount: number;
  userRsvpStatus?: 'confirmed' | 'waitlisted' | null;
  friends: {
    attending: number;
    total: number;
  };
  tags: string[];
  images: {
    banner?: string;
    thumbnail?: string;
  };
  pricing: {
    isFree: boolean;
    price?: number;
    currency?: string;
  };
}
```

### Rate Limiting Strategy

```typescript
// Rate limiting configuration
const rateLimits = {
  // General API access
  general: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // requests per window
  },
  
  // Authentication endpoints
  auth: {
    windowMs: 15 * 60 * 1000,
    max: 5, // prevent brute force
  },
  
  // Event creation
  eventCreation: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // prevent spam
  },
  
  // Search endpoints
  search: {
    windowMs: 60 * 1000, // 1 minute
    max: 30, // allow frequent searches
  }
};
```

---

## Security Implementation

### Authentication & Authorization

```typescript
// JWT Token Structure
interface JWTPayload {
  sub: string; // user ID
  email: string;
  role: 'user' | 'organizer' | 'admin';
  campus_id?: string;
  verified: boolean;
  iat: number;
  exp: number;
}

// Role-based access control
const permissions = {
  user: [
    'events:read',
    'events:rsvp',
    'profile:update',
    'reviews:create'
  ],
  organizer: [
    ...permissions.user,
    'events:create',
    'events:update',
    'events:analytics',
    'announcements:send'
  ],
  admin: [
    ...permissions.organizer,
    'users:moderate',
    'events:moderate',
    'campus:manage'
  ]
};
```

### Data Protection

```typescript
// Encryption for sensitive data
import { encrypt, decrypt } from './crypto';

// Personal data encryption
const encryptPersonalData = (data: any) => {
  const sensitiveFields = ['phone', 'address', 'emergency_contact'];
  const encrypted = { ...data };
  
  sensitiveFields.forEach(field => {
    if (encrypted[field]) {
      encrypted[field] = encrypt(encrypted[field]);
    }
  });
  
  return encrypted;
};

// Database connection security
const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    require: true,
    rejectUnauthorized: true,
    ca: process.env.DB_SSL_CA,
  },
  // Connection pooling
  pool: {
    min: 2,
    max: 10,
    idle: 10000,
  },
};
```

### Input Validation & Sanitization

```typescript
// Validation schemas using Joi
import Joi from 'joi';

const eventCreateSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(5000).required(),
  startDateTime: Joi.date().greater('now').required(),
  endDateTime: Joi.date().greater(Joi.ref('startDateTime')),
  location: Joi.object({
    name: Joi.string().max(255).required(),
    address: Joi.string().max(500),
    coordinates: Joi.array().length(2).items(Joi.number())
  }).required(),
  capacity: Joi.number().integer().min(1).max(10000),
  category: Joi.string().valid('workshop', 'social', 'academic', 'sports', 'cultural').required(),
  tags: Joi.array().items(Joi.string().max(50)).max(10),
  isPrivate: Joi.boolean().default(false)
});

// Sanitization middleware
const sanitizeInput = (req, res, next) => {
  const sanitize = (obj) => {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'string') {
        obj[key] = DOMPurify.sanitize(obj[key]);
      } else if (typeof obj[key] === 'object') {
        sanitize(obj[key]);
      }
    });
  };
  
  sanitize(req.body);
  next();
};
```

---

## Performance Optimization

### Caching Strategy

```typescript
// Multi-level caching
const cacheStrategy = {
  // Level 1: Application-level caching
  memory: {
    userSessions: '15m',
    eventDetails: '5m',
    searchResults: '2m'
  },
  
  // Level 2: Redis caching
  redis: {
    eventFeed: '10m',
    userPreferences: '1h',
    popularEvents: '30m',
    campusData: '24h'
  },
  
  // Level 3: CDN caching
  cdn: {
    staticAssets: '30d',
    images: '7d',
    apiResponses: '5m'
  }
};

// Cache implementation
class CacheService {
  async get(key: string, fallback: () => Promise<any>) {
    // Try memory cache first
    let data = memoryCache.get(key);
    if (data) return data;
    
    // Try Redis cache
    data = await redisClient.get(key);
    if (data) {
      memoryCache.set(key, JSON.parse(data));
      return JSON.parse(data);
    }
    
    // Execute fallback and cache result
    data = await fallback();
    await redisClient.setex(key, 300, JSON.stringify(data));
    memoryCache.set(key, data);
    
    return data;
  }
}
```

### Database Optimization

```sql
-- Query optimization examples
-- Optimized event discovery query
SELECT 
  e.id, e.title, e.start_datetime, e.location_name,
  e.rsvp_count, e.banner_image_url,
  o.name as organizer_name, o.verified as organizer_verified,
  (
    SELECT COUNT(*) 
    FROM rsvps r 
    JOIN users u ON r.user_id = u.id 
    WHERE r.event_id = e.id 
      AND r.status = 'confirmed'
      AND u.id IN (SELECT friend_id FROM user_friends WHERE user_id = $1)
  ) as friends_attending
FROM events e
JOIN users o ON e.organizer_id = o.id
WHERE e.status = 'published'
  AND e.start_datetime > NOW()
  AND (e.campus_id = $2 OR e.visibility = 'public')
ORDER BY 
  CASE WHEN e.featured THEN 0 ELSE 1 END,
  e.start_datetime ASC
LIMIT $3 OFFSET $4;

-- Materialized view for popular events
CREATE MATERIALIZED VIEW popular_events AS
SELECT 
  e.*,
  (e.rsvp_count::float / GREATEST(e.view_count, 1)) as conversion_rate,
  (e.rsvp_count + e.view_count * 0.1) as popularity_score
FROM events e
WHERE e.status = 'published'
  AND e.start_datetime > NOW() - INTERVAL '7 days';

-- Refresh materialized view hourly
CREATE OR REPLACE FUNCTION refresh_popular_events()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY popular_events;
END;
$$ LANGUAGE plpgsql;
```

### Image Optimization

```typescript
// Image processing pipeline
import sharp from 'sharp';

const processEventImage = async (buffer: Buffer) => {
  const sizes = [
    { name: 'thumbnail', width: 300, height: 200 },
    { name: 'card', width: 600, height: 400 },
    { name: 'banner', width: 1200, height: 600 },
    { name: 'hero', width: 1920, height: 1080 }
  ];
  
  const processed = await Promise.all(
    sizes.map(async (size) => {
      const resized = await sharp(buffer)
        .resize(size.width, size.height, { 
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 85 })
        .toBuffer();
      
      return {
        size: size.name,
        buffer: resized,
        url: await uploadToS3(resized, `images/${size.name}/`)
      };
    })
  );
  
  return processed;
};
```

---

## Monitoring & Observability

### Application Monitoring

```typescript
// Performance monitoring with custom metrics
import { createPrometheusMetrics } from './metrics';

const metrics = createPrometheusMetrics();

// Custom metrics
const eventCreationDuration = metrics.histogram({
  name: 'event_creation_duration_seconds',
  help: 'Time spent creating events',
  labelNames: ['user_type', 'campus']
});

const rsvpConversionRate = metrics.gauge({
  name: 'rsvp_conversion_rate',
  help: 'Percentage of event views that convert to RSVPs',
  labelNames: ['event_category', 'campus']
});

// Middleware for request tracing
const tracingMiddleware = (req, res, next) => {
  const startTime = Date.now();
  const traceId = generateTraceId();
  
  req.traceId = traceId;
  res.setHeader('X-Trace-ID', traceId);
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    
    // Log request details
    logger.info({
      traceId,
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      userAgent: req.get('User-Agent'),
      ip: req.ip
    });
    
    // Update metrics
    metrics.httpRequestDuration
      .labels(req.method, res.statusCode)
      .observe(duration / 1000);
  });
  
  next();
};
```

### Error Tracking

```typescript
// Centralized error handling
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    new Sentry.Integrations.Prisma({ client: prisma })
  ],
  tracesSampleRate: 0.1,
});

// Global error handler
const errorHandler = (error, req, res, next) => {
  const { statusCode = 500, message } = error;
  
  // Log error with context
  logger.error({
    error: error.message,
    stack: error.stack,
    traceId: req.traceId,
    userId: req.user?.id,
    url: req.url,
    method: req.method
  });
  
  // Send to Sentry for production errors
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, {
      user: { id: req.user?.id },
      tags: { component: 'api' },
      contexts: {
        request: {
          url: req.url,
          method: req.method,
          headers: req.headers
        }
      }
    });
  }
  
  // Return appropriate error response
  res.status(statusCode).json({
    success: false,
    error: {
      code: error.code || 'INTERNAL_SERVER_ERROR',
      message: process.env.NODE_ENV === 'production' 
        ? 'An unexpected error occurred' 
        : message
    },
    traceId: req.traceId
  });
};
```

### Health Checks

```typescript
// Health check endpoints
const healthChecks = {
  '/health': async () => {
    return { status: 'healthy', timestamp: new Date().toISOString() };
  },
  
  '/health/ready': async () => {
    const checks = await Promise.allSettled([
      // Database connectivity
      prisma.$queryRaw`SELECT 1`,
      
      // Redis connectivity
      redisClient.ping(),
      
      // External services
      fetch(process.env.EMAIL_SERVICE_URL + '/health'),
      
      // File storage
      s3Client.headBucket({ Bucket: process.env.S3_BUCKET }).promise()
    ]);
    
    const failed = checks.filter(check => check.status === 'rejected');
    
    if (failed.length > 0) {
      throw new Error(`Health check failed: ${failed.length} services down`);
    }
    
    return { 
      status: 'ready', 
      checks: checks.length,
      timestamp: new Date().toISOString() 
    };
  },
  
  '/health/live': async () => {
    // Basic liveness check
    const uptime = process.uptime();
    const memUsage = process.memoryUsage();
    
    return {
      status: 'alive',
      uptime: `${Math.floor(uptime / 60)} minutes`,
      memory: {
        used: `${Math.round(memUsage.heapUsed / 1024 / 1024)} MB`,
        total: `${Math.round(memUsage.heapTotal / 1024 / 1024)} MB`
      }
    };
  }
};
```

---

## Deployment Strategy

### Environment Configuration

```yaml
# docker-compose.yml for local development
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@db:5432/rsvp_dev
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    volumes:
      - ./src:/app/src
      - ./public:/app/public

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: rsvp_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:integration
      - run: npm run test:e2e
      
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Build and push Docker image
        run: |
          docker build -t rsvp-app .
          docker tag rsvp-app:latest $ECR_REGISTRY/rsvp-app:latest
          docker push $ECR_REGISTRY/rsvp-app:latest
      
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to ECS
        run: |
          aws ecs update-service \
            --cluster rsvp-cluster \
            --service rsvp-service \
            --force-new-deployment
```

### Infrastructure as Code

```hcl
# terraform/main.tf
provider "aws" {
  region = "us-east-1"
}

# VPC and Networking
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "rsvp-vpc"
  }
}

# Application Load Balancer
resource "aws_lb" "main" {
  name               = "rsvp-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets           = aws_subnet.public[*].id

  enable_deletion_protection = false
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "rsvp-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

# RDS Instance
resource "aws_db_instance" "main" {
  identifier = "rsvp-db"
  
  engine         = "postgres"
  engine_version = "15.3"
  instance_class = "db.t3.micro"
  
  allocated_storage     = 20
  max_allocated_storage = 100
  storage_encrypted     = true
  
  db_name  = "rsvp"
  username = var.db_username
  password = var.db_password
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  skip_final_snapshot = true
}

# ElastiCache Redis
resource "aws_elasticache_subnet_group" "main" {
  name       = "rsvp-cache-subnet"
  subnet_ids = aws_subnet.private[*].id
}

resource "aws_elasticache_cluster" "main" {
  cluster_id           = "rsvp-cache"
  engine               = "redis"
  node_type           = "cache.t3.micro"
  num_cache_nodes     = 1
  parameter_group_name = "default.redis7"
  port                = 6379
  subnet_group_name   = aws_elasticache_subnet_group.main.name
  security_group_ids  = [aws_security_group.redis.id]
}
```

---

*This technical architecture provides a robust, scalable foundation for RSVP by Offbeats while maintaining cost efficiency during the MVP phase and clear scaling paths for future growth.*
