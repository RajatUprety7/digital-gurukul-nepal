"use client";
import { useState } from "react";

export default function DemoForm() {
  const [form, setForm] = useState({ studentName: "", studentClass: "", schoolName: "", parentName: "", parentPhone: "", email: "", preferredCourse: "Visual Coding & Programming", message: "" });
  const [status, setStatus] = useState("");

  function update(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  async function submit(e) {
    e.preventDefault();
    setStatus("Submitting...");
    const res = await fetch("/api/admissions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    if (data.success) {
      setStatus("Inquiry submitted successfully. We will contact you soon.");
      setForm({ studentName: "", studentClass: "", schoolName: "", parentName: "", parentPhone: "", email: "", preferredCourse: "Visual Coding & Programming", message: "" });
    } else setStatus(data.message || "Failed to submit inquiry.");
  }

  return (
    <form className="formCard" onSubmit={submit}>
      {status && <div className="message">{status}</div>}
      <label>Student Name<input name="studentName" value={form.studentName} onChange={update} required placeholder="Enter student name" /></label>
      <label>Class<select name="studentClass" value={form.studentClass} onChange={update} required><option value="" disabled>Select class</option>{["Class 4","Class 5","Class 6","Class 7","Class 8","Class 9","Class 10"].map(c => <option key={c}>{c}</option>)}</select></label>
      <label>Parent Name<input name="parentName" value={form.parentName} onChange={update} placeholder="Enter parent name" /></label>
      <label>Parent Phone<input name="parentPhone" value={form.parentPhone} onChange={update} required placeholder="+977..." /></label>
      <label>Email<input name="email" value={form.email} onChange={update} placeholder="Optional email" /></label>
      <label>School Name<input name="schoolName" value={form.schoolName} onChange={update} placeholder="Enter school name" /></label>
      <label>Preferred Course<select name="preferredCourse" value={form.preferredCourse} onChange={update}><option>Visual Coding & Programming</option><option>Web Development</option><option>Mobile App Basics</option><option>AI Basics</option><option>Cyber Safety</option></select></label>
      <button type="submit">Submit Interest</button>
    </form>
  );
}
