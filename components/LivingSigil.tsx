"use client";

import { useEffect, useMemo, useState } from "react";

type SigilState = "Radiant" | "Balanced" | "Unstable";

const MESSAGES: Record<SigilState, string[]> = {
  Radiant: [
    "System operating in pure Light.",
    "Equilibrium holds steady.",
    "The sigil shines without resistance.",
  ],
  Balanced: [
    "The Light observes system harmony.",
    "Balance is present, but can deepen.",
    "Stability remains within range.",
  ],
  Unstable: [
    "System turbulence detected.",
    "The sigil flickers under strain.",
    "Light is present, but weakened.",
  ],
};

export default function LivingSigil() {
  const [stability, setStability] = useState(65);
  const [state, setState] = useState<SigilState>("Balanced");
  const [phase, setPhase] = useState(2);
  const [message, setMessage] = useState(MESSAGES.Balanced[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStability((prev) => {
        const drain = Math.floor(Math.random() * 3);
        return Math.max(20, prev - drain);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let nextState: SigilState = "Balanced";

    if (stability >= 80) nextState = "Radiant";
    else if (stability >= 50) nextState = "Balanced";
    else nextState = "Unstable";

    setState(nextState);

    const nextPhase =
      stability >= 85 ? 4 : stability >= 70 ? 3 : stability >= 45 ? 2 : 1;

    setPhase(nextPhase);

    const pool = MESSAGES[nextState];
    setMessage(pool[Math.floor(Math.random() * pool.length)]);
  }, [stability]);

  const stabilize = () => {
    setStability((prev) => Math.min(100, prev + 18));
  };

  const destabilize = () => {
    setStability((prev) => Math.max(20, prev - 12));
  };

  const sigilClass = useMemo(() => {
    return `sigil sigil-${state.toLowerCase()}`;
  }, [state]);

  return (
    <section className="sigil-shell">
      <div className={sigilClass} aria-label="Living Sigil visualization">
        <div className="sigil-ring sigil-ring-outer" />
        <div className="sigil-ring sigil-ring-mid" />
        <div className="sigil-ring sigil-ring-inner" />
        <div className="sigil-triangle sigil-triangle-1" />
        <div className="sigil-triangle sigil-triangle-2" />
        <div className="sigil-core" />
        <div className="sigil-glow" />
      </div>

      <div className="sigil-panel">
        <div className="sigil-chip">Phase {phase}</div>

        <h2 className="sigil-title">Living Sigil</h2>

        <div className="sigil-meter-block">
          <div className="sigil-meter-label">
            <span>System Stability</span>
            <strong>{stability}%</strong>
          </div>

          <div className="sigil-meter">
            <div
              className="sigil-meter-fill"
              style={{ width: `${stability}%` }}
            />
          </div>
        </div>

        <div className="sigil-stats">
          <div className="sigil-stat">
            <span>State</span>
            <strong>{state}</strong>
          </div>
          <div className="sigil-stat">
            <span>Guiding Force</span>
            <strong>Light</strong>
          </div>
        </div>

        <p className="sigil-message">{message}</p>

        <div className="sigil-actions">
          <button className="sigil-btn sigil-btn-primary" onClick={stabilize}>
            Stabilize System
          </button>
          <button className="sigil-btn sigil-btn-secondary" onClick={destabilize}>
            Stress Test
          </button>
        </div>
      </div>
    </section>
  );
}