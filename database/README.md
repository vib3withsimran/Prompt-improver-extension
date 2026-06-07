# Prompt Improver - Database

This directory contains the database schema, SQL migration files, and Supabase config.

## Schema Highlights
- `users` (linked to Supabase Auth `auth.users`)
- `prompts_history` (stores user prompts, optimization logs, and scores)
- `prompt_templates` (stores predefined and custom templates)
- `usage_logs` (tracks API requests per user for limits and analytics)
