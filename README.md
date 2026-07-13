# FutureReady College & Career Prep

A full-stack web application designed to manage client onboarding, showcase tutoring services, and provide interactive college planning tools for high school families.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

Live Site: [https://futurereadyprep.org](https://futurereadyprep.org)

## Key Highlights

- Built for a real tutoring and college advising business with active users
- Full-stack web application with a React frontend and Vercel serverless backend
- Interactive college matching and student intake workflows
- Deployed on Vercel with Google Analytics and custom domain

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
- [In-Progress & Planned Features](#in-progress--planned-features)
- [Screenshots](#screenshots)
- [License](#license)
- [Contact](#contact)

## Overview

I built FutureReady to run the digital side of my tutoring and college advising business. The website hosts my service catalog, lets families use an interactive college match tool, collects basic student goals, and links to my consultation scheduler.

## Why I Built This

I started this project because running my business through separate email chains, spreadsheets, and Google Docs was getting messy. I wanted to build a single website where:
- Families can see tutoring programs and transparent hourly rates.
- Parents get immediate value (like generating a target college list) before booking a call.
- I can collect academic details (GPA, test scores, intended majors) ahead of time, saving time during our first consultation.
- I could apply what I learned in my computer science classes to build a real application for my own business.

## Business Problem

Before building this site, starting with a new student required a lot of manual coordination. I spent hours emailing parents back and forth to collect their GPA, test scores, and college preferences. I also had to repeatedly answer the same questions about program schedules and hourly rates. I wanted to show my pricing transparently and collect academic details before families booked strategy sessions.

## Solution

I built a few features to solve these issues:
- An interactive College List Builder that lets students filter and match schools based on their GPA and test scores.
- An intake questionnaire that collects academic backgrounds and target majors. The responses are stored on the server to help me prepare for our advising calls (an automated PDF report generator is currently in progress).
- Inline scheduling widgets that let parents pick consultation slots immediately after filling out their student's profile.

This saves hours of admin work and lets us focus on tutoring strategy during our first meeting.

## Features

- **Interactive College List Builder**: A client-side tool where users input their GPA, SAT scores, and preferences (region, size, campus vibe) to get a filtered list of safety, target, and reach schools.
- **Academic Program Pages**: Dedicated pages explaining SAT prep, academic tutoring, and college admissions programs, complete with hourly rates.
- **Advising Questionnaire**: A multi-step form to collect a student's academic strengths and intended major to prepare for consultation calls.
- **Embedded Scheduling**: An inline Calendly scheduler so parents can book a free 15-minute consultation directly on the site.
- **Analytics Tracking**: Uses Google Analytics 4 to track navigation paths, button clicks, and form submissions.
- **Mobile Responsive Layout**: Scaled layouts using Tailwind breakpoints to work on phones, tablets, and desktops.
- **SEO Best Practices**: Proper semantic HTML5 tags and descriptive metadata to help families find my services on Google.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Vercel Serverless Functions
- **Integrations**: Stripe (In Progress), Resend (In Progress), Calendly, Google Analytics
- **Deployment**: Vercel

## Architecture

The website is a React SPA running on Vercel.

- **Component Design**: Shared layout components (Header, Footer, Popups) are separated from the main page views (SatPage, CollegeListBuilderPage, etc.).
- **State-Based Navigation**: I chose custom state-based routing over standard router packages. This lets me switch pages using standard React state, preserving active questionnaire inputs if a user navigates away to view pricing.
- **Backend APIs**: Includes Node.js serverless functions under `api/` to process Stripe and report generation tasks (currently under development).
- **Storage**: Uses JSON file storage for prototype persistence, with plans to migrate to a hosted database as the application grows (`data/report-orders.json`).
- **Type Safety**: Strictly typed interfaces for college profiles, intake payloads, and order records to catch bugs during Vite compilation.
- **State Hooks**: Uses standard React hooks (`useState`, `useEffect`, `useMemo`) to calculate college match scores and manage form validations.
- **Responsive Layout**: Tailwind CSS utility classes resize and stack layouts dynamically for mobile and desktop screens.

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

- **Local Development**: Runs a local development server with hot-reloading.
- **Build Compilation**: Run the compile script to output static build files in the `dist` folder:
  ```bash
  npm run build
  ```

## Challenges

### Challenge 1: Client-Side College Matching
Evaluating safety, target, and reach status for schools purely on the client side without database lookups.
*   *Solution*: I stored a university dataset locally as a structured JSON array. Each university record includes the middle 50% GPA and SAT ranges of admitted students. I wrote a client-side comparison function:
    - If the student's scores are above the 75th percentile of the college, it is labeled a **Safety**.
    - If they fall within the 25th-75th percentile, it is labeled a **Target**.
    - If they are below the 25th percentile, it is labeled a **Reach**.
    This simple filtering logic is fast, runs entirely on the client, and does not require complex backend operations.

### Challenge 2: Mobile layouts for data tables
The College List Builder displays lists and comparison tables that broke layouts on small viewports.
*   *Solution*: I used Tailwind CSS utility classes to build adaptive layouts. On screens smaller than `768px` (mobile), tables collapse into stacked cards with simple text wrapping. On larger screens, the CSS transitions back to standard side-by-side grids.

### Challenge 3: Designing a clean intake form
Getting detailed academic and career preferences is crucial to prepare for consultations, but presenting users with a long, tedious form caused them to close the tab.
*   *Solution*: Based on testing with a few family members, I broke the long form into separate, progressive steps. I grouped similar questions, added clear progress bars, and simplified text input boxes into clickable dropdown options. I also made sure scheduling links remained visible but non-intrusive. This improved form completion rates and led to more booked consultations.

## Lessons Learned

- **Designing for Real Users**: Unlike class assignments where you only write code to pass test cases, building FutureReady forced me to think about visual layouts, page speeds, and user navigation, since parents and students need to easily navigate the site.
- **User Testing and Iteration**: I learned the value of watching family members use the site. Simplifying text fields into simple multi-choice selectors made a significant difference in how easily parents completed onboarding surveys.
- **Production Logistics**: Gained experience setting up static hosting on Vercel, linking custom domains, configuring clean client-side routing redirects, and tracking user traffic patterns with analytics.

## In-Progress & Planned Features

### In-Progress (Backend & API Integration)
- **Stripe Payment Gateway**: Connecting the existing `/api/create-checkout-session` serverless endpoint to the client-side report builder to process custom advising sheet orders.
- **Server-Side PDF Generation**: Wiring the `pdf-lib` drawing module (`renderPdf.ts`) to programmatically output 3-page Helvetica roadmaps.
- **Transactional Email Delivery**: Enabling `/api/confirm-payment` callbacks to base64-encode reports and send them automatically via the Resend API.

### Planned Improvements
- **An Authenticated Student Portal**: A secure login area where current students can log in to view assignment sheets, access resources, and check lesson homework details.
- **Parent Portal**: A dashboard for parents to view billing details, completed hours, and progress updates.
- **Integrated Scheduling**: Replacing embedded Calendly links with custom in-app scheduling panels.
- **Progress Tracker**: An interactive graphing tool where students can log and visualize their practice SAT scores.

## Screenshots

### Homepage
<img width="951" height="467" alt="FutureReady Homepage" src="https://github.com/user-attachments/assets/ef21e566-e4e9-4ed8-92c9-ab6cf9896050" />

### College List Builder
<img width="946" height="464" alt="Screenshot 2026-07-12 190319" src="https://github.com/user-attachments/assets/98137ad6-12d8-475a-898e-a07f0c9b2811" />

### FutureReady Blog
<img width="943" height="467" alt="Screenshot 2026-07-12 190339" src="https://github.com/user-attachments/assets/f4c4a374-a9e2-4405-9c38-1778b15cc8b2" />

### Service Page
<img width="938" height="471" alt="Screenshot 2026-07-12 190611" src="https://github.com/user-attachments/assets/aed985a5-1d20-472b-b6f5-34a8b322f54f" />

### Mobile View
<img width="220" height="346" alt="Screenshot 2026-07-12 190717" src="https://github.com/user-attachments/assets/1b0d9873-ece3-493b-b409-d23e32aa86d2" />

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Aditya Verma - studyav007@outlook.com

Project Link: [https://github.com/Aditya-Verma25/FutureReady-College-Career-Prep](https://github.com/Aditya-Verma25/FutureReady-College-Career-Prep)

Live Website: [https://futurereadyprep.org](https://futurereadyprep.org)
