# Star Q Website – Development Requirements & Master Prompt

## Project Context

Star Q is an academic book series published by Sri Siri Publishers, Machilipatnam, Andhra Pradesh, India. The organization is transitioning from manual Excel-based financial and sales tracking toward a structured, analytics-driven digital system.

This document defines **ONLY the website-related development requirements** starting from **accepting Excel files as input** and ending with **analytics dashboards as output**. It is intentionally written so that it can be directly provided to an LLM to generate the full website (frontend + necessary backend APIs).

---

## Scope Definition

### Included in Scope

- Web-based Excel upload interface
- Backend processing of Excel files
- Data normalization and validation
- Centralized data storage
- Analytics computation
- Web-based analytics dashboards

### Explicitly Excluded

- OCR or image-based ingestion
- Handwritten document processing
- Predictive analytics
- Advanced role-based access control
- Mobile apps

---

## High-Level Website Responsibilities

The website must act as:

1. A **secure data entry point** for Excel uploads
2. A **processing layer trigger** for normalization
3. A **visual analytics platform** for business insights

---

## Functional Requirements

### 1. Excel Upload (Input Layer – Web)

**Purpose:** Allow authorized users to upload Excel files through the website.

**Requirements:**

- Upload Excel files (.xls, .xlsx)
- Support multiple sheets per file
- Validate file type and size
- Capture metadata:

  - Upload timestamp
  - Uploaded by (basic identifier)
  - Original filename

- Display upload status (success / failed / partially processed)

**UI Components:**

- File upload drop zone or selector
- Upload progress indicator
- Status and error messages

---

### 2. Excel Parsing & Normalization (Backend Logic Triggered by Website)

**Purpose:** Convert inconsistent Excel data into analytics-ready structured records.

**Requirements:**

- Detect header rows dynamically
- Map inconsistent column names to canonical fields
- Ignore totals, summary rows, and empty rows
- Validate mandatory fields (date, amount, distributor)
- Convert:

  - Dates to ISO format
  - Amounts to numeric values

- Derive month and year fields
- Flag duplicates and invalid rows

**System Principle:**
Data correctness must be prioritized over automation.

---

### 3. Data Storage (Single Source of Truth)

**Purpose:** Persist both raw and normalized data for analytics and auditability.

**Requirements:**

- Store raw extracted rows
- Store normalized transactional records
- Maintain linkage between raw and normalized data
- Preserve ingestion metadata

**Logical Separation:**

- Raw Data Collection
- Normalized Data Collection

---

### 4. Analytics Computation

**Purpose:** Generate reliable business insights from normalized data.

**Analytics Requirements:**

- Daily revenue aggregation
- Monthly revenue aggregation
- Quarterly revenue aggregation
- Distributor-wise revenue summaries
- Time-based trends

**Implementation Rule:**
All analytics logic must reside on the backend and be exposed via APIs.

---

### 5. Analytics Dashboard (Website Output)

**Purpose:** Present insights visually through the website.

**Dashboard Features:**

- KPI cards (Total Revenue, Monthly Revenue, Quarterly Revenue)
- Time-series charts
- Distributor-wise tables
- Filters:

  - Date range
  - Distributor

- Drill-down from summary to detailed tables

**Design Guidelines:**

- Clean, professional, business-focused UI
- Fast-loading dashboards
- No client-side heavy data processing

---

## Non-Functional Requirements

### Performance

- Analytics queries must return within acceptable response times
- Index frequently queried fields

### Scalability

- Support growing historical Excel data
- Allow future data sources without redesign

### Maintainability

- Clear separation between ingestion, analytics, and presentation
- Centralized normalization logic

### Security (Basic)

- Restricted access to Excel upload
- Read-only access for analytics viewers

---

## End-to-End Data Flow

Excel Upload (Website)
→ Backend Parsing & Normalization
→ Raw + Normalized Storage
→ Analytics Aggregations
→ Website Dashboards

---

## Recommended Tech Stack

### Frontend

- Next.js (App Router)
- React
- Tailwind CSS
- Charting library (lightweight)

### Backend

- Node.js / API routes
- Excel parsing library
- MongoDB

---

## MASTER PROMPT FOR LLM (USE AS-IS)

```
You are a senior full-stack architect.

Build a complete web application that accepts Excel files as input
and provides business analytics as output.

CONTEXT:
The system is used by a book publishing company to analyze sales,
revenue, and distributor performance from Excel files.

FUNCTIONAL FLOW:
1. Website-based Excel upload
2. Backend parsing and normalization
3. Centralized data storage (raw + normalized)
4. Backend analytics computation
5. Web-based analytics dashboards

REQUIREMENTS:
- Prioritize data correctness over full automation
- Support inconsistent Excel formats
- Maintain single source of truth
- Backend-driven analytics
- Clean, professional dashboard UI

TECH STACK:
- Next.js (frontend)
- Node.js APIs
- MongoDB
- Tailwind CSS

OUTPUT EXPECTED:
- Frontend pages and components
- Backend API design
- Data models
- Analytics aggregation logic
- Dashboard UI

Do NOT include OCR, handwritten processing, or predictive analytics.
```

---

## Success Criteria

- Excel files can be uploaded and processed reliably
- Analytics dashboards reflect correct revenue numbers
- Users no longer rely on manual Excel consolidation

---

End of document.
