"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [stability, setStability] = useState(65);
  const [state, setState] = useState("Balanced");
  const [message, setMessage] = useState("The Light observes system harmony.");

  useEffect(() => {
    const interval = setInterval(() => {
      setStability((prev) => {
        const next = Math.max(20, prev - Math.floor(Math.random() * 3));
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (stability > 80) {
      setState("Radiant");
      setMessage("System operating in pure Light.");
    } else if (stability > 50) {
      setState("Balanced");
      setMessage("The Light observes system harmony.");
    } else {
      setState("Unstable");
      setMessage("System turbulence detected.");
    }
  }, [stability]);

  const stabilize = () => {
    setStability((prev) => Math.min(100, prev + 18));
  };

  return (
    <main style={{ textAlign: "center", paddingTop: "80px", color: "white" }}>
      <h1 style={{ fontSize: 40 }}>AI Stabilizer</h1>

      <p style={{ opacity: 0.6 }}>A system guided by Light.</p>

      <div className="sigil" />

      <h2 style={{ marginTop: 40 }}>System Stability: {stability}%</h2>

      <p>State: {state}</p>

      <p style={{ opacity: 0.7 }}>{message}</p>

      <button
        onClick={stabilize}
        style={{
          marginTop: 20,
          padding: "12px 30px",
          fontWeight: "bold",
          background: "#00e5ff",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        Stabilize System
      </button>
    </main>
  );
}