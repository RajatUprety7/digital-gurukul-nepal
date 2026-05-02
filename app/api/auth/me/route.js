import { getCurrentUser } from "@/lib/auth";
import { ok, fail } from "@/lib/apiResponse";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return fail("Not authenticated", 401);
  return ok({ user });
}
