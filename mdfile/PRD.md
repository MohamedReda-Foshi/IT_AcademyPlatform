# Product Requirements Document (PRD)
## IT Academy Platform

**Version:** 1.0  
**Date:** February 19, 2026  
**Status:** Active Development

---

## 1. Executive Summary

IT Academy Platform is an e-learning platform designed to deliver IT courses to students of all skill levels. The platform provides flexible pricing tiers, role-based access control, and seamless payment processing to enable users to learn at their own pace.

### 1.1 Product Vision
To provide a comprehensive, accessible, and user-friendly platform for IT education that scales from beginner to advanced levels.

### 1.2 Target Audience
- **Primary:** IT students and professionals seeking to upskill
- **Secondary:** Beginners entering the IT field
- **Tertiary:** Advanced developers looking for specialized courses

---

## 2. Product Overview

### 2.1 Core Value Proposition
- Access to structured IT courses with progressive learning paths
- Flexible subscription plans catering to different learning needs
- Secure authentication and payment processing
- Admin capabilities for course management

### 2.2 Key Features
1. Multi-provider authentication (Google, GitHub, Email)
2. Tiered subscription plans with different access levels
3. Course content management (lessons, modules, quizzes)
4. Payment processing via Stripe
5. Admin dashboard for course and user management
6. Role-based access control

---

## 3. User Roles & Personas

### 3.1 User Roles

#### **Student/User**
- Can browse course catalog
- Can view course introductions (free tier)
- Can subscribe to paid plans
- Can access full course content based on subscription level
- Can track learning progress

#### **Admin**
- Can create, edit, and delete courses
- Can manage course content (lessons, modules, quizzes)
- Can manage user accounts
- Can view platform analytics
- Can manage pricing plans

---

## 4. Functional Requirements

### 4.1 Authentication & Authorization

#### 4.1.1 Authentication Methods
- **Google OAuth:** Primary method for beginners
- **GitHub OAuth:** Primary method for intermediate/advanced users
- **Email/Password:** Traditional registration via website

#### 4.1.2 Authorization
- Session-based authentication using NextAuth.js
- Secure HTTP-only cookies for session storage
- Middleware protection for paid routes
- Subscription status verification before content access

**Acceptance Criteria:**
- Users can sign in via Google, GitHub, or email/password
- Sessions persist securely across browser sessions
- Unauthorized users are redirected to login
- Subscription status is checked before granting course access

### 4.2 Course Management

#### 4.2.1 Course Structure
- **Course:** Top-level container
  - Name, description, short description
  - Category, difficulty level (Beginner/Intermediate/Advanced)
  - Image, duration, instructor information
  - Price type (Free/Paid)
  - Rating, enrollment count
  - XP points
  - Prerequisites and learning outcomes
  - Total lessons and quizzes count
- **Chapter:** Organized course sections with ordered content
  - Chapter title and order
  - Video content with titles
  - Text content with titles
  - Quiz content
  - File attachments (filesname, filedata)
  - Linked to parent course
- **Module:** Course sections (legacy structure)
- **Lesson:** Individual learning units
  - Video content
  - Text content
  - Quizzes

#### 4.2.2 Course Access Control
- **Free Users:** Can view course introductions only
- **Paid Subscribers:** Full access to lessons based on plan tier

**Acceptance Criteria:**
- Free users see course previews/introductions
- Paid users can access full course content
- Access is enforced at the API level
- Course progress is tracked per user

### 4.3 Subscription Plans

#### 4.3.1 Plan Tiers

**Entry Plan**
- Basic access to introduction course
- Limited course catalog access

**Most Used Plan**
- Access to top 5 courses
- Standard course library

**Pro Plan**
- Access to all courses
- Full course library
- 24/7 support
- Access to IT-related e-book collection

#### 4.3.2 Payment Processing
- Stripe integration for secure payments
- Support for plan upgrades/downgrades
- Subscription management

**Acceptance Criteria:**
- Users can select and purchase subscription plans
- Payments are processed securely via Stripe
- Subscription status updates immediately after payment
- Users can upgrade/downgrade plans
- Payment failures are handled gracefully

### 4.4 Chapter Management

#### 4.4.1 Chapter Structure
- Chapters are organized sequentially within courses
- Each chapter contains:
  - Video content with titles
  - Text content with titles
  - Quiz content
  - File attachments
  - Ordering for sequential learning

#### 4.4.2 Chapter Access
- Authenticated users (both admin and regular users) can view chapters
- Chapters are fetched by course ID
- Chapters are sorted by order field for sequential display

**Acceptance Criteria:**
- Chapters are displayed in the correct order
- All chapter content (videos, text, quizzes) is accessible
- File attachments can be downloaded
- Chapter access respects course subscription status

### 4.5 Admin Features

#### 4.5.1 Course Administration
- Create new courses with full metadata (name, description, category, level, instructor info, etc.)
- Edit existing courses
- Delete courses
- Manage course content (modules, lessons, quizzes)
- Add chapters to courses with ordered content
- Manage chapter content (videos, text, quizzes, files)
- Publish/unpublish courses
- View course analytics
- Set course pricing (Free/Paid)
- Configure course metadata (duration, XP points, prerequisites, learning outcomes)

#### 4.5.2 Chapter Administration
- Create new chapters for courses
- Set chapter order for sequential learning
- Add video, text, and quiz content to chapters
- Upload file attachments to chapters
- Manage chapter content

#### 4.5.3 User Management
- View user list
- Manage user accounts
- View user subscriptions
- Admin authentication (separate from user auth)

**Acceptance Criteria:**
- Admins can perform CRUD operations on courses
- Admin actions are logged and auditable
- Only authenticated admins can access admin features
- Admin dashboard displays relevant metrics

---

## 5. Technical Requirements

### 5.1 Technology Stack

#### Frontend
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js
- **Rendering:** Hybrid SSR/CSR

#### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Payment:** Stripe API
- **E-learning:** LearnStack integration

### 5.2 Architecture

#### 5.2.1 Project Structure
```
├── /client          # Next.js frontend application
├── /server          # Express.js backend API
├── /components      # Reusable UI components
├── /lib             # Helper functions (db, stripe, auth)
├── /models          # Mongoose models (User, Course, Lesson, Chapter, Admin)
├── /pages/api       # API routes (auth, payments, courses)
└── /public          # Static assets
```

#### 5.2.2 Data Models
- **User:** firstName, lastName, email, role, provider, password, about
- **Admin:** adminname, email, password
- **Course:** Namecourse, DescriptionCourse, shortDescription, category, level, modules, price, rating, duration, imageUrl, XpNumber, prerequisites, learningOutcomes, totalLessons, totalQuizzes, enrollments, Instructor, InstructorInformation, videoUrl[], text[], quize[], isPublished, createdAt, updatedAt
- **Chapter:** ChapterTitle, order, videoUrl, videoTitle, textTitle, text, quize, filesname, filedata, courseId
- **Module:** Course section container
- **Lesson:** Individual learning units with video/text/quiz content

### 5.3 Performance Requirements
- Page load time < 2 seconds
- API response time < 500ms
- Support for concurrent users
- SEO optimization via SSR

### 5.4 Security Requirements
- Secure password hashing (bcrypt)
- JWT token-based authentication
- HTTPS enforcement
- Input validation and sanitization
- SQL injection prevention (MongoDB)
- XSS protection
- CSRF protection

### 5.5 API Endpoints

#### 5.5.1 Course Endpoints
- `GET /CourseCard` - Get course cards for display (public)
- `GET /AllCourse` - Get all courses (public)
- `GET /course/CourseCard` - Get limited course cards (public)
- `GET /:id` - Get course details by ID (public)
- `POST /createCourse` - Create new course (admin only)
- `PUT /updateCourse/:id` - Update course (admin only)
- `DELETE /deleteCourse/:id` - Delete course (admin only)

#### 5.5.2 Chapter Endpoints
- `GET /getChapter/:courseId` - Get all chapters for a course (authenticated)
- `POST /addChapter` - Create new chapter (admin only)

#### 5.5.3 User Endpoints
- `GET /getuser` - Get all users (admin only)
- `GET /getusername/:id` - Get user by ID (admin only)
- `POST /register` - Register new user (public)
- `POST /login` - User login (public)

#### 5.5.4 Admin Endpoints
- `GET /AdminUser` - Get all admin users (admin only)
- `POST /register` - Register new admin (admin only)
- `POST /login` - Admin login (public)
- `DELETE /deleuser` - Delete user (admin only)

---

## 6. User Stories

### 6.1 Student User Stories

**US-1:** As a student, I want to sign in with my Google account so that I can quickly access the platform.

**US-2:** As a student, I want to browse available courses so that I can find content relevant to my skill level.

**US-3:** As a free user, I want to see course introductions so that I can decide if I want to subscribe.

**US-4:** As a paid subscriber, I want to access full course content so that I can complete my learning.

**US-5:** As a student, I want to purchase a subscription plan so that I can unlock course content.

**US-6:** As a student, I want to track my learning progress so that I can see how far I've come.

### 6.2 Admin User Stories

**US-7:** As an admin, I want to create new courses so that I can expand the platform's content library.

**US-8:** As an admin, I want to edit course content so that I can keep information up-to-date.

**US-9:** As an admin, I want to manage user subscriptions so that I can handle support requests.

**US-10:** As an admin, I want to view platform analytics so that I can make data-driven decisions.

**US-11:** As an admin, I want to add chapters to courses so that I can organize course content sequentially.

**US-12:** As an admin, I want to manage chapter content (videos, text, quizzes) so that I can provide comprehensive learning materials.

**US-13:** As a student, I want to view chapters in order so that I can follow a structured learning path.

---

## 7. Non-Functional Requirements

### 7.1 Usability
- Intuitive navigation
- Responsive design (mobile, tablet, desktop)
- Clear course categorization
- Easy subscription management

### 7.2 Reliability
- 99% uptime target
- Graceful error handling
- Data backup and recovery

### 7.3 Scalability
- Support for 10,000+ concurrent users
- Efficient database queries
- CDN for static assets

### 7.4 Maintainability
- Modular code architecture
- Comprehensive documentation
- Code review process
- Version control (Git)

---

## 8. Success Metrics

### 8.1 Key Performance Indicators (KPIs)
- **User Acquisition:** Number of new registrations per month
- **Conversion Rate:** Percentage of free users converting to paid plans
- **Course Completion Rate:** Percentage of enrolled students completing courses
- **Revenue:** Monthly recurring revenue (MRR)
- **User Engagement:** Average time spent on platform per user
- **Retention Rate:** Percentage of users returning after first visit

### 8.2 Technical Metrics
- API response time
- Page load performance
- Error rate
- Uptime percentage

---

## 9. Out of Scope (Future Considerations)

- Mobile native applications (iOS/Android)
- Live instructor sessions
- Peer-to-peer learning features
- Certificate generation
- Course reviews and ratings by students
- Discussion forums
- Multi-language support
- Advanced analytics dashboard for students

---

## 10. Dependencies & Constraints

### 10.1 External Dependencies
- Stripe API for payment processing
- Google OAuth API
- GitHub OAuth API
- MongoDB Atlas or local MongoDB instance
- LearnStack integration

### 10.2 Constraints
- Requires Node.js v16+ and npm/yarn
- Requires MongoDB database access
- Requires Stripe account with API keys
- Requires OAuth credentials from Google and GitHub

---

## 11. Timeline & Milestones

### Phase 1: Core Features (Current)
- ✅ Authentication system
- ✅ Basic course structure
- ✅ Payment integration
- ✅ Admin dashboard

### Phase 2: Enhancement (Future)
- Course progress tracking
- Advanced analytics
- Email notifications
- User profile management

### Phase 3: Scale (Future)
- Performance optimization
- Advanced search and filtering
- Recommendation engine
- Social features

---

## 12. Risk Assessment

### 12.1 Technical Risks
- **Payment Processing Failures:** Mitigation via Stripe's robust API and error handling
- **Database Performance:** Mitigation via indexing and query optimization
- **Authentication Security:** Mitigation via industry-standard OAuth and JWT

### 12.2 Business Risks
- **Low Conversion Rate:** Mitigation via A/B testing and pricing optimization
- **User Churn:** Mitigation via engagement features and quality content

---

## 13. Appendix

### 13.1 Glossary
- **SSR:** Server-Side Rendering
- **CSR:** Client-Side Rendering
- **OAuth:** Open Authorization protocol
- **JWT:** JSON Web Token
- **MRR:** Monthly Recurring Revenue

### 13.2 References
- Next.js Documentation
- Stripe API Documentation
- NextAuth.js Documentation
- MongoDB Documentation

---

**Document Owner:** Development Team  
**Last Updated:** February 19, 2026  
**Next Review Date:** March 19, 2026
