# How to Run Lumina Beauty (Serverless)

You have successfully converted Lumina Beauty to a serverless app using Firebase! Follow these steps to get it running.

## 1. Clean Up Files
Since the automated cleanup failed, please manually delete these folders/files to avoid confusion:
- Delete the `backend` folder.
- Inside `frontend`, delete everything **EXCEPT** the `public` folder.
  - Keep: `frontend/public/index.html`
  - Delete: `frontend/src`, `frontend/node_modules`, `frontend/package.json`, etc.

## 2. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** and name it `Lumina-Beauty`.
3. Disable Google Analytics (optional) and create the project.

## 3. Enable App Services
Once your project is ready:

### Authentication
1. Go to **Build > Authentication** in the sidebar.
2. Click **Get Started**.
3. Select **Email/Password** provider and **Enable** it.
4. Click **Save**.

### Firestore Database
1. Go to **Build > Firestore Database**.
2. Click **Create Database**.
3. Select a location (e.g., `eur3` or `us-central`).
4. **IMPORTANT**: Choose **Start in Test Mode** for now (allows easier access).
5. Click **Create**.

## 4. Get Your Configuration Keys
1. In the Project Overview (gear icon ⚙️ > Project settings).
2. Scroll down to **Your apps**.
3. Click the web icon (`</>`) to add a web app.
4. Name it `Lumina Web` and click **Register app**.
5. You will see a code block with `const firebaseConfig = { ... }`.
6. **Copy only the object inside the braces** (apiKey, authDomain, etc.).

## 5. Update Your Code
1. Open `frontend/public/index.html` in your editor.
2. Scroll to around line 497 (search for `const firebaseConfig`).
3. Replace the placeholder values with the keys you copied:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSy...",
    authDomain: "lumina-beauty.firebaseapp.com",
    projectId: "lumina-beauty",
    storageBucket: "lumina-beauty.appspot.com",
    messagingSenderId: "1234...",
    appId: "1:1234..."
};
```

## 6. Run the App
- **Option A (Recommended)**: If using VS Code, install the "Live Server" extension, right-click `frontend/public/index.html`, and choose **Open with Live Server**.
- **Option B (Simple)**: Double-click `frontend/public/index.html` to open it in your browser. (Note: Some distinct features might require a real server context).

## 7. Seed the Database
1. When the app opens, click **Sign In** and create a new account (Register).
2. Once logged in, you will be redirected to the **My Account** view.
3. Look for the "Admin Controls" section and click the blue **Reset / Seed Database Data** button.
4. Wait for the alert "Seeded!", and the page will reload.
5. You should now see all Products and Services loaded!

**Enjoy your new serverless app!** 🚀
