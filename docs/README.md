# Prompt Improver - Documentation

This directory contains the documentation, design specifications, and architecture planning for the Prompt Improver Chrome/Edge Extension.

## Project Plan

### Architecture
```
Chrome/Edge Extension (React + TypeScript)
        │
        ▼
Express Backend (Cloudflare Workers / Node)
        │
        ▼
Supabase (Auth + Database)
        │
        ▼
OpenAI / Anthropic (Claude) / Google (Gemini) APIs
```

### Tech Stack
- **Extension**: React, TypeScript, Manifest V3
- **Authentication**: Supabase Auth (Google Login)
- **Database**: Supabase DB
- **Backend / Workers**: Cloudflare Workers / Express
- **AI Integrations**: OpenAI API, Claude, Gemini

### Key Features
1. Google Login (Supabase Auth)
2. Prompt History & Search
3. Prompt Scoring & Optimization Feedback
4. Prompt Templates / Library
5. Multi-LLM Support (ChatGPT, Claude, Gemini)
6. Usage Limits & Subscription Plans
7. Analytics Dashboard
