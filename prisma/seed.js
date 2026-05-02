const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function upsertUser(data){const hashed=await bcrypt.hash(data.password,10);return prisma.user.upsert({where:{email:data.email},update:{...data,password:hashed},create:{...data,password:hashed}})}
async function main(){await upsertUser({name:'Digital Gurukul Admin',email:'admin@digitalgurukulnepal.com',password:'Admin@123',role:'admin'});await upsertUser({name:'Demo Instructor',email:'instructor@digitalgurukulnepal.com',password:'Instructor@123',role:'instructor'});await upsertUser({name:'Demo Student',email:'student@digitalgurukulnepal.com',password:'Student@123',role:'student',studentClass:'Class 7',schoolName:'Demo School'});console.log('Demo users created. For full demo data on Vercel, open /api/seed?secret=YOUR_SEED_SECRET');}
main().catch(e=>{console.error(e);process.exit(1)}).finally(async()=>prisma.$disconnect());
