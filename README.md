## Product Explorer Dashboard

This is a small, production-style frontend application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS** for the “Frontend Technical Assignment” [`file:///e%3A/Projects/Assestment/Frontend%20Technical%20Assignment.pdf`](file:///e%3A/Projects/Assestment/Frontend%20Technical%20Assignment.pdf).

The app uses the public Fake Store API (`https://fakestoreapi.com/products`) to display products with search, filtering, favorites, and infinite scroll.

## Tech Stack

- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS (via `@tailwindcss/postcss` and `@import "tailwindcss"`)
- **Language**: TypeScript with strict typings for API responses

## Features Implemented

- **Product Listing Page**
  - Fetches products from `https://fakestoreapi.com/products`
  - Responsive grid layout with image, title, price, category, and rating
  - **Skeleton loading** state (`app/loading.tsx`)
  - **Global error** state with retry (`app/error.tsx`)

- **Search & Filtering**
  - Client-side **search by product title**
  - **Category filter** (derived from loaded products)
  - **Favorites-only filter** toggle

- **Product Details Page**
  - Dynamic route: `/products/[id]`
  - Shows large image, title, description, price, category, and rating
  - Loading and not-found states (`products/[id]/loading.tsx`, `products/[id]/not-found.tsx`)

- **Favorites Feature**
  - Mark/unmark products as **Favorites**
  - Favorites status stored in **localStorage** (`FavoritesContext`)
  - Favorites integrated into both listing cards and product details page

- **Infinite Scroll**
  - Client-side infinite scroll in the product grid
  - Loads more products as the user scrolls using `IntersectionObserver`
  - No traditional pagination UI, as requested

- **Responsive Design**
  - Mobile-first layout
  - Grid adjusts for mobile, tablet, and desktop breakpoints
  - Uses the default Geist font via `next/font`

## Project Structure (Key Files)

- `src/app/page.tsx` – Home page, server component fetching products and rendering the `ProductExplorer`
- `src/app/products/[id]/page.tsx` – Product details page (dynamic route)
- `src/app/loading.tsx` – Global loading skeleton for the main listing
- `src/app/error.tsx` – Global error boundary UI
- `src/components/ProductExplorer.tsx` – Main client component with search, filters, favorites-only toggle, and infinite scroll
- `src/components/ProductCard.tsx` – Reusable product card
- `src/components/FavoritesContext.tsx` – Favorites context + localStorage persistence
- `src/components/FavoriteToggleButton.tsx` – Heart/favorite toggle button
- `src/lib/api.ts` – Typed product API client
- `src/types/product.ts` – `Product` and `ProductCategory` TypeScript types

## Getting Started

1. **Install dependencies**

```bash
cd product-explorer
npm install
```

2. **Run the development server**

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Assumptions & Trade-offs

- Uses the Fake Store API as-is; no additional backend or caching layer beyond Next.js `fetch` with `revalidate`.
- Categories are derived from the loaded products instead of calling the separate categories endpoint.
- Infinite scroll is implemented client-side over the full dataset returned by the API, which is small; for larger datasets, a paged API would be preferable.
- Favorites are stored per-browser in `localStorage` and are not synced across devices.

