# 🟠 Bhagat Nutrition — Full-Stack Website

A premium supplement e-commerce website built with the MERN stack (MongoDB replaced by JSON flat files — zero database setup required).

## ✨ Features

- **Dark premium UI** — Tailwind CSS custom design system, brand orange palette
- **Fully responsive** — Mobile-first, works on all screen sizes
- **Product catalog** — 16 products with filtering, sorting, search & pagination
- **Cart** — Zustand persisted cart, variant support, free shipping tracker
- **Checkout** — 3-step flow: review → info → payment (UPI/card/COD)
- **Order tracking** — Track by order ID or tracking number
- **Coupon system** — FIRST10 (10% off), PREPAID75 (₹75 off on ₹5000+ prepaid)
- **Free gift** — Auto-applied on prepaid orders ≥ ₹1,000
- **Supplement programs** — 4 expert-curated stacks
- **All pages** — Home, Catalog, Product Detail, Checkout, FAQ, About, Authorization, Returns, Contact, Track Order, Programs

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ 
- npm 9+

### 1. Install dependencies

```bash
npm run install:all
```

This installs both root (server) and client dependencies in one command.

### 2. Start the development server

```bash
npm run dev
```

This runs both the Express API (port 5000) and Vite dev server (port 5173) concurrently.

Open **http://localhost:5173** in your browser.

> The Vite proxy forwards `/api` requests to `http://localhost:5000` automatically — no CORS issues.

---

## 📁 Project Structure

```
bhagat-nutrition/
├── package.json          # Root — scripts for running both server + client
├── vercel.json           # Vercel deployment config
├── .env                  # Environment variables (server)
│
├── server/
│   ├── index.js          # Express app entry point
│   ├── routes/
│   │   ├── products.js   # GET /api/products, GET /api/products/:id
│   │   ├── categories.js # GET /api/categories
│   │   ├── brands.js     # GET /api/brands
│   │   ├── goals.js      # GET /api/goals
│   │   ├── orders.js     # POST /api/orders, GET /api/orders/track/:id
│   │   └── contact.js    # POST /api/contact
│   └── data/
│       ├── products.json
│       ├── categories.json
│       ├── brands.json
│       ├── goals.json
│       └── orders.json   # Created fresh — orders are appended here
│
└── client/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── components/
        │   ├── layout/   Navbar, Footer
        │   ├── cart/     CartDrawer
        │   └── ui/       ProductCard, Spinner
        ├── pages/        All page components
        ├── store/        cartStore.js (Zustand + persist)
        └── utils/        api.js, helpers.js
```

---

## 🛠️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Run server + client concurrently (development) |
| `npm run server` | Run Express server only (nodemon, auto-reload) |
| `npm run client` | Run Vite dev server only |
| `npm run build` | Build React client for production |
| `npm start` | Run Express server in production mode |
| `npm run install:all` | Install all dependencies (root + client) |

---

## ☁️ Deploy to Vercel

### One-click deploy

1. Push the project to a GitHub repo
2. Import the repo on [vercel.com](https://vercel.com)
3. Vercel auto-detects `vercel.json` — no extra configuration needed
4. Deploy!

### Manual CLI deploy

```bash
npm install -g vercel
vercel
```

The `vercel.json` routes:
- `/api/*` → Express Node.js serverless function
- `/*` → React SPA (client/dist)

---

## 🔧 Environment Variables

Copy `.env.example` to `.env` and adjust if needed:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

For Vercel, set `NODE_ENV=production` and `CLIENT_URL` to your Vercel domain in the Vercel dashboard → Settings → Environment Variables.

---

## 🛒 Coupon Codes (for testing)

| Code | Discount |
|---|---|
| `FIRST10` | 10% off on any order |
| `PREPAID75` | ₹75 off on prepaid orders ≥ ₹5,000 |

---

## 📞 WhatsApp Number

The WhatsApp number is hardcoded as `+91 99999 99999` throughout the codebase. Replace it with the real number before going live.

Search for `919999999999` and replace with the actual number.

---

## 🗂️ Data

All data lives in `server/data/*.json`. To add products:
1. Open `server/data/products.json`
2. Add a new product object following the existing schema
3. No restart needed in dev (auto-reloads)

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router v6 |
| Styling | Tailwind CSS v3 (custom dark theme) |
| State | Zustand with localStorage persistence |
| HTTP | Axios (client → `/api` proxy) |
| Icons | lucide-react |
| Fonts | Inter + Sora (Google Fonts) |
| Notifications | react-hot-toast |
| Backend | Node.js, Express |
| Data | JSON flat files (no database) |
| Security | helmet, express-rate-limit, compression |
| Deploy | Vercel (vercel.json included) |
