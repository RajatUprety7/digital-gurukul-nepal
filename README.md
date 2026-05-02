# Digital Gurukul Nepal - Integrated Platform

A complete integrated system that combines:

1. Public website and admission inquiry
2. LMS course platform
3. Student coding practice playground
4. Admin dashboard
5. Instructor dashboard
6. Student dashboard
7. PostgreSQL + Prisma backend
8. Auth and role-based access

## Main Features

- Public landing website
- Demo inquiry form
- Login/logout
- Admin dashboard
- Instructor dashboard
- Student dashboard
- Courses, modules and lessons
- Python practice in browser using Pyodide
- HTML/CSS/JS live preview
- JavaScript runner
- Coding challenges
- Code submission saving
- Project submission links
- Assignments and submissions
- Quiz engine
- Payments record tracking
- Progress records
- Certificates records

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run prisma:push
npm run seed
npm run dev
```

## Vercel Setup

Add environment variables:

- DATABASE_URL
- JWT_SECRET
- SEED_SECRET
- NEXT_PUBLIC_APP_URL

Build command is already:

```bash
prisma generate && prisma db push && next build
```

## Seed on Vercel

After deployment, open:

```text
https://your-vercel-url.vercel.app/api/seed?secret=YOUR_SEED_SECRET
```

## Demo Logins

Admin:
admin@digitalgurukulnepal.com / Admin@123

Instructor:
instructor@digitalgurukulnepal.com / Instructor@123

Student:
student@digitalgurukulnepal.com / Student@123


## Added AI Practice System

This integrated version includes an AI Practice Lab where students can practice:

- Prompt writing
- Responsible AI use
- AI classification concepts
- AI for cyber-safety/phishing analysis
- Student reflection after AI activities
- Simulated AI feedback and scoring
- Saving AI practice records into PostgreSQL
- Admin and instructor review of AI practice submissions

This does not require an OpenAI API key. It uses a safe built-in simulator so students can practice AI concepts without external API cost.
