"use client";

import { useState } from "react";

const templates = {
  prompt_writing: {
    title: "AI Prompt Writing Practice",
    instruction: "Write a clear prompt that asks AI to help a Class 7 student learn a topic step-by-step.",
    starter:
      "Act as a friendly teacher. Explain [TOPIC] to a Class 7 student using simple examples, 3 key points, and 1 practice question.",
  },
  ai_safety: {
    title: "Responsible AI Use",
    instruction: "Write a prompt that uses AI safely without asking it to copy homework or cheat.",
    starter:
      "Help me understand this topic without directly doing my homework. Give hints, examples, and questions I can answer myself.",
  },
  classification: {
    title: "Image Classification Concept",
    instruction: "Describe what features an AI model should look for to classify an image.",
    starter:
      "To classify images of cats and dogs, the AI should observe features such as ears, face shape, body size, fur pattern, and tail shape.",
  },
  cyber_ai: {
    title: "AI for Cyber Safety",
    instruction: "Write a prompt that asks AI to identify whether a message looks like phishing.",
    starter:
      "Analyze this message for phishing signs. Check urgency, suspicious links, grammar mistakes, sender identity, and request for passwords or OTP.",
  },
};

function simulateFeedback(prompt, taskType) {
  const words = prompt.trim().split(/\s+/).filter(Boolean);
  let score = 0;
  const feedback = [];

  if (words.length >= 20) score += 25;
  else feedback.push("Make your prompt more detailed.");

  if (/step|example|explain|check|analyze|practice|question/i.test(prompt)) score += 25;
  else feedback.push("Add a clear action like explain, analyze, check, or give examples.");

  if (/class|student|age|beginner|simple|teacher/i.test(prompt)) score += 20;
  else feedback.push("Mention the target learner level, such as Class 7 or beginner.");

  if (/safe|responsible|do not|without|privacy|password|otp|phishing/i.test(prompt)) score += 20;
  else if (taskType === "ai_safety" || taskType === "cyber_ai") feedback.push("Add safety or privacy instructions.");

  if (/[?.]/.test(prompt)) score += 10;
  else feedback.push("Use proper sentence structure and punctuation.");

  const response =
    taskType === "classification"
      ? "Simulated AI Response: A classification model learns from labeled examples and identifies patterns or features. It compares new input with learned patterns and predicts the most likely class."
      : taskType === "cyber_ai"
      ? "Simulated AI Response: The message should be checked for suspicious links, urgent language, unknown sender, spelling mistakes, and requests for sensitive information."
      : "Simulated AI Response: A strong prompt gives role, context, task, output format, and safety rules. Your prompt should be specific and age-appropriate.";

  return {
    score: Math.min(score, 100),
    feedback: feedback.length ? feedback.join(" ") : "Excellent prompt. It is clear, specific, and useful for learning.",
    aiResponse: response,
  };
}

export default function AIPracticeLab() {
  const [taskType, setTaskType] = useState("prompt_writing");
  const [prompt, setPrompt] = useState(templates.prompt_writing.starter);
  const [reflection, setReflection] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("");

  function changeTask(value) {
    setTaskType(value);
    setPrompt(templates[value].starter);
    setReflection("");
    setResult(null);
    setStatus("");
  }

  async function runPractice() {
    const simulated = simulateFeedback(prompt, taskType);
    setResult(simulated);
  }

  async function savePractice() {
    const simulated = result || simulateFeedback(prompt, taskType);
    setStatus("Saving...");
    const res = await fetch("/api/ai-practice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskType,
        title: templates[taskType].title,
        prompt,
        aiResponse: simulated.aiResponse,
        studentReflection: reflection,
        score: simulated.score,
        feedback: simulated.feedback,
      }),
    });
    const data = await res.json();
    setStatus(data.success ? "AI practice saved successfully." : data.message || "Failed to save AI practice.");
  }

  return (
    <div className="playground">
      <div className="grid3" style={{ marginBottom: "1rem" }}>
        <label>
          AI Practice Type
          <select value={taskType} onChange={(e) => changeTask(e.target.value)}>
            <option value="prompt_writing">Prompt Writing</option>
            <option value="ai_safety">Responsible AI Use</option>
            <option value="classification">Classification Concept</option>
            <option value="cyber_ai">AI for Cyber Safety</option>
          </select>
        </label>
        <div>
          <button className="btn blue" type="button" onClick={runPractice}>Generate Feedback</button>{" "}
          <button className="btn" type="button" onClick={savePractice}>Save AI Practice</button>
        </div>
      </div>

      <div className="message" style={{ marginBottom: "1rem" }}>
        <b>{templates[taskType].title}</b><br />
        {templates[taskType].instruction}
      </div>

      <div className="editorGrid">
        <div>
          <h3>Student Prompt / AI Activity</h3>
          <textarea className="editor" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </div>
        <div>
          <h3>AI Practice Feedback</h3>
          <div className="output">
            {result ? `Score: ${result.score}/100\n\n${result.feedback}\n\n${result.aiResponse}` : "Click Generate Feedback to evaluate your AI prompt/activity."}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <h3>Student Reflection</h3>
        <textarea
          className="editor"
          style={{ minHeight: "120px" }}
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="What did you learn from this AI activity?"
        />
      </div>

      {status && <div className="message" style={{ marginTop: "1rem" }}>{status}</div>}
    </div>
  );
}
