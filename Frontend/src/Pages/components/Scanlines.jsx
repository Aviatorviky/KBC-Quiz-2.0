import React from "react";

const Scanlines = () => (
  <>
    <div className="crt-scanlines" aria-hidden="true" data-testid="crt-scanlines-overlay" />
    <div className="grain" aria-hidden="true" data-testid="crt-grain-overlay" />
    <div
      className="pointer-events-none fixed top-0 left-0 right-0 h-[2px] bg-cyan-neon/60 z-[62] animate-scan"
      style={{ boxShadow: "0 0 18px 4px rgba(0,240,255,0.4)" }}
      aria-hidden="true"
    />
  </>
);

export default Scanlines;
