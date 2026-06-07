# Prompt Improver - Extension Foundation

This directory contains the source code for the Chrome and Edge Extension, built with **React**, **TypeScript**, **Vite**, and **Manifest V3**. It uses a custom **Vanilla CSS** design system for a premium glassmorphic interface and **Lucide React** for icons.

---

## 📁 Folder Structure

```
extension/
├── public/                 # Static assets copied directly to build output
│   ├── icons/              # Generated extension logo sizes (16x16, 48x48, 128x128)
│   ├── manifest.json       # Manifest V3 configuration file
│   └── favicon.svg         # Favicon for browser preview
├── src/
│   ├── login/              # Login interface (Supabase Google Auth visual shell)
│   │   └── LoginView.tsx
│   ├── popup/              # Core prompt optimizer interface
│   │   └── PopupView.tsx
│   ├── history/            # Saved prompt optimizations & scoring log
│   │   └── HistoryView.tsx
│   ├── settings/           # API config, limits tracking, and logout menu
│   │   └── SettingsView.tsx
│   ├── hooks/              # Custom React hooks (e.g., storage integration)
│   │   └── useStorage.ts
│   ├── services/           # Backend API integration layer
│   │   └── api.ts
│   ├── App.tsx             # Root frame coordinating auth and routing states
│   ├── index.css           # Premium vanilla CSS styling system
│   └── main.tsx            # App entry point
├── dist/                   # Production-ready build directory (Load Unpacked points here)
├── generate-icons.js       # Auto-generator script for default extension PNG icons
├── vite.config.ts          # Vite configuration for bundling React & TS
└── package.json            # Dependencies and scripts (React 19, Lucide, TypeScript)
```

---

## ⚡ Tech Stack & Design Choices

1. **React 19 & TypeScript**: Provides type-safe, modular, and reusable view components.
2. **Vanilla CSS**: We intentionally avoided Tailwind CSS to build a highly custom, lightweight glassmorphism theme with absolute layout control and fluid transitions, fitting exactly inside the `380px × 580px` popup window.
3. **Lucide React**: Supplies clean, stroke-based SVG icons that scale perfectly without adding heavy image assets.
4. **Manifest V3**: Follows the modern Chrome Extension platform standards for improved security and performance.

---

## 🎓 Recruiter & Interview Questions Prep

Here are the key technical concepts and architectural decisions that interviewers will ask you about this project:

### Q1: What is Manifest V3, and how does it differ from Manifest V2?
* **Answer**: Manifest V3 is the latest standard for building Chrome extensions. The key differences are:
  * **Service Workers instead of Background Pages**: Background scripts now run as ephemeral Service Workers. They are event-driven and tear down when idle, saving system RAM.
  * **Security (No Remote Code)**: All executable code must be bundled inside the extension package. You cannot load scripts from external URLs (like Google Analytics CDN).
  * **Declarative Net Request**: Replaces the blocking `webRequest` API. Instead of the extension intercepting and modifying network requests programmatically (which poses privacy risks), the extension registers declarations and lets Chrome handle the modification safely.

### Q2: Why did we build a State-Based Router in React instead of using React Router (`BrowserRouter`)?
* **Answer**: Extension popups are short-lived. Every time a user clicks outside the popup, the popup window closes, and the entire Javascript context is destroyed and reset. 
  * Traditional `BrowserRouter` relies on modifying the browser's URL history, which is not suitable or stable inside a Chrome popup context (`index.html`).
  * A **State-Based Router** (managing view state via simple React state tags like `'optimize'`, `'history'`) is lightweight, runs flawlessly in sandbox environments, enables smooth CSS transition animations, and guarantees the user is never stuck on a blank routing page.

### Q3: How did we handle persistent data storage securely inside the extension?
* **Answer**: We created a custom hook called `useStorage`. 
  * It detects if the environment is a Chrome extension. If so, it reads/writes to `chrome.storage.local`. Unlike standard browser storage, `chrome.storage.local` persists data even when the popup closes and its Javascript state resets.
  * If running in a web sandbox (like in a browser preview during development), it seamlessly falls back to standard `window.localStorage` so development remains fast and testing-friendly.

### Q4: Why did we build a custom backend (Express / Workers) instead of making direct AI calls from the extension?
* **Answer**: **Secret Security**. Since Chrome extension files are downloaded and ran client-side on the user's computer, any API keys embedded directly in the extension's code can be easily decompiled and stolen. 
  * By routing requests through our Express/Workers backend, we can store LLM API keys safely in server environment variables.
  * The backend validates the user's Supabase auth session token (JWT) before proxying the request to OpenAI/Claude, preventing abuse and enforcing usage limits.
