import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/apiResponse";
import { signToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, role = "student", phone, studentClass, schoolName, parentName } = body;
    if (!name || !email || !password) return fail("Name, email and password are required", 400);

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) return fail("Email already registered", 409);

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name, email: email.toLowerCase(), password: hashed, role, phone, studentClass, schoolName, parentName } });

    const token = signToken(user);
    const cookieStore = await cookies();
    cookieStore.set("dgn_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });

    return ok({ user: { id: user.id, name: user.name, email: user.email, role: user.role } }, 201);
  } catch (error) {
    return fail(error.message, 500);
  }
}
