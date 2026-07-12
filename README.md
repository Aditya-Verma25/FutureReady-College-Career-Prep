# FutureReady College & Career Prep

A full-stack client-facing web application built to support and automate operations for an independent college preparation and academic tutoring business. The platform enables parents and high school students to explore service offerings, book strategy consultations, build custom college lists, and receive personalized academic reports. Access Link: www.futurereadyprep.org

## Table of Contents

- [Overview](#overview)
- [Business Problem](#business-problem)
- [Solution](#solution)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Challenges](#challenges)
- [Lessons Learned](#lessons-learned)
- [Future Improvements](#future-improvements)
- [Screenshots](#screenshots)
- [License](#license)
- [Contact](#contact)

## Overview

FutureReady is a functional, production-ready business application designed to solve onboarding, marketing, and client-intake challenges for an independent tutoring practice. It replaces manual onboarding emails with interactive tools—such as a student profile matching system and a College List Builder—that gather educational metrics and goals prior to the initial consultation. The application is fully integrated with scheduling and analytics tools, serving as the primary digital portal for generating client leads and managing program details.

## Business Problem

Running an independent tutoring and college advising practice involves substantial administrative overhead. Onboarding a new student typically requires extensive back-and-forth communication to collect transcripts, GPA, test scores, and university preferences. Additionally, converting casual site visitors into paying clients requires demonstrating immediate value and establishing trust. Managing scheduling, outlining program structures, and tracking client interest manually distracted from actual teaching and advisory work.

## Solution

FutureReady automates the student intake funnel. By introducing interactive features, the application engages prospective clients before they even schedule a call:
- A client-side college list builder allows students to see where their GPA and test scores place them (Safety, Match, or Reach) across major universities.
- An assessment report page aggregates student goals and maps out a roadmap.
- A seamless scheduler lets parents book strategy consultations directly, passing pre-filtered student profiles into the calendar event.

This reduces administrative overhead, establishes immediate credibility, and optimizes visitor-to-consultation conversion rates.

## Features

- **Responsive Landing Page**: Clean, conversion-focused home layout introducing the program's value propositions, parent testimonials, and clear call-to-actions.
- **Service Pages**: Detail specific offerings (SAT Prep, Academic Tutoring, College Application Advising) with transparent pricing (e.g., $59/hr for SAT prep, $49/hr for academic tutoring) to qualify leads.
- **College List Builder**: Client-side interactive widget where students select their GPA, SAT range, size, region, and selectivity preferences to dynamically generate categorized safety, target, and reach schools.
- **Personalized Recommendation Flow**: A multi-step questionnaire that guides students through selecting their weak areas and target majors, returning customized program pathways.
- **Consultation Booking**: Embedded inline Calendly widget allowing parents to schedule 30-minute college strategy sessions without leaving the site.
- **Analytics Tracking**: Google Analytics integration to monitor page visits, user flow through the list builder, and click rates on key service sign-ups.
- **Mobile-Friendly Layout**: Fully responsive interface styled with utility-first layouts, ensuring seamless readability on parents' phones and students' tablets.
- **SEO Improvements**: Semantic HTML5 tags, canonical links, sitemaps, and structured headers to ensure search engine visibility for local tutoring queries.
- **Lead Generation Forms**: Simple inputs embedded on service pages to capture student goals and parent contact info.

## Tech Stack

- **Frontend**: React (v18), TypeScript, Vite, Tailwind CSS
- **Deployment**: Vercel
- **Third-Party Integrations**: Calendly Inline Widget, Google Analytics

## Architecture

The application is structured as a client-side React Single Page Application (SPA) compiled using Vite. 

- **Component Design**: Follows a modular component hierarchy. Generic layout structures like the header, footer, and popups are separated from core page components (SatPage, TutoringPage, CollegeListBuilderPage).
- **Client-Side View Controller**: Uses a lightweight React state router to swap page contexts smoothly without full page reloads, preserving questionnaire states when navigating between panels.
- **Data Layer**: Stores college and career datasets in typed client-side arrays.
- **Type Safety**: TypeScript is utilized to strictly define core data shapes (e.g., College objects, UserInput options, SelectOption handlers) preventing runtime null-pointer crashes.
- **Responsive Styling**: Built with Tailwind CSS breakpoints, defining layout grids that adapt fluidly to screen width transitions.

## Project Structure

```
tutoring-prep/
├── public/
│   ├── blog/
│   │   ├── how-to-secure-merit-aid/index.html
│   │   └── the-digital-sat-secret/index.html
│   ├── blog-posts.json
│   ├── logo.png
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── EarlyBirdPopup.tsx
│   │   ├── SiteFooter.tsx
│   │   └── SiteHeader.tsx
│   ├── App.tsx
│   ├── CollegeListBuilderPage.tsx
│   ├── FutureReadyReportPage.tsx
│   ├── PersonalizedFeedback.tsx
│   ├── SatPage.tsx
│   ├── TutoringPage.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

To run the project locally, ensure you have Node.js installed.

1. Clone the repository:
   ```bash
   git clone https://github.com/Aditya-Verma25/FutureReady-College-Career-Prep.git
   ```
2. Navigate to the project directory:
   ```bash
   cd FutureReady-College-Career-Prep
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`.

## Usage

- **Local Development**: The Vite dev server supports Hot Module Replacement (HMR). Any edits to `src/` files will render in real-time.
- **Production Build**: Compiling the optimized build generates static assets in the `dist` folder:
  ```bash
  npm run build
  ```

## Challenges

### Challenge 1: Designing an Intuitive Interactive College Match Tool
Matching academic metrics to university selectivity categories (Reach, Target, Safety) can easily confuse high school students. 
*   *Solution*: Created a deterministic client-side sorting function that groups university data arrays based on matching standard deviation bands of GPA and SAT averages against student selections. This outputs clean, digestible lists categorized by match probability rather than raw, unformatted data.

### Challenge 2: Mobile Responsiveness for Data-Rich Components
The College List Builder displays multi-column lists and tables that became illegible and broke layouts on small mobile viewports.
*   *Solution*: Applied Tailwind CSS responsive breakpoints to switch card displays. On larger viewports, the app renders a traditional inline data list. On mobile devices, the layout dynamically transitions to stacked vertical cards, preserving layout integrity and text wrapping.

### Challenge 3: Balancing Information with User Action
High school prep involves complex details, but overloading visitors with text reduces consultation booking conversions.
*   *Solution*: Redesigned page scroll paths to group details into progressive accordions and tab panels. Strategic floating CTAs and pricing cards are placed at natural reading breaks, directing users to book calls without cluttering the screen.

## Lessons Learned

- **Designing for Real Users**: Building FutureReady taught me that clean code must go hand-in-hand with usability. I had to focus heavily on fast page speeds, clean fonts, and explicit layout structures since the users are parents and high school students, not other developers.
- **The Value of Feedback Cycles**: Iterated on input selectors after observing that initial users struggled with entering exact numerical metrics. Shifting to ranged dropdown selectors significantly reduced completion errors and improved intake form conversion.
- **Deploying Production Applications**: Gained hands-on experience managing production hosting on Vercel, configuring DNS records, setting up canonical URLs for search engines, and using analytics to measure conversion funnels.

## Future Improvements

- **Student Dashboard**: A authenticated portal for enrolled students to download practice sheets and submit assignments.
- **Parent Progress Portal**: A clean dashboard showing billing history, completed hours, and progress notes.
- **Integrated Scheduling**: Replacing external widgets with an in-app booking system linked directly to calendar integrations.
- **Mock Exam Tracker**: An interactive scoring dashboard showing student progress across mock exams.

## Screenshots

<img width="951" height="467" alt="Screenshot 2026-06-29 122056" src="https://github.com/user-attachments/assets/ef21e566-e4e9-4ed8-92c9-ab6cf9896050" />

## License

Distributed under the MIT License. See `LICENSE` for more information.

Project Link: [https://github.com/Aditya-Verma25/FutureReady-College-Career-Prep](https://github.com/Aditya-Verma25/FutureReady-College-Career-Prep)
