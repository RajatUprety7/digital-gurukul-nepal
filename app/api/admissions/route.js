import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/apiResponse";
import { getCurrentUser, hasRole } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!hasRole(user, ["admin", "instructor"])) return fail("Unauthorized", 403);
    const admissions = await prisma.admission.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
    return ok({ admissions });
  } catch (error) {
    return fail(error.message, 500);
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const admission = await prisma.admission.create({ data: body });
    return ok({ admission }, 201);
  } catch (error) {
    return fail(error.message, 500);
  }
}
