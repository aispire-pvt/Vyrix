"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const finish = () => {
      const remaining = Math.max(900 - (performance.now() - start), 0);
      setTimeout(() => setShow(false), remaining);
    };
    if (document.readyState === "complete") { finish(); return; }
    window.addEventListener("load", finish);
    return () => window.removeEventListener("load", finish);
  }, []);

  if (!show) return null;

  return (
    <div className="dl-loading-screen" role="status" aria-live="polite">
      <div className="dl-loading-screen__mark">
        <span className="dl-loading-screen__ring" />
        <span className="dl-loading-screen__brand">Vyrix</span>
      </div>
    </div>
  );
}
