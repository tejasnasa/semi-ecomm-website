# Semi-Ecommerce Website: CSV Import & Product Display

A modern web application that imports electrical component specifications from a CSV file into a PostgreSQL database and displays them in an organized manner. 

The project consists of a **Node.js + Express** REST API backend powered by **Prisma ORM**, and a **React + TypeScript** frontend powered by **Vite**.

---

## 🌐 Live Deployments

- **Frontend App**: [https://semi-ecomm-website.vercel.app/](https://semi-ecomm-website.vercel.app/)
- **Backend API**: [https://ecomm-api-beta.vercel.app/](https://ecomm-api-beta.vercel.app/)

---

## 🚀 Key Features

- **CSV Import & Seeding**: Automated ingestion of product specifications from a CSV file (`Assignment.csv`) using `csv-parse`.
- **Intelligent Association Logic**: Correctly handles and represents complex CSV formatting rules (e.g. empty fields, dashes, and filled cells).
- **RESTful API**: Fast and clean API endpoints to query products by category, subcategory, or specific part numbers.
- **Dynamic Product Catalog**: Clean React-based layout that filters products by categories and subcategories, displaying only relevant specifications for the selected product line.
- **Modern Styling System**: Sleek glassmorphism look, custom loaders, and hover effects built with Vanilla CSS.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React (v19), TypeScript, Vite, Vanilla CSS, Axios |
| **Backend** | Node.js, Express, TypeScript, Nodemon |
| **Database & ORM** | PostgreSQL, Prisma ORM, Prisma Client |
| **Data Ingestion** | `csv-parse` |

---

## 📋 CSV Parsing & Association Rules

The product catalog interprets cells based on the following assignment criteria:

1. **Filled Cell**: The part number is associated with that column and the cell's value represents its specification.
2. **Empty Cell**: The part number is **not** associated with that column (renders as blank/empty in the table).
3. **Dash (`-`)**: Although the cell looks empty or blank conceptually, a dash signifies that the part number **is** associated with that column, and it renders as a dash indicating active association.

---

## 📁 Project Directory Structure

```text
semi-ecomm-website/
├── client/                 # React Frontend Application
│   ├── src/
│   │   ├── components/     # UI Components (Navbar, Sidebar, ProductTable)
│   │   ├── hooks/          # Custom Hooks (useProducts data-fetching)
│   │   ├── types/          # TypeScript Interfaces
│   │   ├── App.tsx         # Main Layout Component
│   │   └── main.tsx        # React Entrypoint
│   ├── .env                # Frontend environment variables
│   ├── package.json
│   └── vite.config.ts
│
├── server/                 # Node.js Express Backend API
│   ├── prisma/
│   │   ├── migrations/     # Prisma SQL Migrations
│   │   ├── schema.prisma   # Prisma Database Model Definitions
│   │   └── seed.ts         # CSV Parser & Database Seeder script
│   ├── src/
│   │   ├── lib/            # Shared Library clients (Prisma client)
│   │   ├── routers/        # Express Route Controllers (product router)
│   │   └── index.ts        # Backend Entrypoint
│   ├── .env                # Backend configuration (PORT, DATABASE_URL)
│   ├── Assignment.csv      # Source CSV dataset
│   └── package.json
```

---

## 📡 REST API Documentation

### 1. Get Products
Fetches list of products. Supports filtering by query parameters.
- **Endpoint**: `/product`
- **Method**: `GET`
- **Query Parameters**:
  - `category` (optional): Filter products by top-level category name.
  - `subcategory` (optional): Filter products by sub-category name.
- **Example Response**:
  ```json
  [
    {
      "id": "a988d8b2-5f60-449e-b9ee-8be52e694fb2",
      "category": "Mosfet",
      "subcategory": "MPO87",
      "partNo": "PART508",
      "datasheetUrl": "https://www.syncpower.com/datasheet/SPN1012.pdf",
      "vdss": null,
      "vgs": "54",
      "vthMin": null,
      "vthMax": null,
      "idTa25": null,
      "vthVMax": null,
      "ron45v": null,
      "ron10v": null
    }
  ]
  ```

### 2. Get Product by Part Number
Fetches detail for a specific part number.
- **Endpoint**: `/product/:partNo`
- **Method**: `GET`
- **Path Parameter**:
  - `partNo` (required): The part number of the product.
- **Example Response**:
  ```json
  [
    {
      "id": "e305e921-6547-4971-8bc6-9fb8c13f62e8",
      "category": "Plastic Film Capacitors",
      "subcategory": "PF785",
      "partNo": "PART514",
      "datasheetUrl": "https://www.syncpower.com/datasheet/SPN1012.pdf",
      "vdss": "-",
      "vgs": null,
      ...
    }
  ]
  ```

### 3. Health Check
Checks backend health.
- **Endpoint**: `/healthz`
- **Method**: `GET`
- **Response**:
  ```json
  { "status": "ok" }
  ```

---

## 🗄️ Database Schema (Prisma)

The application uses the following `Product` model schema defined in `server/prisma/schema.prisma`:

```prisma
model Product {
  id           String     @id @default(uuid())
  category     String
  subcategory  String
  partNo       String     @unique
  datasheetUrl String?
  vdss         String?
  vgs          String?
  vthMin       String?
  vthMax       String?
  idTa25       String?
  vthVMax      String?
  ron45v       String?
  ron10v       String?
}
```

---

## ⚙️ Setup & Installation Guide

Follow these steps to set up the project locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [NPM](https://www.npmjs.com/) (installed with Node.js)
- A PostgreSQL database instance (e.g., hosted on [NeonDB](https://neon.tech/))

---

### Step 1: PostgreSQL Setup (NeonDB)

1. Sign up/Log in to [Neon Console](https://neon.tech/).
2. Create a new Project (select PostgreSQL version 15 or 16).
3. Once created, navigate to the **Dashboard** and locate the **Connection Details** section.
4. Copy the connection string. It will look like this:
   ```text
   postgresql://<user>:<password>@<neon-hostname>/neondb?sslmode=require
   ```

---

### Step 2: Configure the Backend Server

1. Open the `/server` directory:
   ```bash
   cd server
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Create or update the `.env` file in the `server` directory and add your connection string:
   ```env
   PORT=3000
   DATABASE_URL="YOUR_NEON_DATABASE_CONNECTION_STRING"
   ```
4. Generate the Prisma client and apply database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Ingest the CSV data into your database by running the seed script:
   ```bash
   npx prisma db seed
   ```

---

### Step 3: Configure the Frontend Client

1. Navigate to the `/client` directory:
   ```bash
   cd ../client
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Ensure the `.env` file in the `client` directory correctly points to the backend server's port (default `3000`):
   ```env
   VITE_BACKEND_URL=http://localhost:3000/product
   ```

---

## 🏃 Running the Application

For development, run both the frontend and backend servers simultaneously.

### 1. Start the Backend Server
From the `/server` directory:
```bash
npm run dev
```
The backend will launch and listen at [http://localhost:3000](http://localhost:3000).

### 2. Start the Frontend Server
From the `/client` directory:
```bash
npm run dev
```
The React development server will start and typically run at [http://localhost:5173](http://localhost:5173).

---

## 🧪 Testing client-server communication
To verify that everything is working:
1. Open [http://localhost:5173](http://localhost:5173) in your browser.
2. The navbar and sidebar should load categories/subcategories automatically fetched from the database.
3. Clicking on any subcategory in the sidebar will query `/product?category=...&subcategory=...` and display the specification matrix matching syncpower.com rules.
