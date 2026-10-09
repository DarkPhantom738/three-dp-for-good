"use client";

import { useRef } from "react";
import "./print-headline.css";

const words = ["Make", "more", "possible."];

export function PrintHeadline() {
  const stageRef = useRef<HTMLDivElement>(null);

  function replayPrint() {
    for (const animation of stageRef.current?.getAnimations({ subtree: true }) ?? []) {
      animation.currentTime = 0;
      animation.play();
    }
  }

  return (
    <div className="ph-root">
      <div className="ph-stage" ref={stageRef}>
        <h1 className="ph-heading" id="home-title" aria-label="Make more possible.">
          <span className="ph-outline" aria-hidden="true">
            {words.map((word) => <span className="ph-line" key={word}>{word}</span>)}
          </span>
          <span className="ph-fill" aria-hidden="true">
            {words.map((word) => <span className="ph-line" key={word}>{word}</span>)}
          </span>
        </h1>
        <div className="ph-gantry" aria-hidden="true">
          <span className="ph-rail" />
          <svg className="ph-nozzle" width="32" height="40" viewBox="0 0 32 40" fill="none">
            <path d="M16 0v6" stroke="currentColor" strokeWidth="2" />
            <rect x="3" y="6" width="26" height="22" rx="3" fill="#f4f2eb" stroke="currentColor" strokeWidth="1.5" />
            <path d="M9 12h14M9 17h14M9 22h14" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 28h12l-3 7h-6l-3-7Z" fill="currentColor" />
            <path d="M16 35v5" stroke="#5267c9" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <button className="ph-replay" type="button" onClick={replayPrint} aria-label="Replay the headline printing animation">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 5a5.5 5.5 0 1 1-.5 5M3 1v4h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Replay print
      </button>
    </div>
  );
}
