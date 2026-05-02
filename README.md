# Digital Gurukul Nepal - PostgreSQL Full-Stack Package

This version uses **PostgreSQL + Prisma**, not MongoDB.

## Included

### Frontend
- Public website
- Demo registration form
- Login page
- Admin dashboard
- Student dashboard
- Instructor dashboard

### Backend
- PostgreSQL database with Prisma ORM
- JWT authentication using httpOnly cookies
- Role-based access: student, parent, instructor, admin, school_partner
- Admission API
- Course API
- Assignment API
- Submission API
- Payment API
- Progress API
- Certificate API
- Seed script with demo accounts and sample data

## Local Setup

1. Install Node.js 20+
2. Install PostgreSQL locally OR create a free PostgreSQL database on Neon/Supabase/Railway.
3. Install packages:

```bash
npm install
```

4. Create `.env.local` from `.env.example` and set:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
JWT_SECRET="your-long-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

5. Generate Prisma client:

```bash
npm run prisma:generate
```

6. Create database tables:

```bash
npm run prisma:migrate
```

Migration name prompt example:

```text
init
```

7. Seed demo data:

```bash
npm run seed
```

8. Run project:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Demo accounts after seed

Admin:
admin@digitalgurukulnepal.com
Admin@123

Instructor:
instructor@digitalgurukulnepal.com
Instructor@123

Student:
student@digitalgurukulnepal.com
Student@123

## Vercel Deployment

1. Upload this project to GitHub.
2. Create a PostgreSQL database on Neon/Supabase/Railway.
3. Add environment variables in Vercel:
   - DATABASE_URL
   - JWT_SECRET
   - NEXT_PUBLIC_APP_URL
4. Deploy.

## Important

- Do not use local PostgreSQL for Vercel. Use cloud PostgreSQL like Neon, Supabase or Railway.
- Payment gateway is not integrated yet. Current payment module is manual tracking.
- File upload is not included yet. Add Cloudinary/AWS S3 later.
