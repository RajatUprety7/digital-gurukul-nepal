import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/apiResponse";
import { getCurrentUser, hasRole } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return fail("Unauthorized", 401);
    const assignments = await prisma.assignment.findMany({ include: { course: { select: { title: true } } }, orderBy: { createdAt: "desc" } });
    return ok({ assignments });
  } catch (error) {
    return fail(error.message, 500);
  }
}

export async function POST(req) {
  try {
    const user = await getCurrentUser();
    if (!hasRole(user, ["admin", "instructor"])) return fail("Unauthorized", 403);
    const assignment = await prisma.assignment.create({ data: await req.json() });
    return ok({ assignment }, 201);
  } catch (error) {
    return fail(error.message, 500);
  }
}
