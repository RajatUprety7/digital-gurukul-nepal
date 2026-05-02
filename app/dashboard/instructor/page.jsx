import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import LogoutButton from "@/components/LogoutButton";

export default async function InstructorDashboard() {
  const user = await getCurrentUser();
  if (!user || user.role !== "instructor") redirect("/login");

  const [courses, assignments, submissions] = await Promise.all([
    prisma.course.findMany({ take: 10 }),
    prisma.assignment.findMany({ include: { course: { select: { title: true } } }, orderBy: { createdAt: "desc" }, take: 10 }),
    prisma.submission.findMany({ include: { student: { select: { name: true, studentClass: true } }, assignment: { select: { title: true } } }, orderBy: { createdAt: "desc" }, take: 10 }),
  ]);

  return (
    <main className="dashboard">
      <div className="dashHeader"><div><h1>Instructor Dashboard</h1><p>Manage lessons, assignments, submissions and student feedback.</p></div><LogoutButton /></div>
      <div className="dashGrid"><div className="dashPanel"><h3>Courses</h3><h2>{courses.length}</h2></div><div className="dashPanel"><h3>Assignments</h3><h2>{assignments.length}</h2></div><div className="dashPanel"><h3>Submissions</h3><h2>{submissions.length}</h2></div><div className="dashPanel"><h3>Role</h3><h2>Instructor</h2></div></div>
      <section className="section" style={{ paddingLeft: 0, paddingRight: 0 }}><h2>Recent Submissions</h2><table className="table"><thead><tr><th>Student</th><th>Assignment</th><th>Status</th><th>Marks</th></tr></thead><tbody>{submissions.map((s) => <tr key={s.id}><td>{s.student?.name}</td><td>{s.assignment?.title}</td><td>{s.status}</td><td>{s.marks || "-"}</td></tr>)}</tbody></table></section>
    </main>
  );
}
