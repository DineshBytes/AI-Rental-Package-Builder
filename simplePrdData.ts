export interface PrdSection {
  id: string;
  sectionNumber: number;
  title: string;
  subtitle: string;
  content: string;
}

export const SIMPLE_PRD_DATA: PrdSection[] = [
  {
    id: 'project-title',
    sectionNumber: 1,
    title: 'Project Title',
    subtitle: 'System Definition & Brand Identity',
    content: `
# One Point Solutions: Simple Tech gear Rental Portal
## Subtitle: A smart and immediate way to rent electronics for corporate classes, summits, or creative hackathons.

**Version:** 1.0 (Plain-English Summary)  
**Access:** Open Public Overview  
**Ideal Audience:** Event coordinators, team leads, business managers, or technical auditors looking for a simple product overview.  

*This document explains the software setup and business advantages of our rental system in clear, plain language.*
`
  },
  {
    id: 'problem-statement',
    sectionNumber: 2,
    title: 'The Problem We Solve',
    subtitle: 'Avoiding delays, mismatching gear, and confusion',
    content: `
## Why Renting Computers and Displays for Businesses is Difficult Today

When planning events, renting technology typically runs into several pain points:

1. **Slow Quotations:** Waiting for a rental shop to write back with a price quote takes **1 to 2 days**, which delays event planning.
2. **Device Connection Problems:** People often rent things that do not work or plug together properly (like choosing a Macbook but forgetting the right monitor adaptors or power cables).
3. **Environment Miscalculations:** People consistently rent displays or projectors that are too dim to be seen in bright, daylight-flooded event halls.
4. **Extra Phone Consultations:** Clients have to call support back and forth just to change item counts, wasting hours.
5. **Real-time Stock Uncertainty:** Not knowing if a product is actually available in the warehouse leads to last-minute cancellations and stressful substitutes.
`
  },
  {
    id: 'proposed-solution',
    sectionNumber: 3,
    title: 'Our Simple Solution',
    subtitle: 'An AI booking assistant that configures correct setups instantly',
    content: `
## How One Point Solutions Fixes These Problems

We created a simple website powered by a smart AI helper (Google Gemini) that manages everything for you:

1. **Type Normal Words:** Just write what your event is in plain words (like *"I need 10 laptops for a 3-day coding marathon in Seattle"*).
2. **Automatic matching:** Our AI automatically recommends compatible devices, correct accessory counts, and calculates prices instantly.
3. **Smart Clarity Score:** The app scores your equipment list (e.g., **95% Compatibility**) and friendly prompts you if you forgot a critical hub or adapter.
4. **Instant Text Notifications:** Instantly check costs and send a summarized quote straight to client folders or over WhatsApp messaging.
`
  },
  {
    id: 'system-objective',
    sectionNumber: 4,
    title: 'Project Objectives',
    subtitle: 'Fast answers, perfect compatibility, and clear pricing',
    content: `
## Our Top Goals

We built the website with four direct goals in mind:

* **Instant Price Quotes:** Bring down the time it takes to get an official price estimate from **36 hours** to **less than a second**.
* **Zero Wrong Orders:** Enforce compatibility checks automatically in the background to ensure every rented cord and laptop goes together.
* **Reduce Admin Overheads:** Automate **75% of simple customer support calls**, letting human managers focus on high-priority customized setups.
* **Empower Event Planners:** Provide clear price transparency, suitability scorecards, and live stock counts on the spot.
`
  },
  {
    id: 'core-features',
    sectionNumber: 5,
    title: 'Core App Features',
    subtitle: 'Four core dashboard interfaces',
    content: `
## Exploring the Application

The One Point Solutions portal is divided into four highly-polished, responsive screens:

### 1. The Interactive Welcome Screen (Landing Portal)
* A friendly homepage showing our core services, quick stock coverage guarantees, and warehouse maps.
* Includes a **Simulated CLI Terminal console** that shows you how client words are parsed into specific device packages instantly.

### 2. The Conversational AI Package Builder
* An easy sidebar where you input event categories, choose your budget limits, and select rental durations.
* Clicking 'Generate Package' builds a custom selection list from live storage.
* Allows manual item editing: instantly add or delete devices, and watch total fees and support surcharges recalculate automatically in real-time.

### 3. The Digital Invoice Receipt
* An official-looking business invoice showing date stamps, invoice IDs, item breakdowns, tax rates, and total net cost.
* Fast share options: send the invoice summary directly to WhatsApp or download a clean report.

### 4. The Business Manager Desk (Analytics Dashboard)
* Simple charts showing incoming orders, registered rental requests, and past trends.
* Allows shop operators to review incoming clients, flip request status badges, and trigger manual updates.
`
  },
  {
    id: 'user-flow',
    sectionNumber: 6,
    title: 'The Customer Journey',
    subtitle: 'Step-by-step from typing your needs to booking your order',
    content: `
## Client Navigation Steps

Here is the straightforward user flow from landing on our page to booking your gear:

1. **Describe Needs:** The custom visitor describes their requirements in simple, plain sentences.
2. **Select Parameters:** Choose budget thresholds and contract days.
3. **AI Recommendations:** The system displays highly-rated matching gear from our catalog.
4. **Customize Specs:** The client manually reviews, deletes, or increases counts in one click.
5. **Review Bill:** Read the itemized quote with taxes and support surcharges.
6. **Share & Print:** Send the summaries over WhatsApp or download a PDF.
7. **Complete Order:** Book the equipment, which sends it instantly to the shop manager's dashboard.
`
  },
  {
    id: 'functional-requirements',
    sectionNumber: 7,
    title: 'Platform Requirements',
    subtitle: 'How we ensure high usability',
    content: `
## General Functional Rules

To provide a robust corporate experience, we followed these requirements:

* **Clean Layouts:** Sharp, high-contrast text that resizes cleanly to fit phone screen sizes perfectly.
* **Real-time Recalculations:** Clicking add/delete/change numbers recalculates all sub-totals and taxes immediately.
* **Secure API Keys:** Critical keys (like Google Gemini API credentials) are stored safely on the server side to protect against data leakage.
* **Client Boundaries:** Ensure customer accounts can only view their own quotes, while reserving the stats and database manager desk for verified managers.
`
  },
  {
    id: 'non-functional-requirements',
    sectionNumber: 8,
    title: 'Quality & Speed Targets',
    subtitle: 'Fast load times, sharp design, and reliability',
    content: `
## Speed and Reliability Standards

* **Sub-Second Loading:** Initial website visual assets load fully in **less than a second** for a snappy experience.
* **Snappy Recommendations:** The AI populates custom lists and scores compatibility within **1.5 seconds**.
* **Contrast Compliance:** Highly legible text colors pairing slate grays and blue accents to maintain accessible viewing guidelines.
* **Safe Session Teardowns:** Completely sanitizes user active memory on logout to comply with corporate privacy guidelines.
* **99.95% Availability:** Deployed on reliable cloud server setups to guarantee the app stays online with minimal disruption.
`
  },
  {
    id: 'ai-integration-details',
    sectionNumber: 9,
    title: 'Under the Hood: AI Parsing',
    subtitle: 'How we instruct Gemini to treat client statements cleanly',
    content: `
## Communicating with Google Gemini

Our server routes customer requirements directly to Google's Gemini models using safe instructions:

* **Strict Catalog Matching:** Ensure the AI only recommends items that physically exist in our warehouse stock (such as MacBooks, Projectors, or high-end Audio Systems).
* **Integrate Peripherals:** If the client wants more than 5 computers, automatically suggest high-density internet switches to ensure success.
* **Simple Explanation Notes:** Instruct the model to draft descriptive helper labels explaining *why* it fits (like *"Best for bright corporate presentations"*).
`
  },
  {
    id: 'technology-stack',
    sectionNumber: 10,
    title: 'Technology & Libraries',
    subtitle: 'The modern frameworks behind the platform',
    content: `
## Tech Stack Highlights

We built our app using only lightweight, fast, and secure tools:

* **React & TypeScript:** For writing responsive user controls and clean modules.
* **Tailwind CSS:** For eye-safe colors and premium, modern layouts in dark/light modes.
* **Motion (by motion/react):** For smooth transition movements and entry effects.
* **Recharts:** For presenting manager analytics lines and trend forecasting simply.
* **Google GenAI SDK:** Communicating server-side with Gemini-3.5-Flash safely.
`
  },
  {
    id: 'database-structure',
    sectionNumber: 11,
    title: 'Database Design',
    subtitle: 'Four simple document collections',
    content: `
## How We Structure Stored Data

We organize our records in four clean document collections:

1. **Users:** Simple credentials including corporate name, email, and role tiers.
2. **Devices (Inventory):** Tracks device model catalogs, prices per day, and current warehouse stock counts.
3. **Quotations (Invoices):** Logs checkout values, start/end dates, tax points, and list collections.
4. **Analytics Log:** Stores historical stats used to render the administrative line charts.
`
  },
  {
    id: 'api-requirements',
    sectionNumber: 12,
    title: 'Systems Interconnections',
    subtitle: 'Simple APIs connecting front and back layers',
    content: `
## Connection Paths (Endpoints)

The system passes information using four secure API routes:

* **Generate Setup:** Takes text box prompt entries and outputs list recommendations in seconds.
* **Inventory Catalog:** Fetches the active list of laptops, adapters, and accessories with pricing.
* **Compile Quote:** Binds selected rates, times, and VAT lines to create a permanent invoice card.
* **Platform Metrics:** Pulls recent transaction summaries and conversion percentages for dashboards.
`
  },
  {
    id: 'future-enhancements',
    sectionNumber: 13,
    title: 'Future Features',
    subtitle: 'Upcoming exciting upgrades',
    content: `
## Future Product Roadmap

* **WhatsApp Ordering Bot:** Let clients request, review, and confirm equipment packages straight within WhatsApp text chains.
* **Voice-Controlled Setup:** Enable complete, hands-free voice dictation to assemble gear packages by simply speaking.
* **Smart Warehouse Balancer:** Let server machines predict supply/demand spikes and prompts managers to rebalance assets beforehand.
* **Camera Scanners:** Take quick photos of returned laptops to automatically screen for scratches and confirm equipment quality.
`
  },
  {
    id: 'business-benefits',
    sectionNumber: 14,
    title: 'Business Values (ROI)',
    subtitle: 'Saving hours and boosting transaction volumes',
    content: `
## Commercial Advantages

* **Boost Conversions (+35%):** Locking prices instantly keeps clients from losing track or shopping around.
* **Save Support Costs (-40%):** Let AI manage repetitious, basic cable alignment or display brightness questions automatically.
* **Increase Order Values:** Automatic warnings about missing adapters or chargers prompts users to add high-margin accessories.
* **100% Fulfilment Accuracy:** Real stock catalog matches ensure the shipping crew packs the exact gear booked without emergency substitutions.
`
  },
  {
    id: 'internship-summary',
    sectionNumber: 15,
    title: 'Platform Summary',
    subtitle: 'High standards met with beautiful design',
    content: `
## Final Summary

* **Highly Complete Demo:** Composes beautiful public landing layouts, a high-fidelity workspace calculator, invoices, and active analytics dashboards.
* **Pristine Performance:** Safe, server-side API integration matching modern standards.
* **Aesthetic Focus:** Styled meticulously using soft spacing rhythms, accessible contrast levels, and seamless transition sequences.
`
  }
];
