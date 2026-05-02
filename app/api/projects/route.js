import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
export async function POST(req){try{const user=await getCurrentUser();if(!user||user.role!=='student')return fail('Only students can submit projects',403);const body=await req.json();const project=await prisma.projectSubmission.create({data:{...body,studentId:user.id}});return ok({project},201)}catch(e){return fail(e.message,500)}}
