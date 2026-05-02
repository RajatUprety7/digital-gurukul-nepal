import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/apiResponse";
import { getCurrentUser, hasRole } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return fail("Unauthorized", 401);
    const where = user.role === "student" ? { studentId: user.id } : {};
    const certificates = await prisma.certificate.findMany({ where, include: { student: { select: { name: true, email: true, studentClass: true } }, course: { select: { title: true } } }, orderBy: { createdAt: "desc" } });
    return ok({ certificates });
  } catch (error) {
    return fail(error.message, 500);
  }
}

export async function POST(req) {
  try {
    const user = await getCurrentUser();
    if (!hasRole(user, ["admin"])) return fail("Unauthorized", 403);
    const certificate = await prisma.certificate.create({ data: await req.json() });
    return ok({ certificate }, 201);
  } catch (error) {
    return fail(error.message, 500);
  }
}
