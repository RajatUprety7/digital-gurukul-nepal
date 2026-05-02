import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
export async function POST(req){try{const user=await getCurrentUser();if(!user||user.role!=='student')return fail('Only students can submit assignments',403);const body=await req.json();const submission=await prisma.assignmentSubmission.create({data:{assignmentId:body.assignmentId,studentId:user.id,answerText:body.answerText||'',fileUrl:body.fileUrl||'',status:'submitted'}});return ok({submission},201)}catch(e){return fail(e.message,500)}}
