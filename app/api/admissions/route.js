import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api";
export async function POST(req){try{const admission=await prisma.admission.create({data:await req.json()});return ok({admission},201)}catch(e){return fail(e.message,500)}}
