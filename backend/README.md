# Prompt Improver - Backend Service

This directory contains the Express backend service, designed to be deployed on Cloudflare Workers, Render, or Fly.io.

## Responsibilities
- Proxying calls to LLM APIs (OpenAI, Claude, Gemini) securely without exposing API keys in the extension client
- Verifying Supabase JWT / Session tokens for authenticated endpoints
- Enforcing usage limits, prompt analytics, and handling subscription details
