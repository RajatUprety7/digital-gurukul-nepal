import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminDashboard() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/login");

  const [students, admissions, courses, payments] = await Promise.all([
    prisma.user.count({ where: { role: "student" } }),
    prisma.admission.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
    prisma.course.count(),
    prisma.payment.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
  ]);

  return (
    <main className="dashboard">
      <div className="dashHeader"><div><h1>Admin Dashboard</h1><p>Manage admissions, students, courses, payments and reports.</p></div><LogoutButton /></div>
      <div className="dashGrid"><div className="dashPanel"><h3>Total Students</h3><h2>{students}</h2></div><div className="dashPanel"><h3>New Inquiries</h3><h2>{admissions.length}</h2></div><div className="dashPanel"><h3>Courses</h3><h2>{courses}</h2></div><div className="dashPanel"><h3>Recent Payments</h3><h2>{payments.length}</h2></div></div>
      <section className="section" style={{ paddingLeft: 0, paddingRight: 0 }}><h2>Recent Admission Inquiries</h2><table className="table"><thead><tr><th>Student</th><th>Class</th><th>Parent Phone</th><th>Course</th><th>Status</th></tr></thead><tbody>{admissions.map((a) => <tr key={a.id}><td>{a.studentName}</td><td>{a.studentClass}</td><td>{a.parentPhone}</td><td>{a.preferredCourse}</td><td>{a.status}</td></tr>)}</tbody></table></section>
    </main>
  );
}
