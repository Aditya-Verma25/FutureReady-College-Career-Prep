# FutureReady College & Career Prep

A full-stack web application designed to manage client onboarding, showcase tutoring services, and provide interactive college planning tools for high school families.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B736FF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Table of Contents

- [Overview](#overview)
- [Why I Built This](#why-i-built-this)
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

FutureReady is a web application built to run the digital operations of my independent tutoring and college advising business. The platform acts as a public service catalog and an interactive onboarding tool. Prospective students and parents can explore academic programs, use a college match builder, complete academic interest surveys, and book consultation sessions.

## Why I Built This

I started FutureReady because managing my tutoring business using separate emails, spreadsheets, and shared documents was becoming difficult to coordinate. I wanted to build a single platform where:
- I could display all my academic services and clear, transparent pricing options in one place.
- Prospective families could get immediate value (like a draft college list or career alignment review) before our first meeting.
- I could gather a student's basic details (GPA, test scores, target majors) before scheduling a call, saving time during onboarding.
- I could apply my software engineering coursework to build a real product that solves actual day-to-day problems for real users.

## Business Problem

Before building this site, onboarding a new student was highly manual and repetitive. I spent hours emailing back and forth to collect transcripts, GPA metrics, test scores, and university preferences. Parents also frequently asked the same questions about my tutoring programs, schedule formats, and rates. I needed a clear way to present my tutoring services, qualify serious inquiries, and gather educational metrics from students automatically before our initial strategy sessions.

## Solution

The application automates my client intake process:
- Instead of manually collecting school lists, students use the College List Builder to view university options matching their profile.
- A personalized feedback questionnaire lets students submit their weak academic areas and target majors. The application handles the processing and emails them a structured college and career roadmap.
- Integrations with booking tools allow parents to schedule consultations directly, using the pre-collected student metrics to prepare for the session.

This setup saves hours of onboarding administration and makes my initial sessions with families much more productive.

## Features

- **Responsive Landing Page**: Home interface introducing the prep programs, client testimonials, and direct buttons to schedule a session.
- **Service Pages**: Detail specific programs (SAT Prep, Academic Tutoring, College Advising) with transparent pricing structures to qualify leads.
- **College List Builder**: Interactive client-side tool where users input their GPA and SAT scores, choose school region, size, and selectivity preferences, and view dynamically filtered lists of reach, target, and safety colleges.
- **Personalized Recommendation Flow**: A multi-step form where users enter their target major, areas of academic difficulty, and SAT goals. The backend script matches their major to regional career growth datasets, compiles a PDF roadmap report, and emails it directly to their inbox.
- **Consultation Booking**: Embedded inline Calendly scheduler, enabling parents to book a free 30-minute college strategy session without leaving the site.
- **Analytics Tracking**: Google Analytics integration to track button clicks, service page traffic, and navigation paths.
- **Mobile-Friendly Layout**: Responsive grids and elements configured for mobile phones, tablets, and desktops.
- **SEO Elements**: Semantic HTML5 markup, canonical URLs, and heading structures to ensure local search visibility.
- **Lead Generation**: Dynamic intake forms on program pages that collect parent contact details and student academic profiles.

## Tech Stack

- **Frontend**: React (v18), TypeScript, Vite, Tailwind CSS
- **Deployment**: Vercel
- **Third-Party Integrations**: Calendly Widget, Google Analytics

## Architecture

The application is a React Single Page Application (SPA) hosted on Vercel.

- **React Component Structure**: Built using a modular component layout. Global UI parts (Header, Footer, Popups) are separated from the main page views (SatPage, TutoringPage, CollegeListBuilderPage).
- **Client-Side Routing**: Navigates between page views using a state-based controller. This avoids full page reloads, ensuring data entered in intake forms is not lost if a user clicks around.
- **Backend Handlers**: Uses Vercel serverless API routes (`api/`) to handle server-side operations:
  - Creating Stripe sessions for paid report tiers.
  - Processing Stripe webhook events.
  - Running backend calculations to compile custom academic reports, render PDF documents, and email them to users.
- **Storage**: Reads and writes order records to a local JSON file (`data/report-orders.json`) on the server.
- **TypeScript Interfaces**: Defines exact types for university structures, student intake responses, and service models to catch data errors during compilation.
- **State Management**: Uses React state hooks (`useState`, `useEffect`, `useCallback`) to manage questionnaire values and handle form validation.
- **Responsive Layout**: Responsive grids and elements built with Tailwind CSS breakpoints to adapt viewports dynamically.

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

To run this project locally, make sure you have Node.js installed.

1. Clone the repository:
   ```bash
   git clone https://github.com/Aditya-Verma25/FutureReady-College-Career-Prep.git
   ```
2. Navigate to the folder:
   ```bash
   cd FutureReady-College-Career-Prep
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the local server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to `http://localhost:5173`.

## Usage

- **Local Server**: The Vite server uses Hot Module Replacement (HMR) to reflect source code changes instantly.
- **Build Compilation**: Run the compile script to output static assets in the `dist` folder:
  ```bash
  npm run build
  ```

## Challenges

### Challenge 1: Implementing the College Matching Logic
Determining Safety, Target, and Reach classifications for universities without using complex database operations.
*   *Solution*: I stored a university dataset locally as a structured JSON array. Each university record includes the middle 50% GPA and SAT ranges of admitted students. I wrote a client-side comparison function:
    - If the student's scores are above the 75th percentile of the college, it is labeled a **Safety**.
    - If they fall within the 25th-75th percentile, it is labeled a **Target**.
    - If they are below the 25th percentile, it is labeled a **Reach**.
    This simple threshold filtering logic is fast, runs entirely on the client, and does not require complex backend operations.

### Challenge 2: Mobile Responsiveness for Data Grids
The College List Builder displays lists and comparison tables that became illegible and broke layouts on small viewports.
*   *Solution*: Used Tailwind CSS responsive utility classes to build adaptive layouts. On screens smaller than `768px` (mobile), tables collapse into stacked cards with simple text wrapping. On larger screens, the CSS transitions back to standard side-by-side grids.

### Challenge 3: Product Usability vs. Information Gathering
Getting detailed academic and career preferences is crucial to prepare for consultations, but presenting users with a long, tedious form caused them to close the tab.
*   *Solution*: Based on testing with a few initial users, I chunked the long form into separate, progressive steps. I grouped similar questions, added clear progress bars, and simplified text input boxes into clickable dropdown options. I also made sure scheduling links remained visible but non-intrusive. This improved form completion rates and led to more booked consultations.

## Lessons Learned

- **Designing for Real Users**: Unlike class assignments where you only write code to pass test files, building FutureReady forced me to think about visual layouts, page speeds, and user navigation, since parents and students need to easily navigate the site.
- **User Testing and Iteration**: I learned the value of watching family members use the site. Simplifying text fields into simple multi-choice selectors made a significant difference in how easily parents completed onboarding surveys.
- **Production Logistics**: Gained experience setting up static hosting on Vercel, linking custom domains, configuring clean client-side routing redirects, and tracking user traffic patterns with analytics.

## Future Improvements

- **An Authenticated Student Portal**: A login area where current students can log in to view assignment sheets, access resources, and check lesson homework details.
- **Parent Portal**: A dashboard for parents to view billing details, completed hours, and progress updates.
- **Integrated Scheduling**: Replacing embedded calendar links with custom in-app scheduling panels.
- **Progress Tracker**: An interactive graphing tool where students can log and visualize their practice SAT scores.

## Screenshots

### Homepage
<img width="951" height="467" alt="FutureReady Homepage" src="https://github.com/user-attachments/assets/ef21e566-e4e9-4ed8-92c9-ab6cf9896050" />

### College List Builder
*(Screenshot of College List Builder widget)*

### Personalized Feedback / Report
*(Screenshot of Generated Student Report)*

### Service Page
*(Screenshot of SAT Program Service Page)*

### Mobile View
*(Screenshot of Mobile Home Navigation)*

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Aditya Verma - studyav007@outlook.com

Project Link: [https://github.com/Aditya-Verma25/FutureReady-College-Career-Prep](https://github.com/Aditya-Verma25/FutureReady-College-Career-Prep)
