import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/apiResponse";
import { getCurrentUser, hasRole } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return fail("Unauthorized", 401);

    const where = user.role === "student" ? { studentId: user.id } : {};
    const submissions = await prisma.submission.findMany({
      where,
      include: { assignment: { select: { title: true } }, student: { select: { name: true, email: true, studentClass: true } } },
      orderBy: { createdAt: "desc" },
    });

    return ok({ submissions });
  } catch (error) {
    return fail(error.message, 500);
  }
}

export async function POST(req) {
  try {
    const user = await getCurrentUser();
    if (!hasRole(user, ["student"])) return fail("Only students can submit assignments", 403);
    const body = await req.json();
    const submission = await prisma.submission.create({ data: { ...body, studentId: user.id } });
    return ok({ submission }, 201);
  } catch (error) {
    return fail(error.message, 500);
  }
}
