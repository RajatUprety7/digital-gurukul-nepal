import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import LogoutButton from "@/components/LogoutButton";

export default async function StudentDashboard() {
  const user = await getCurrentUser();
  if (!user || user.role !== "student") redirect("/login");

  const [courses, assignments, progress] = await Promise.all([
    prisma.course.findMany({ where: { isPublished: true }, take: 6 }),
    prisma.assignment.findMany({ include: { course: { select: { title: true } } }, orderBy: { createdAt: "desc" }, take: 8 }),
    prisma.progress.findMany({ where: { studentId: user.id }, include: { course: { select: { title: true } } }, take: 6 }),
  ]);

  return (
    <main className="dashboard">
      <div className="dashHeader"><div><h1>Student Dashboard</h1><p>Welcome {user.name}. Continue learning and submit your projects.</p></div><LogoutButton /></div>
      <div className="dashGrid"><div className="dashPanel"><h3>My Class</h3><h2>{user.studentClass || "Class 4-10"}</h2></div><div className="dashPanel"><h3>Available Courses</h3><h2>{courses.length}</h2></div><div className="dashPanel"><h3>Assignments</h3><h2>{assignments.length}</h2></div><div className="dashPanel"><h3>Progress Records</h3><h2>{progress.length}</h2></div></div>
      <section className="section" style={{ paddingLeft: 0, paddingRight: 0 }}><h2>Courses</h2><div className="courseGrid">{courses.map((c) => <article className="courseCard" key={c.id}><span>{c.classRange}</span><h3>{c.title}</h3><p>{c.description}</p></article>)}</div></section>
      <section className="section" style={{ paddingLeft: 0, paddingRight: 0 }}><h2>Assignments</h2><table className="table"><thead><tr><th>Title</th><th>Course</th><th>Class</th><th>Marks</th></tr></thead><tbody>{assignments.map((a) => <tr key={a.id}><td>{a.title}</td><td>{a.course?.title}</td><td>{a.classRange}</td><td>{a.maxMarks}</td></tr>)}</tbody></table></section>
    </main>
  );
}
