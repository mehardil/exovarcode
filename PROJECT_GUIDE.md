# XoCODE Project Guide

Read this file first before making changes. It is the quick source of truth for the project structure, behavior, design, and update rules. When a future change alters routes, components, email behavior, design rules, dependencies, or commands, update this file in the same change.

## Project Summary

XoCODE is a React + Vite single page website for a black-themed digital product studio. It includes Home, Services, Work, and Contact views, plus modals for order confirmation and meeting booking.

There is no backend. Contact, booking, and order forms submit through a frontend form service and include fallback email links.

## Commands

- Install dependencies: `npm install`
- Run dev server: `npm run dev -- --port 5179`
- Production build: `npm run build`
- Preview production build: `npm run preview`

If a dev server looks stale or broken, start a new port, then hard refresh the browser with `Ctrl + Shift + R`.

## Key Files

- `index.html`: HTML shell and fallback black landing page shown before React mounts.
- `public/Xocode.jpg`: Main raster logo image copied from `dist/Xocode.jpg`; used by the header/footer brand and favicon.
- `public/xocode-logo.svg`: Main XoCODE logo asset used in the header, footer, fallback HTML, and favicon.
- `public/xocode-mark.svg`: Compact symbol-only XoCODE mark used in the header/footer brand pill.
- `vite.config.js`: Vite config. Uses `@vitejs/plugin-react`; keep this file because JSX depends on the React plugin.
- `src/main.jsx`: React entry point and error boundary. If React rendering fails, it shows a visible fallback instead of a blank page.
- `src/App.jsx`: Top-level app state and page switching. Current views are `home`, `services`, `work`, and `contact`.
- `src/styles.css`: Global black design system and responsive layout. This project currently uses one black theme only.
- `src/config/site.js`: Brand/contact config, email target, meeting links, form endpoint, and helpers.
- `src/data/content.js`: Service cards, pricing plans, and work cards.

## Components

- `src/components/Header.jsx`: Main navigation and Book Meet button.
- `src/components/Footer.jsx`: Footer links and contact info.
- `src/components/Brand.jsx`: Reusable XoCODE logo component. Uses `/Xocode.jpg` inside a cropped logo plate.
- `src/components/SectionIntro.jsx`: Shared section heading block.
- `src/components/Modal.jsx`: Modal shell and success modal.
- `src/components/EmailForm.jsx`: Shared form wrapper for email submissions.
- `src/components/OrderModal.jsx`: Confirm Order modal.
- `src/components/BookingModal.jsx`: Book Meeting modal.

## Pages

- `src/pages/Home.jsx`: Hero, service cards, proof/process cards, and meeting CTA. The meeting CTA should offer WhatsApp Sales, Schedule Meeting, and Invite Sales Team.
- `src/pages/Services.jsx`: Service tabs and pricing cards.
- `src/pages/Work.jsx`: Portfolio/work cards.
- `src/pages/Contact.jsx`: Contact details, meeting links, and inquiry form.

## Email And Booking Behavior

All email-related values live in `src/config/site.js`.

Current destination email:

```js
exovarsystems@gmail.com
```

Current form endpoint:

```js
https://formsubmit.co/exovarsystems@gmail.com
```

Important notes:

- `mailto:` alone does not send email automatically; it only opens a draft.
- `EmailForm.jsx` submits forms to FormSubmit and also shows an email fallback link.
- Contact submissions use structured field names in `src/pages/Contact.jsx` so the received email contains all project details in order: business, contact person, email, phone, location, preferred contact method, service, budget, timeline, meeting preference, reference link, goals, requirements, and extra notes.
- Booking submissions use structured field names in `src/components/BookingModal.jsx` so the received email contains name, business, email, phone, service, preferred date/time, meeting format, agenda, project link, extra notes, and reply instructions.
- Booking submissions also include invite-related hidden fields: meeting invite platform, meeting action link, Google Calendar invite URL, and invite delivery request. Without a backend/API login, the site cannot automatically create a real Google Meet or Zoom room, but it sends the invite action details in the booking email.
- `EmailForm.jsx` also adds hidden context fields to each submission: form name, website, destination email, submitted time, and submitted page URL.
- FormSubmit may require one-time confirmation from `exovarsystems@gmail.com` before forwarding messages.
- Meeting links are stored in `SITE.googleMeet` and `SITE.zoom`.

## Design Rules

- Use one black design only. Do not reintroduce white/light theme unless explicitly requested.
- Main colors are CSS variables in `src/styles.css`.
- Keep the site clean, modern, and service-focused.
- Cards use `8px` border radius.
- Do not add a Track Order page or order tracking UI unless explicitly requested.
- Use real section images for service/work cards when adding new sections.
- Keep mobile layouts responsive through the existing media queries.

## Adding Or Editing Content

For services, pricing, or portfolio/work cards, edit `src/data/content.js`.

For brand name, email, phone, WhatsApp, Google Meet, Zoom, or form endpoint, edit `src/config/site.js`.

For layout or page copy:

- Home: `src/pages/Home.jsx`
- Services: `src/pages/Services.jsx`
- Work: `src/pages/Work.jsx`
- Contact: `src/pages/Contact.jsx`

For shared UI:

- Navigation: `src/components/Header.jsx`
- Footer: `src/components/Footer.jsx`
- Modals/forms: `src/components/*Modal.jsx` and `src/components/EmailForm.jsx`

## Known Pitfalls

- Keep explicit `import React from "react";` in JSX files. This avoids `React is not defined` runtime issues in this project.
- Keep `vite.config.js`; removing it can break JSX behavior.
- If the page shows the fallback error, check the error message inside the page and inspect `src/main.jsx` error boundary.
- If the browser still shows an old error, use a new dev server port and hard refresh.

## Update Checklist

When changing the project:

1. Read this file first.
2. Make the code change in the correct file.
3. Run `npm run build`.
4. Update this file if the change affects structure, behavior, commands, email flow, design rules, or known pitfalls.
5. Start or restart the dev server on a fresh port if the browser shows stale output.
