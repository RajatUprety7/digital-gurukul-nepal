import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/apiResponse";
import { getCurrentUser, hasRole } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return fail("Unauthorized", 401);
    const where = user.role === "student" ? { studentId: user.id } : {};
    const payments = await prisma.payment.findMany({ where, include: { student: { select: { name: true, email: true, studentClass: true } } }, orderBy: { createdAt: "desc" } });
    return ok({ payments });
  } catch (error) {
    return fail(error.message, 500);
  }
}

export async function POST(req) {
  try {
    const user = await getCurrentUser();
    if (!hasRole(user, ["admin"])) return fail("Unauthorized", 403);
    const payment = await prisma.payment.create({ data: await req.json() });
    return ok({ payment }, 201);
  } catch (error) {
    return fail(error.message, 500);
  }
}
