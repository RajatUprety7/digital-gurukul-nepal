const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function upsertUser(data) {
  const hashed = await bcrypt.hash(data.password, 10);

  return prisma.user.upsert({
    where: { email: data.email },
    update: { ...data, password: hashed },
    create: { ...data, password: hashed },
  });
}

async function run() {
  await upsertUser({ name: "Digital Gurukul Admin", email: "admin@digitalgurukulnepal.com", password: "Admin@123", role: "admin" });
  const instructor = await upsertUser({ name: "Demo Instructor", email: "instructor@digitalgurukulnepal.com", password: "Instructor@123", role: "instructor" });
  await upsertUser({ name: "Demo Student", email: "student@digitalgurukulnepal.com", password: "Student@123", role: "student", studentClass: "Class 7", schoolName: "Demo School", parentName: "Demo Parent" });

  await prisma.submission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.course.deleteMany();

  const visualCourse = await prisma.course.create({
    data: {
      title: "Visual Coding & Scratch Foundation",
      domain: "visual_coding",
      classRange: "Class 4-6",
      description: "Learn sequence, events, loops, conditions and create games/animations in Scratch.",
      price: 2000,
      instructorId: instructor.id,
      modules: {
        create: [
          { title: "Scratch Basics", description: "Interface, sprites and events", lessons: { create: [{ title: "Move Your First Sprite", durationMinutes: 30 }] } },
          { title: "Game Logic", description: "Score, timer and collision", lessons: { create: [{ title: "Catch the Apple Game", durationMinutes: 45 }] } },
        ],
      },
    },
  });

  const pythonCourse = await prisma.course.create({
    data: {
      title: "Python Beginner Program",
      domain: "python",
      classRange: "Class 7-8",
      description: "Learn Python variables, input/output, conditions, loops and simple projects.",
      price: 2000,
      modules: { create: [{ title: "Python Basics", description: "Print, input, variables", lessons: { create: [{ title: "Hello Python", durationMinutes: 30 }] } }] },
    },
  });

  const webCourse = await prisma.course.create({
    data: {
      title: "Web Development Starter",
      domain: "web_development",
      classRange: "Class 7-10",
      description: "Build websites using HTML, CSS and JavaScript basics.",
      price: 2000,
      modules: { create: [{ title: "HTML & CSS", description: "Web structure and design", lessons: { create: [{ title: "My First Webpage", durationMinutes: 40 }] } }] },
    },
  });

  await prisma.course.createMany({
    data: [
      { title: "AI Basics for School Students", domain: "ai_basics", classRange: "Class 6-10", description: "Understand AI, prompts, responsible AI and simple AI demo projects.", price: 2000 },
      { title: "Cyber Safety Essentials", domain: "cyber_safety", classRange: "Class 4-10", description: "Learn password safety, phishing, privacy and responsible internet use.", price: 2000 },
    ],
  });

  await prisma.assignment.createMany({
    data: [
      { title: "Create Animated Name in Scratch", courseId: visualCourse.id, classRange: "Class 4-6", instructions: "Use Scratch to animate your name with motion and sound.", maxMarks: 100 },
      { title: "Python Calculator", courseId: pythonCourse.id, classRange: "Class 7-8", instructions: "Create a calculator that takes two numbers and an operator.", maxMarks: 100 },
      { title: "Personal Profile Webpage", courseId: webCourse.id, classRange: "Class 7-10", instructions: "Create an About Me page using HTML and CSS.", maxMarks: 100 },
    ],
  });

  console.log("PostgreSQL seed completed successfully");
}

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
