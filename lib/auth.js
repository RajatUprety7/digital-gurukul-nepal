import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
export const signToken = (user) => jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
export async function getCurrentUser() {
  const c = await cookies();
  const token = c.get("dgn_token")?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return prisma.user.findUnique({ where: { id: decoded.id }, select: { id:true, name:true, email:true, role:true, studentClass:true, schoolName:true, parentName:true } });
  } catch { return null; }
}
export const hasRole = (user, roles = []) => !!user && (!roles.length || roles.includes(user.role));
