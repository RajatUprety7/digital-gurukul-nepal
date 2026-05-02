import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api";
import { getCurrentUser, hasRole } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return fail("Unauthorized", 401);

    const where = user.role === "student" ? { studentId: user.id } : {};
    const practices = await prisma.aIPracticeSubmission.findMany({
      where,
      include: { student: { select: { name: true, email: true, studentClass: true } } },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return ok({ practices });
  } catch (e) {
    return fail(e.message, 500);
  }
}

export async function POST(req) {
  try {
    const user = await getCurrentUser();
    if (!hasRole(user, ["student"])) return fail("Only students can submit AI practice", 403);

    const body = await req.json();

    const practice = await prisma.aIPracticeSubmission.create({
      data: {
        studentId: user.id,
        taskType: body.taskType || "prompt_writing",
        title: body.title || "AI Practice",
        prompt: body.prompt || "",
        aiResponse: body.aiResponse || "",
        studentReflection: body.studentReflection || "",
        score: Number(body.score || 0),
        feedback: body.feedback || "",
      },
    });

    return ok({ practice }, 201);
  } catch (e) {
    return fail(e.message, 500);
  }
}
