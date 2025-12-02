# 🚀 Complete Setup Guide - Backend + Database

## ✅ Step-by-Step Instructions:

### 1. Install MongoDB

**Option A: Local MongoDB (Recommended for development)**
- Download from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service
- Default connection: `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud)**
- Create free account at: https://www.mongodb.com/atlas
- Create a cluster
- Get connection string
- Update `.env` file

---

### 2. Setup Backend

```bash
cd lumina-beauty-app/backend

# Create .env file
copy .env.example .env

# Install dependencies
npm install

# Seed the database with data
node seed.js

# Start the server
npm run dev
```

**Expected output:**
```
✅ Connected to MongoDB
🗑️  Cleared existing data
✅ Inserted 10 products
✅ Inserted 15 services
✅ Inserted 24 providers
🎉 Database seeded successfully!
```

Then start the server:
```bash
npm run dev
```

**Expected output:**
```
🚀 Server running on port 5000
📍 API available at http://localhost:5000/api
✅ MongoDB connected successfully
```

---

### 3. Setup Frontend

**New terminal:**
```bash
cd lumina-beauty-app/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected output:**
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

---

### 4. Open in Browser

Go to: `http://localhost:3000`

**You should see:**
- ✅ Sky blue navigation bar
- ✅ Hero banner
- ✅ 10+ services (from database)
- ✅ 24 providers (from database)
- ✅ 10 products (from database)
- ✅ Floating contact button
- ✅ Everything working!

---

## 🔧 Troubleshooting:

### Backend won't start:
```bash
# Check if MongoDB is running
# Windows: Services > MongoDB Server
# Mac/Linux: sudo systemctl status mongod

# Or use MongoDB Atlas connection string in .env
```

### Frontend shows "Loading..." forever:
```bash
# Make sure backend is running on port 5000
# Check: http://localhost:5000/api/health
```

### Port already in use:
```bash
# Backend: Change PORT in .env
# Frontend: Change port in vite.config.js
```

---

## 📊 Database Contents:

After running `node seed.js`, your database will have:

**Products (10):**
- Movit Hair Food
- Shea Moisture Curl Cream
- Darling Braiding Hair
- Cantu Leave-In Conditioner
- African Black Soap
- Cocoa Butter Lotion
- Edge Control Gel
- Nail Polish Set
- Argan Oil Hair Serum
- Shea Butter (Raw)

**Services (15):**
- Box Braids, Knotless Braids, Cornrows
- Passion Twists, Faux Locs, Senegalese Twists
- Afro Styling, Silk Press
- Pedicure, Manicure, Gel Nails
- Goddess Braids, Weave Installation
- Wig Styling, Dreadlocks Maintenance

**Providers (24):**
- Mix of Hair, Nails, Barber, and Makeup specialists
- All verified and rated 4.0+
- Located in Uganda

---

## 📞 Contact Features:

- **WhatsApp**: Opens chat to +256702370441
- **Call**: Direct call to +256702370441
- **Locations**: Floating button + Cart footer

---

## ✨ All Features Working:

✅ Browse products from database
✅ Browse services from database
✅ View providers from database
✅ Add to cart
✅ Book services
✅ View provider profiles
✅ Contact via WhatsApp/Call
✅ Sky blue navigation
✅ Futuristic provider section
✅ Mobile responsive

---

**Everything is ready!** 🎊

Just run:
1. `node seed.js` (one time)
2. `npm run dev` in backend
3. `npm run dev` in frontend
