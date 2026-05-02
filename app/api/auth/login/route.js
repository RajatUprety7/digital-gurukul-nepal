import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/apiResponse";
import { signToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return fail("Email and password are required", 400);

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) return fail("Invalid email or password", 401);

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return fail("Invalid email or password", 401);

    const token = signToken(user);
    const cookieStore = await cookies();
    cookieStore.set("dgn_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });

    return ok({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    return fail(error.message, 500);
  }
}
