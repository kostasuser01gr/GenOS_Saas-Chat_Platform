# GenOS SaaS Chat Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF)](https://vitejs.dev)

Generative UI workspace that turns natural-language prompts into live dashboard blocks, charts, tables, maps, task boards, and technical views.

This repository is a portfolio-ready SaaS chat prototype. It shows how an AI assistant can respond with structured interface components instead of plain text, making the product feel like a dynamic operating system for business users.

## What It Demonstrates

- React 19 and Vite application with a polished chat-first interface
- Generative UI block orchestration for dashboards, tables, kanban, maps, code, and analytics cards
- Prompt-to-layout logic with responsive grid optimization
- Gemini SDK integration point with deterministic local demo behavior
- Clean local setup with no required hosted infrastructure

## Example Prompts

- `Show the latest sprint tasks`
- `Generate a revenue dashboard`
- `View technical infrastructure`
- `Manage the Q4 expansion`
- `Create a security posture matrix`

## Tech Stack

- React 19, TypeScript, Vite
- Tailwind CSS 4
- Recharts, Motion, Lucide icons
- `@google/genai` integration path
- Optional Express runtime support

## Local Setup

```bash
git clone https://github.com/kostasuser01gr/GenOS_Saas-Chat_Platform
cd GenOS_Saas-Chat_Platform
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run build
```

## Production Notes

- The app is safe to review locally and does not require a live hosted backend.
- Keep API keys out of the repo; use `.env.local` for local experiments.
- Hosted deployment should be treated as optional and performed only with explicit approval.
