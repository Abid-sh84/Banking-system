# Virtual Debit Card Feature

This document outlines the virtual debit card feature added to the banking application.

## Overview

The virtual debit card feature allows customers to:
- Apply for a virtual debit card through their dashboard
- View their virtual card details once activated
- Use their virtual card for online transactions

Bankers can:
- View all virtual card applications
- Activate or deactivate virtual cards
- Block cards if needed

## Technical Implementation

### Database Structure

The feature adds a new `virtual_cards` table with the following structure:

```sql
CREATE TABLE virtual_cards (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  card_number VARCHAR(16) NOT NULL,
  cardholder_name VARCHAR(100) NOT NULL,
  expiry_date VARCHAR(5) NOT NULL,
  cvv VARCHAR(3) NOT NULL,
  status VARCHAR(20) CHECK (status IN ('active', 'inactive', 'blocked')) DEFAULT 'inactive',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  CONSTRAINT unique_customer_card UNIQUE (customer_id)
);
```

### Backend APIs

The feature adds the following API endpoints:

- `POST /cards/apply` - Customer applies for a virtual card
- `GET /cards/my-card` - Customer gets basic info about their card
- `GET /cards/my-card/full-details` - Customer gets complete card details (for active cards only)
- `GET /cards/all` - Banker gets all virtual cards in system
- `PATCH /cards/:cardId/status` - Banker updates card status (activate/deactivate/block)

### Frontend Components

New components added:
- `VirtualCard.vue` - Displays the virtual debit card with visual styling
- `CardApplicationModal.vue` - Modal for customers to apply for a virtual card
- `VirtualCardSection.vue` - Section in customer dashboard for card management
- `VirtualCardManagement.vue` - Component for bankers to manage all cards

## Setup Instructions

1. Run database migrations to create the virtual_cards table:
   ```
   node run_migrations.js
   ```

2. Restart both backend and frontend servers:
   ```
   # Backend
   cd project/backend
   npm run dev

   # Frontend
   cd project/frontend
   npm run dev
   ```

3. Test the feature:
   - Log in as a customer and apply for a virtual card
   - Log in as a banker to activate the card
   - Log back in as customer to see the activated card

## Security Considerations

- Card numbers are masked in most API responses
- Full card details (including CVV) are only sent when explicitly requested
- Only active cards can reveal full details
- Only the card owner can see their own card details
