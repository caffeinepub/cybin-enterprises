import { Clock, Globe, Lock, Shield, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const messages = [
  {
    icon: Shield,
    text: "Accounts approved across every industry — all business types welcome",
  },
  { icon: Lock, text: "256-bit encrypted — your info stays private" },
  { icon: Clock, text: "Typical review: under 24 hours" },
  { icon: Globe, text: "Domestic & international accounts available" },
  { icon: Zap, text: "Every industry welcome — no business left behind" },
];

export default function TickerBar() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % messages.length);
      setAnimKey((k) => k + 1);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const msg = messages[current];
  const Icon = msg.icon;

  return (
    <div
      style={{
        background: "linear-gradient(90deg, #080614, #110F22)",
        height: "38px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div
        key={animKey}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "13px",
          fontFamily: '"DM Sans", "Cabinet Grotesk", sans-serif',
          animation: "tickerFadeIn 0.4s ease both",
        }}
      >
        <Icon size={13} style={{ color: "#00d4b8", flexShrink: 0 }} />
        <span style={{ color: "#E8F5F2", letterSpacing: "0.01em" }}>
          {msg.text}
        </span>
      </div>
    </div>
  );
}
