interface PaymentBadgesProps {
  className?: string;
}

const badges = [
  {
    label: "Visa",
    bg: "#1A1F71",
    text: "#fff",
    border: "rgba(26,31,113,0.4)",
    symbol: "VISA",
    italic: true,
  },
  {
    label: "Mastercard",
    bg: "rgba(255,255,255,0.06)",
    text: "#e8edf8",
    border: "rgba(255,255,255,0.12)",
    symbol: "MC",
    circles: true,
  },
  {
    label: "Amex",
    bg: "#007BC1",
    text: "#fff",
    border: "rgba(0,123,193,0.4)",
    symbol: "AMEX",
  },
  {
    label: "Discover",
    bg: "rgba(255,255,255,0.06)",
    text: "#e8edf8",
    border: "rgba(255,255,255,0.12)",
    symbol: "DISC",
    accent: "#F76F20",
  },
  {
    label: "ACH",
    bg: "rgba(0, 212, 184, 0.1)",
    text: "#00d4b8",
    border: "rgba(0, 212, 184, 0.3)",
    symbol: "ACH",
  },
  {
    label: "eCheck",
    bg: "rgba(0, 212, 184, 0.07)",
    text: "#00d4b8",
    border: "rgba(0, 212, 184, 0.2)",
    symbol: "eCHK",
  },
  {
    label: "Cashless ATM",
    bg: "rgba(168, 126, 245, 0.1)",
    text: "#a87ef5",
    border: "rgba(168, 126, 245, 0.3)",
    symbol: "ATM",
  },
];

export default function PaymentBadges({ className }: PaymentBadgesProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        alignItems: "center",
      }}
    >
      <span
        className="text-xs font-semibold uppercase tracking-wider"
        style={{
          color: "rgba(232,237,248,0.4)",
          flexShrink: 0,
          marginRight: 4,
        }}
      >
        Accepted:
      </span>
      {badges.map((b) => (
        <div
          key={b.label}
          title={b.label}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "5px 10px",
            borderRadius: "6px",
            backgroundColor: b.bg,
            border: `1px solid ${b.border}`,
            flexShrink: 0,
          }}
        >
          {b.circles && (
            <div
              style={{
                position: "relative",
                width: 20,
                height: 14,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: "#EB001B",
                  opacity: 0.9,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 7,
                  top: 0,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: "#F79E1B",
                  opacity: 0.9,
                }}
              />
            </div>
          )}
          {b.accent && (
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: b.accent,
                flexShrink: 0,
              }}
            />
          )}
          <span
            style={{
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "0.05em",
              color: b.text,
              fontStyle: b.italic ? "italic" : "normal",
              fontFamily: b.italic ? "Georgia, serif" : "inherit",
            }}
          >
            {b.symbol}
          </span>
        </div>
      ))}
    </div>
  );
}
