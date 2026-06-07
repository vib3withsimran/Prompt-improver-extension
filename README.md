# Prompt Improver Extension

An AI-powered Chrome/Edge extension designed to optimize, score, template, and manage your AI prompts dynamically. Integrates with ChatGPT, Claude, and Gemini web interfaces to analyze and improve prompts before you send them.

---

## 📁 Repository Structure

```
├── extension/      # React + TypeScript Chrome/Edge Extension (Manifest V3)
├── backend/        # Express server proxy for LLM APIs (OpenAI, Claude, Gemini)
├── database/       # Supabase database schema, policies, and configuration
└── docs/           # Documentation, planning, and design assets
```

---

## 🛠️ Technology Stack

- **Frontend Extension**: React, TypeScript, Manifest V3, Vanilla CSS
- **Authentication**: Supabase Auth (with Google Sign-In)
- **Database**: Supabase Database
- **Backend / Middleware**: Cloudflare Workers / Express API
- **AI Engines**: OpenAI API, Anthropic Claude API, Google Gemini API

---

## ✨ Features

- **Google Login**: Seamless authentication via Supabase Auth.
- **Prompt History & Analytics**: Log, search, and view statistics of prompts.
- **Prompt Scoring & Optimization**: Analyze prompts dynamically using LLM intelligence and get actionable suggestions.
- **Prompt Templates**: Use, edit, and share structured templates for various tasks.
- **Multi-LLM Native Support**: Optimized prompts tailor-fit for ChatGPT, Claude, or Gemini.
- **Usage Limits**: Rate-limit and manage quotas across free and premium tiers.

---

## 🚀 Getting Started

*Detailed instructions will be added as we build each module.*

1. **Database**: Import the schemas located in `/database` to your Supabase instance.
2. **Backend**: Run local backend server/worker and setup env keys (`OPENAI_API_KEY`, `SUPABASE_URL`, etc.).
3. **Extension**: Run developer mode, build assets, and load unpacked folder in Chrome (`chrome://extensions`).
