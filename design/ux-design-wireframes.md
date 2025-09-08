# UX Design & Wireframes - RSVP by Offbeats

## User-Centered Design (UCD) Process

### 4-Phase Iterative Loop Implementation

**1. Research Phase (Completed)**
- User interviews with 12 students/organizers
- Social listening analysis across 5 platforms
- Competitive UX audit of 5 major platforms
- Accessibility requirements gathering

**2. Requirements Phase (Current)**
- Persona-driven feature requirements
- Accessibility baseline (WCAG 2.1 AA)
- Performance targets (mobile-first)
- Content strategy and information architecture

**3. Design Phase (Next)**
- Low-fidelity wireframes and user flows
- Interactive prototypes for key journeys
- Visual design system and component library
- Responsive design patterns

**4. Evaluation Phase (Ongoing)**
- Usability testing with 5-8 users per iteration
- Accessibility testing with assistive technologies
- Performance validation on target devices
- A/B testing of critical conversion flows

---

## Design Principles

### 1. Mobile-First Simplicity
**Principle:** Design for thumb-friendly interaction on small screens first
- Touch targets minimum 44px with adequate spacing
- Critical actions within thumb reach (bottom 60% of screen)
- Progressive disclosure to reduce cognitive load
- Single-hand operation for primary flows

### 2. Accessibility by Design
**Principle:** WCAG 2.1 AA compliance is baseline, not afterthought
- 4.5:1 color contrast ratio minimum
- Keyboard navigation for all interactive elements
- Screen reader compatible semantic markup
- Reduced motion options for vestibular disorders

### 3. Contextual Intelligence
**Principle:** Leverage context to reduce user effort
- Auto-fill based on user profile and behavior
- Smart defaults based on campus and event type
- Progressive profiling to reduce form friction
- Predictive text and autocomplete for common fields

### 4. Social Trust Signals
**Principle:** Surface peer validation and community proof
- Campus verification badges for authenticity
- Friend activity and attendance visibility
- Peer reviews and rating aggregation
- Organizer reputation and history display

### 5. Feedback & Delight
**Principle:** Provide clear feedback with subtle delight moments
- Immediate visual confirmation of actions
- Loading states with progress indication
- Success celebrations that don't interrupt
- Error prevention over error correction

---

## Information Architecture

### Primary Navigation Structure
```
Home Feed (Discovery)
├── Event Categories
├── Campus Events
├── Nearby Events
└── Search & Filters

Event Detail
├── Core Information
├── Social Proof
├── RSVP Action
└── Organizer Profile

My Events
├── Upcoming RSVPs
├── Past Events
├── My Created Events (organizers)
└── Saved/Interested

Profile & Settings
├── Personal Information
├── Campus Verification
├── Notification Preferences
└── Privacy Controls
```

### Content Hierarchy Strategy
1. **Visual First:** Event images drive initial attention
2. **Essential Info:** Date, time, location immediately visible
3. **Social Proof:** Friend attendance and ratings prominent
4. **Action Oriented:** RSVP/save actions always accessible
5. **Progressive Detail:** Additional info revealed on demand

---

## Low-Fidelity Wireframes

### 1. Discovery Feed (Home Screen)

```
┌─────────────────────────────────────┐
│ ☰  RSVP by Offbeats    🔍  👤      │
├─────────────────────────────────────┤
│ 📍 On Campus  🏷️ All  📅 This Week  │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │     [Event Image/Banner]        │ │
│ │                                 │ │
│ │ Workshop: UX Design Basics      │ │
│ │ 📅 Sep 12, 6:00 PM             │ │
│ │ 📍 Student Center, Room 201     │ │
│ │ 👥 23 going • 2 friends         │ │
│ │ ⭐ 4.8 (12 reviews)             │ │
│ │                     [❤️ RSVP]   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │     [Event Image/Banner]        │ │
│ │                                 │ │
│ │ Coffee & Code: Python Study     │ │
│ │ 📅 Sep 13, 7:00 PM             │ │
│ │ 📍 Library Collaboration Space  │ │
│ │ 👥 8 going • 1 friend           │ │
│ │ ⭐ New Event                    │ │
│ │                     [❤️ RSVP]   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Load More Events...]               │
│                                     │
├─────────────────────────────────────┤
│ 🏠 Home  🎫 My Events  ➕ Create  👤│
└─────────────────────────────────────┘
```

**Key UX Decisions:**
- **Visual cards** dominate to leverage image-driven discovery
- **Essential info** (date, location, attendance) immediately visible
- **Social proof** (friends going, ratings) prominent for trust
- **One-tap RSVP** directly from feed reduces friction
- **Campus filter** default for student-relevant content

---

### 2. Event Detail Page

```
┌─────────────────────────────────────┐
│ ← Back              ⋯ More  ❤️ Save │
├─────────────────────────────────────┤
│        [Large Event Banner]         │
│                                     │
├─────────────────────────────────────┤
│ UX Design Workshop: From Zero to    │
│ Hero in 3 Hours                     │
│                                     │
│ Hosted by Design Club ✓            │
│ ⭐ 4.8 (12 reviews) • Free Event    │
│                                     │
│ 📅 Sep 12, 2025 at 6:00 PM         │
│ 📍 Student Center, Room 201         │
│ 👥 23 going • 2 of your friends     │
│ 📊 25 spots remaining               │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │        🎟️ RSVP NOW            │ │
│ │      (One-click signup)         │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 📝 About This Event                 │
│ Learn the fundamentals of UX design │
│ through hands-on activities. Perfect│
│ for beginners! Bring a laptop.      │
│                                     │
│ 🏷️ Tags: Workshop, Design, Beginner │
│                                     │
│ 👥 Who's Going (25)                 │
│ [Sarah M.] [Jake P.] [+23 more]     │
│                                     │
│ ⭐ Reviews (12)                      │
│ "Amazing workshop! Very practical"   │
│ - Alex K. ⭐⭐⭐⭐⭐                 │
│                                     │
│ [View All Reviews]                  │
│                                     │
│ 🏢 About Design Club                │
│ [Organizer profile preview]         │
│                                     │
└─────────────────────────────────────┘
```

**Key UX Decisions:**
- **Hero image** creates immediate visual impact
- **Trust signals** (organizer verification, ratings) above fold
- **Social proof** (friends attending) drives conversion
- **Single CTA** (RSVP) prominent and contextual
- **Progressive disclosure** reveals details without overwhelming

---

### 3. RSVP Flow (Smart Auto-fill)

```
Step 1: RSVP Button Tap
┌─────────────────────────────────────┐
│ 🎟️ Complete Your RSVP              │
├─────────────────────────────────────┤
│ Event: UX Design Workshop           │
│ Date: Sep 12, 6:00 PM              │
│                                     │
│ 👤 Your Information                 │
│ [Pre-filled from profile]           │
│                                     │
│ Name: Alex Johnson ✓                │
│ Email: alex.j@university.edu ✓      │
│ Phone: (555) 123-4567 ✓            │
│                                     │
│ 🎓 Dietary Restrictions (Optional)  │
│ ☐ Vegetarian ☐ Vegan ☐ Gluten-free │
│ ☐ Other: ________________           │
│                                     │
│ 📧 Event Updates                    │
│ ☑️ Send me reminders                │ 
│ ☑️ Notify about changes             │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │     ✅ CONFIRM RSVP            │ │
│ └─────────────────────────────────┘ │
│                                     │
│ By RSVPing, you agree to our terms │
│ [Cancel]                            │
└─────────────────────────────────────┘

Step 2: Confirmation
┌─────────────────────────────────────┐
│          🎉 You're In!              │
├─────────────────────────────────────┤
│ Your RSVP for UX Design Workshop    │
│ has been confirmed!                 │
│                                     │
│ 📧 Confirmation sent to:            │
│ alex.j@university.edu               │
│                                     │
│ 🎫 Your Ticket                      │
│ ┌─────────────────────────────────┐ │
│ │     [QR Code]                   │ │
│ │                                 │ │
│ │ UX Design Workshop              │ │
│ │ Sep 12, 6:00 PM                │ │
│ │ Student Center, Room 201        │ │
│ │                                 │ │
│ │ Show this QR code at check-in   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 📅 [Add to Calendar]                │
│ 📤 [Share with Friends]             │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │      📱 Save to Home Screen     │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Key UX Decisions:**
- **Pre-filled forms** eliminate repetitive data entry
- **Optional fields** clearly marked to reduce abandonment  
- **Instant confirmation** with immediate ticket access
- **Multiple save options** (calendar, home screen) for convenience
- **QR code** prominent for easy check-in access

---

### 4. Event Creation Flow (Organizer)

```
Step 1: Basic Information
┌─────────────────────────────────────┐
│ ✨ Create New Event                 │
├─────────────────────────────────────┤
│ 📸 Event Image                      │
│ ┌─────────────────────────────────┐ │
│ │   [Tap to upload image]         │ │
│ │   📷 Camera  🖼️ Gallery        │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Event Title *                       │
│ [Workshop: UX Design Basics]        │
│                                     │
│ Description                         │
│ [Text area with formatting tools]   │
│                                     │
│ Category *                          │
│ 🎨 Workshop ▼                      │
│                                     │
│ Tags (helps people find your event) │
│ [#design #beginner #hands-on]       │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │        Continue →               │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘

Step 2: Date & Location
┌─────────────────────────────────────┐
│ 📅 When & Where                     │
├─────────────────────────────────────┤
│ Date *                              │
│ [📅 Sep 12, 2025]                  │
│                                     │
│ Start Time *                        │
│ [🕕 6:00 PM] Duration: [3 hours]   │
│                                     │
│ Location *                          │
│ 📍 Student Center, Room 201         │
│ [🎯 Use current location]           │
│                                     │
│ Capacity                            │
│ [50] people (leave blank = no limit)│
│                                     │
│ Event Type                          │
│ ☑️ Free Event                       │
│ ☐ Paid Event ($_____)               │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │        Continue →               │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘

Step 3: Preview & Publish
┌─────────────────────────────────────┐
│ 👀 Preview Your Event               │
├─────────────────────────────────────┤
│ [Event card preview as attendees    │
│  would see it in the feed]          │
│                                     │
│ ✅ Looks good? Ready to publish?    │
│                                     │
│ 📢 Share Options                    │
│ ☑️ Post to Instagram Story          │
│ ☑️ Share via WhatsApp               │
│ ☑️ Send to club email list          │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │    🚀 PUBLISH EVENT             │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [← Back]        [Save as Draft]     │
└─────────────────────────────────────┘
```

**Key UX Decisions:**
- **Progressive steps** prevent overwhelm with gradual information gathering
- **Smart defaults** (free event, common duration) reduce decisions
- **Visual preview** builds confidence before publishing
- **Integrated sharing** eliminates post-creation promotion friction
- **Save draft** option allows iteration without data loss

---

### 5. Organizer Dashboard

```
┌─────────────────────────────────────┐
│ 📊 Event Dashboard                  │
│ UX Design Workshop                  │
├─────────────────────────────────────┤
│ ⚡ Quick Stats                      │
│ 👥 27 RSVPs / 50 capacity          │
│ 📈 156 views → 17% conversion       │
│ ⏰ 2 days until event              │
│                                     │
│ 📊 RSVP Trend (Last 7 Days)        │
│ [Simple line chart showing growth]  │
│                                     │
│ 👥 Recent RSVPs                     │
│ • Sarah M. - 2 hours ago            │
│ • Jake P. - 4 hours ago             │
│ • Amy L. - 6 hours ago              │
│ [View All (27)]                     │
│                                     │
│ 🔧 Quick Actions                    │
│ ┌─────────────────────────────────┐ │
│ │ 📧 Send Update to Attendees     │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 📊 Export Attendee List (CSV)   │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 📱 Start Check-in (QR Scanner)  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 💡 Tips to Boost Attendance        │
│ • Share on Instagram Story          │
│ • Remind attendees 2 hours before   │
│                                     │
└─────────────────────────────────────┘
```

**Key UX Decisions:**
- **Essential metrics** visible at a glance
- **Actionable insights** rather than raw data
- **Quick actions** for common organizer tasks
- **Contextual tips** provide value beyond basic metrics
- **Mobile-optimized** for between-class management

---

## Component Design System

### Core Components

**1. Event Card**
- Aspect ratio: 16:9 image with 1:1 fallback
- Typography hierarchy: Title (H3), Meta (body), CTA (button)
- Interaction states: Default, hover, pressed, loading
- Accessibility: Focus indicators, ARIA labels, semantic markup

**2. Button System**
- Primary: RSVP, Create Event, Confirm actions
- Secondary: Cancel, Back, Alternative actions  
- Tertiary: Links, low-priority actions
- States: Default, hover, pressed, disabled, loading

**3. Form Elements**
- Input fields: Text, email, phone, number, date/time
- Selection: Dropdown, radio, checkbox, toggle
- Smart features: Auto-complete, validation, error states
- Accessibility: Labels, help text, error messaging

**4. Navigation**
- Bottom tab bar: Primary navigation (thumb-friendly)
- Header bar: Context and actions
- Breadcrumbs: Deep navigation guidance
- Back patterns: Consistent behavior across flows

### Visual Design Language

**Color Palette:**
- Primary: #6366F1 (Indigo) - CTAs and brand elements
- Secondary: #8B5CF6 (Purple) - Accents and highlights  
- Success: #10B981 (Green) - Confirmations and positive states
- Warning: #F59E0B (Amber) - Alerts and important notices
- Error: #EF4444 (Red) - Errors and destructive actions
- Neutral: #6B7280 (Gray) - Text and interface elements

**Typography:**
- Display: Inter/SF Pro (iOS) for headings
- Body: System fonts for optimal performance
- Scale: 16px base with 1.2 ratio for hierarchy
- Line height: 1.5 for readability

**Spacing System:**
- Base unit: 8px grid system
- Touch targets: Minimum 44px with 8px margin
- Content margins: 16px mobile, 24px tablet
- Component spacing: 8px, 16px, 24px, 32px increments

---

## Usability Testing Plan

### Testing Methodology

**Participants:**
- 8 users total: 4 organizers (Clara persona), 4 attendees (Alex persona)
- Recruitment: Campus partnerships, social media, referrals
- Screening: Active event participation, smartphone usage
- Demographics: Age 18-24, various majors, tech comfort levels

**Testing Format:**
- Remote moderated sessions (45 minutes each)
- Think-aloud protocol with task scenarios
- Post-test interview and SUS survey
- Follow-up micro-surveys for feature-specific feedback

### Test Scenarios

**Scenario 1: Event Discovery (Alex Persona)**
*"You're looking for something interesting to do this weekend. Find and RSVP to an event that interests you."*

**Tasks:**
1. Browse the event feed and find a relevant event
2. Use filters to narrow down options
3. View event details and assess quality/fit
4. Complete RSVP process
5. Add event to personal calendar

**Success Metrics:**
- Task completion rate: >80%
- Time to RSVP: <3 minutes from app open
- Error rate: <10%
- Satisfaction rating: >4/5

**Scenario 2: Event Creation (Clara Persona)**
*"You want to organize a study group for your upcoming midterm. Create an event for this study session."*

**Tasks:**
1. Navigate to event creation
2. Complete event information form
3. Set up date, time, and location
4. Preview and publish event
5. Share event via preferred channels

**Success Metrics:**
- Task completion rate: >75%
- Time to publish: <8 minutes
- Form abandonment rate: <15%
- Sharing success rate: >90%

**Scenario 3: Event Management (Clara Persona)**
*"Your event is tomorrow. Check how many people are coming and send them a reminder message."*

**Tasks:**
1. Access organizer dashboard
2. Review RSVP list and statistics
3. Send update/reminder to attendees
4. Export attendee list for offline reference

**Success Metrics:**
- Dashboard comprehension: >90%
- Message sending success: >95%
- Export functionality usage: >70%

### Testing Protocol

**Pre-Test (5 minutes)**
- Welcome and consent
- Background questions (event usage, pain points)
- Device/context setup

**Task Testing (30 minutes)**
- Scenario introduction and context setting
- Task execution with think-aloud
- Interviewer observation and minimal guidance
- Issue identification and severity assessment

**Post-Test (10 minutes)**
- System Usability Scale (SUS) survey
- User Experience Questionnaire (UEQ-S)
- Open feedback and improvement suggestions
- Feature prioritization ranking

### Analysis Framework

**Quantitative Metrics:**
- Task completion rates and times
- Error frequencies and types
- User satisfaction scores (SUS, UEQ)
- Feature usage and adoption rates

**Qualitative Insights:**
- Mental model alignment and misconceptions
- Emotional responses and friction points
- Workflow integration and context usage
- Accessibility barriers and accommodations needed

**Success Criteria:**
- Overall SUS score: >70 (above average)
- Critical task completion: >80%
- Severe usability issues: <3 per flow
- User recommendation likelihood: >60%

---

## Accessibility Implementation

### WCAG 2.1 AA Compliance Checklist

**Perceivable:**
- [ ] 4.5:1 color contrast ratio for normal text
- [ ] 3:1 color contrast ratio for large text and UI elements
- [ ] Text resizable up to 200% without horizontal scrolling
- [ ] Images have descriptive alt text
- [ ] Videos have captions and transcripts
- [ ] Color is not the only way to convey information

**Operable:**
- [ ] All functionality available via keyboard
- [ ] No content flashes more than 3 times per second
- [ ] Users can pause, stop, or hide moving content
- [ ] Focus indicators are clearly visible
- [ ] Touch targets are at least 44px with adequate spacing

**Understandable:**
- [ ] Language of page is programmatically determined
- [ ] Navigation and layout are consistent
- [ ] Error messages are clear and helpful
- [ ] Form labels and instructions are provided
- [ ] Help text is available when needed

**Robust:**
- [ ] Valid HTML markup and semantic structure
- [ ] Compatible with assistive technologies
- [ ] Works across different browsers and devices
- [ ] Graceful degradation when JavaScript fails

### Assistive Technology Testing

**Screen Readers:**
- VoiceOver (iOS Safari) - Primary mobile testing
- TalkBack (Android Chrome) - Android compatibility
- NVDA (Windows Firefox) - Desktop fallback testing

**Testing Scenarios:**
- Navigate event feed using only screen reader
- Complete RSVP flow with voice control
- Access organizer dashboard via keyboard only
- Use zoom functionality up to 200% magnification

### Inclusive Design Considerations

**Motor Impairments:**
- Large touch targets (minimum 44px)
- Adequate spacing between interactive elements
- Voice control compatibility
- Gesture alternatives for complex interactions

**Cognitive Disabilities:**
- Simple, consistent navigation patterns
- Clear error messages and recovery paths
- Progress indicators for multi-step processes
- Option to save progress and return later

**Visual Impairments:**
- High contrast mode support
- Scalable text and UI elements
- Descriptive link text and button labels
- Focus management for screen readers

**Hearing Impairments:**
- Visual indicators for audio feedback
- Text alternatives for audio content
- Captions for any video content
- Clear visual hierarchy and information architecture

---

*This comprehensive UX design framework ensures RSVP by Offbeats delivers an accessible, user-centered experience that addresses validated user needs while maintaining technical feasibility and business objectives.*
