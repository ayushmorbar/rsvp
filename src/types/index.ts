// User types
export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  eduEmail?: string;
  eduVerified: boolean;
  firstName: string;
  lastName: string;
  displayName: string;
  phone?: string;
  profileImageUrl?: string;
  campusId?: string;
  campus?: Campus;
  interests: string[];
  preferences: UserPreferences;
  role: 'user' | 'organizer' | 'admin';
  createdAt: string;
  updatedAt: string;
  lastActiveAt: string;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    eventReminders: boolean;
    eventUpdates: boolean;
    friendActivity: boolean;
    recommendations: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'campus' | 'private';
    showAttendingEvents: boolean;
    allowFriendRequests: boolean;
  };
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
    screenReader: boolean;
  };
  ai: {
    enableAutoFill: boolean;
    enableRecommendations: boolean;
    shareDataForInsights: boolean;
  };
}

// Campus types
export interface Campus {
  id: string;
  name: string;
  slug: string;
  domain: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    country: string;
  };
  timezone: string;
  settings: CampusSettings;
  verified: boolean;
  createdAt: string;
}

export interface CampusSettings {
  allowPublicEvents: boolean;
  requireOrganizerVerification: boolean;
  autoApproveEvents: boolean;
  customCategories: string[];
  branding?: {
    primaryColor: string;
    logo?: string;
  };
}

// Event types
export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  bannerImageUrl?: string;
  
  // Organizer info
  organizer: User;
  organizerId: string;
  organization?: Organization;
  organizationId?: string;
  
  // Location and timing
  startDateTime: string;
  endDateTime?: string;
  timezone: string;
  location: EventLocation;
  
  // Event configuration
  category: EventCategory;
  tags: string[];
  isFree: boolean;
  ticketPrice?: number;
  currency: string;
  venueCapacity?: number;
  requiresApproval: boolean;
  allowWaitlist: boolean;
  
  // Visibility and status
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  visibility: 'public' | 'private' | 'campus_only';
  featured: boolean;
  
  // Analytics
  viewCount: number;
  rsvpCount: number;
  checkinCount: number;
  waitlistCount: number;
  
  // Relations
  campus?: Campus;
  campusId?: string;
  rsvps?: RSVP[];
  reviews?: Review[];
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface EventLocation {
  name: string;
  address?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  instructions?: string;
  isVirtual: boolean;
  virtualUrl?: string;
  virtualPlatform?: string;
}

export type EventCategory = 
  | 'workshop'
  | 'social'
  | 'academic'
  | 'sports'
  | 'cultural'
  | 'career'
  | 'volunteer'
  | 'entertainment'
  | 'networking'
  | 'other';

// RSVP types
export interface RSVP {
  id: string;
  event: Event;
  eventId: string;
  user: User;
  userId: string;
  status: 'confirmed' | 'waitlisted' | 'cancelled';
  rsvpData: RSVPData;
  checkedIn: boolean;
  checkinTime?: string;
  plusOnes: number;
  guestNames: string[];
  qrCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface RSVPData {
  dietary?: string[];
  accessibility?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  customFields?: Record<string, any>;
  notes?: string;
}

// Organization types
export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  verified: boolean;
  campus?: Campus;
  campusId?: string;
  adminUserId: string;
  contactEmail: string;
  socialLinks: {
    website?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
  };
  members: OrganizationMember[];
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationMember {
  id: string;
  user: User;
  userId: string;
  organization: Organization;
  organizationId: string;
  role: 'admin' | 'moderator' | 'member';
  permissions: string[];
  joinedAt: string;
}

// Review types
export interface Review {
  id: string;
  event: Event;
  eventId: string;
  user: User;
  userId: string;
  rating: number; // 1-5
  reviewText?: string;
  helpfulCount: number;
  flagged: boolean;
  createdAt: string;
  updatedAt: string;
}

// Notification types
export interface Notification {
  id: string;
  user: User;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data: Record<string, any>;
  read: boolean;
  actionUrl?: string;
  sentAt: string;
  readAt?: string;
}

export type NotificationType =
  | 'event_reminder'
  | 'event_update'
  | 'event_cancelled'
  | 'waitlist_promotion'
  | 'friend_rsvp'
  | 'new_review'
  | 'organization_invite'
  | 'system_announcement';

// API types
export interface ApiResponse<T = any> {
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

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface EventFilters {
  category?: EventCategory[];
  startDate?: string;
  endDate?: string;
  location?: string;
  isFree?: boolean;
  campusOnly?: boolean;
  search?: string;
  tags?: string[];
}

// Form types
export interface EventFormData {
  title: string;
  description: string;
  shortDescription?: string;
  category: EventCategory;
  tags: string[];
  startDateTime: string;
  endDateTime?: string;
  timezone: string;
  location: {
    name: string;
    address?: string;
    isVirtual: boolean;
    virtualUrl?: string;
    instructions?: string;
  };
  isFree: boolean;
  ticketPrice?: number;
  venueCapacity?: number;
  requiresApproval: boolean;
  allowWaitlist: boolean;
  visibility: 'public' | 'private' | 'campus_only';
  bannerImage?: File;
}

export interface RSVPFormData {
  dietary?: string[];
  accessibility?: string[];
  plusOnes?: number;
  guestNames?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  notes?: string;
  customFields?: Record<string, any>;
}

// Auth types
export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'organizer' | 'admin';
  campusId?: string;
  verified: boolean;
  profileComplete: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  campusId?: string;
  interests?: string[];
  agreeToTerms: boolean;
}

// Analytics types
export interface EventAnalytics {
  eventId: string;
  metrics: {
    views: number;
    uniqueViews: number;
    rsvps: number;
    checkins: number;
    noShows: number;
    waitlistConversions: number;
    conversionRate: number;
    attendanceRate: number;
  };
  demographics: {
    campusBreakdown: Record<string, number>;
    yearBreakdown: Record<string, number>;
    interestBreakdown: Record<string, number>;
  };
  timeSeriesData: {
    date: string;
    views: number;
    rsvps: number;
  }[];
  trafficSources: {
    source: string;
    visits: number;
    conversions: number;
  }[];
}

// Error types
export interface AppError {
  code: string;
  message: string;
  statusCode?: number;
  details?: any;
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
