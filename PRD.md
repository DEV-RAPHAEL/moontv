# MOON TV – PRODUCT REQUIREMENTS DOCUMENT (PRD)
Product: Moon TV Digital Platform
Platforms: Website (WordPress Backend) + Android App (Flutter)
Version: MVP – Phase 1

## 1. Product Overview
Moon TV requires a centralized digital platform to:
- Present the brand professionally
- Allow users to discover programs
- Display schedules (EPG)
- Support advertisers and partners
- Serve as backend for mobile applications

The website will function as the primary CMS and API source for the mobile app.

## 2. User Types
- **Visitors:** General audience browsing content and schedules.
- **Advertisers / Partners:** Interested in rate cards and partnership opportunities.
- **Admin (Moon TV Team):** Uploading programs, schedules, news, and media.

## 3. Website Structure
### 3.1 Homepage
**Purpose:** Quickly communicate brand identity and guide visitors to content.
**Sections:**
- Hero section
- Featured programs slider
- “Now Playing” indicator
- Program highlights
- About preview
- Advertise with us CTA
- Social links
- Footer

**Features:**
- Editable slider (admin controlled)
- Dynamic featured programs
- Pull “Now Playing” from EPG

### 3.2 About Page
**Sections:**
- About Moon TV
- Vision
- Mission
- Core values
- Why Moon TV

**Features:**
- Editable content blocks
- Image sections

### 3.3 Programs Page
**Purpose:** Display all shows in categories.
**Features:**
- Category filtering
- Program cards
- Search

### 3.4 Program Detail Page
Each program should include:
- Title
- Synopsis
- Thumbnail/banner
- Category
- Airing time
- Related programs

### 3.5 EPG (Electronic Program Guide)
**Layout:**
- Weekly grid
- Time slots
- Program titles

**Features:**
- Admin can upload or edit schedules
- Automatic “Now Playing” indicator
- Mobile responsive layout

### 3.6 Advertise With Us
**Sections:**
- Audience value
- Partnership types
- Rate card download
- Contact form

### 3.7 News / Updates (Optional but recommended)
**Features:**
- Blog-style posts
- Categories
- Featured image

### 3.8 Contact Page
**Features:**
- Contact form
- Email display
- Social media links
- Map (optional)

## 4. Backend (Admin Panel Requirements)
Admins should be able to:
- Add/edit programs
- Upload images
- Manage schedules
- Publish news
- Update homepage sliders
- Manage rate cards
- Manage emails (basic list view)

## 5. API Requirements
The backend must expose APIs for:
- Programs list
- Program details
- Schedule / EPG
- Featured programs

**Used by:** Android app

## 6. Mobile App (Android)
### 6.1 App Screens
**Home Screen:**
- Featured programs
- Now Playing
- Categories

**Programs Screen:**
- List of shows
- Filter by category

**Program Detail:**
- Synopsis
- Air time
- Image

**Schedule (EPG):**
- Weekly schedule view

**Settings / About:**
- About Moon TV
- Social links

## 7. Email Automation (Basic)
**Features:**
- Waitlist collection
- Welcome email
- Broadcast capability (basic)

## 8. SEO Requirements
- Metadata per page
- Sitemap generation
- Google indexing
- Clean URLs

## 9. Security Requirements
- SSL enabled
- Backups scheduled
- Login protection
- Admin URL protection

## 10. Performance Requirements
**Website should:**
- Load under 3 seconds
- Be mobile responsive
- Work on low-bandwidth connections

**App should:**
- Cache basic data
- Load lightweight images

## 11. Analytics
**Integrate:**
- Google Analytics
- Basic traffic reporting

## 12. Hosting Requirements
- Reliable uptime
- Daily backups
- CDN enabled (if needed)

## 13. Future Enhancements (Not in MVP)
These are planned but not required for launch:
- iOS app
- Live streaming
- Advertiser dashboard
- Advanced analytics
- Advanced SEO

## 14. Acceptance Criteria
The product is considered complete when:
- Website is live
- Programs and EPG display correctly
- Admin can update content
- App connects successfully to backend
- Emails send successfully
