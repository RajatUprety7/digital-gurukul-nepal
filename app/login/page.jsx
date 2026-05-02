"use client";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  async function login(e) {
    e.preventDefault();
    setMessage("Logging in...");
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();

    if (!data.success) {
      setMessage(data.message || "Login failed");
      return;
    }

    if (data.user.role === "admin") window.location.href = "/dashboard/admin";
    else if (data.user.role === "instructor") window.location.href = "/dashboard/instructor";
    else window.location.href = "/dashboard/student";
  }

  return (
    <main className="loginWrap">
      <form className="loginCard formCard" onSubmit={login}>
        <div className="logoMark">DG</div>
        <h1>Login to Digital Gurukul Nepal</h1>
        <p>Use seeded demo accounts or your registered account.</p>
        {message && <div className={message.includes("failed") || message.includes("Invalid") ? "message error" : "message"}>{message}</div>}
        <label>Email<input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" /></label>
        <label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" /></label>
        <button>Login</button>
        <small>
          Admin: admin@digitalgurukulnepal.com / Admin@123<br />
          Instructor: instructor@digitalgurukulnepal.com / Instructor@123<br />
          Student: student@digitalgurukulnepal.com / Student@123
        </small>
      </form>
    </main>
  );
}
