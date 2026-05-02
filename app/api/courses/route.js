import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/apiResponse";
import { getCurrentUser, hasRole } from "@/lib/auth";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({ where: { isPublished: true }, orderBy: { createdAt: "desc" } });
    return ok({ courses });
  } catch (error) {
    return fail(error.message, 500);
  }
}

export async function POST(req) {
  try {
    const user = await getCurrentUser();
    if (!hasRole(user, ["admin", "instructor"])) return fail("Unauthorized", 403);
    const course = await prisma.course.create({ data: await req.json() });
    return ok({ course }, 201);
  } catch (error) {
    return fail(error.message, 500);
  }
}
