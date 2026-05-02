import { cookies } from "next/headers";
import { ok } from "@/lib/api";
export async function POST(){const c=await cookies();c.delete('dgn_token');return ok({message:'Logged out'})}
