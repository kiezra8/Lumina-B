# Quick Start - Simple Steps

## Option 1: Frontend Only (No Backend Needed)

This will work immediately with mock data:

```bash
# Step 1: Open terminal in frontend folder
cd c:\Users\Jolly\Lumina B\lumina-beauty-app\frontend

# Step 2: Install dependencies (if not done)
npm install

# Step 3: Start the app
npm run dev
```

Then open: `http://localhost:3000`

**You should see the app with mock data!**

---

## Option 2: Full Stack (Frontend + Backend)

### Terminal 1 - Backend:
```bash
cd c:\Users\Jolly\Lumina B\lumina-beauty-app\backend
npm install
npm run dev
```

### Terminal 2 - Frontend:
```bash
cd c:\Users\Jolly\Lumina B\lumina-beauty-app\frontend
npm install
npm run dev
```

Then open: `http://localhost:3000`

---

## If npm install fails:

Try running in Command Prompt (not PowerShell):
1. Press `Win + R`
2. Type `cmd` and press Enter
3. Run the commands above

---

## If port 3000 is busy:

The app will automatically use the next available port (3001, 3002, etc.)

---

## Still not working?

Check `TROUBLESHOOTING.md` for detailed help.
