import { cookies } from "next/headers";
import { ok } from "@/lib/apiResponse";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("dgn_token");
  return ok({ message: "Logged out successfully" });
}
