# Shopify Countdown Timer App – Assignment Submission

## Overview

This project is a sample Shopify app built as part of a time-bound assignment.  
The goal was to design and implement a countdown timer system that merchants can use to create urgency on product pages.

Given the limited timeframe and the fact that this was my first hands-on experience building a Shopify app using the MERN stack, the focus was on understanding the problem deeply, learning the ecosystem, and implementing the core business logic in a clean and explainable way.

---

## What I Implemented

### Countdown Timer Logic

- **Fixed Timers**
  - Absolute start and end time
  - Same countdown for all users
- **Evergreen Timers**
  - Per-user countdown concept
  - Duration-based logic (handled on the client conceptually)

### Backend API

- Node + Express backend
- API endpoint to determine whether a timer is active for a given product
- Clear response contract:
  - `{ active: false }` when no timer applies
  - `{ active: true, timer: {...} }` when a timer is active
- Simple prioritization (latest created timer wins)

### Data Modeling

- Timer schema designed to support:
  - multiple timer types
  - product-level targeting
  - basic analytics (impressions)
- For local testing, an **in-memory data store** was used to simulate timer records

### Shopify Architecture Alignment

- Project structured following Shopify app conventions
- `shopify.js` scaffolded to represent the Shopify configuration layer
- Backend and API boundaries designed to be compatible with a Theme App Extension approach

---

## AI-Assisted Timer Generation (Concept)

As an optional enhancement, the app is designed to support an AI-assisted flow for faster timer creation.

Proposed flow:

- Merchant selects a product or collection
- Merchant provides a short intent (e.g. “flash sale”, “launch offer”)
- AI suggests:
  - timer type (fixed or evergreen)
  - duration
  - basic urgency copy

The AI is strictly assistive:

- Suggestions are editable
- Nothing is auto-saved or auto-published
- No discounts, pricing, or false scarcity are generated unless explicitly stated by the merchant

Given the limited timeframe and environment constraints, this feature is documented at a design level rather than fully implemented.  
The backend is structured so that a deterministic or LLM-based AI service can be plugged in later without changing the API contract.

## Technical Challenges Faced

### Environment & Network Constraints

- Corporate laptop SSL restrictions caused issues with:
  - Shopify CLI certificate validation
  - Cloudflare tunnel stability
- These issues made it difficult to consistently access preview URLs during development

### Workarounds Applied

- Used Shopify CLI with SSL verification disabled for local development
- Validated backend logic using:
  - in-memory data instead of MongoDB runtime
  - direct API testing rather than full storefront embedding

These decisions were made to continue validating core logic rather than blocking on infrastructure.

---

## Limitations of the Current Implementation

- MongoDB is not wired at runtime (schema is designed, but local DB was unavailable)
- Collection-level and global targeting not implemented
- Admin UI is scaffold-level, not production-polished
- Storefront widget UI not fully embedded in a theme
- Shopify Admin API calls are not fully exercised

---

## What I Would Improve With More Time

- Complete MongoDB integration
- Full Shopify OAuth + session handling
- Collection and global timer targeting
- Polished Polaris-based Admin UI
- Lightweight storefront widget with animations
- LLM-powered AI copy generation with schema validation

---

## Learning Takeaway

This assignment was a strong learning experience in:

- Understanding Shopify app architecture
- Working with Node/Express in a new ecosystem
- Designing backend logic independent of UI
- Handling real-world infrastructure constraints under time pressure

My primary experience is in Python, React, and AI systems, and this project reflects my approach to learning unfamiliar tooling while still delivering a structured and thoughtful solution.
