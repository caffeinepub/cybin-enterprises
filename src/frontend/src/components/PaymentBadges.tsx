import { useTheme } from "@/contexts/ThemeContext";

interface PaymentBadgesProps {
  className?: string;
}

const badges = [
  {
    label: "Visa",
    symbol: "VISA",
    color: "#1A1F71",
    bg: "rgba(26,31,113,0.08)",
    border: "rgba(26,31,113,0.2)",
    italic: true,
  },
  {
    label: "Mastercard",
    symbol: null,
    color: "#252525",
    bg: "rgba(235,0,27,0.06)",
    border: "rgba(235,0,27,0.15)",
    circles: true,
  },
  {
    label: "Amex",
    symbol: "AMEX",
    color: "#007BC1",
    bg: "rgba(0,123,193,0.08)",
    border: "rgba(0,123,193,0.2)",
    italic: false,
  },
  {
    label: "Discover",
    symbol: "DISC",
    color: "#F76F20",
    bg: "rgba(247,111,32,0.08)",
    border: "rgba(247,111,32,0.2)",
    dot: "#F76F20",
    italic: false,
  },
  {
    label: "ACH Transfer",
    symbol: "ACH",
    color: "#00a896",
    bg: "rgba(0,168,150,0.08)",
    border: "rgba(0,168,150,0.2)",
    italic: false,
  },
  {
    label: "eCheck",
    symbol: "eCHK",
    color: "#00a896",
    bg: "rgba(0,168,150,0.06)",
    border: "rgba(0,168,150,0.15)",
    italic: false,
  },
  {
    label: "Cashless ATM",
    symbol: "ATM",
    color: "#7c5cbf",
    bg: "rgba(124,92,191,0.08)",
    border: "rgba(124,92,191,0.2)",
    italic: false,
  },
];

export default function PaymentBadges({ className }: PaymentBadgesProps) {
  const { resolved } = useTheme();
  const isLight = resolved === "light";

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
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: isLight ? "rgba(20,30,60,0.45)" : "rgba(232,237,248,0.35)",
          flexShrink: 0,
          marginRight: 2,
        }}
      >
        Accepted:
      </span>
      {badges.map((b) => (
        <div
          key={b.label}
          title={b.label}
          className="payment-badge"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "5px 11px 5px 9px",
            borderRadius: "8px",
            backgroundColor: isLight ? "#ffffff" : b.bg,
            border: `1px solid ${isLight ? "rgba(0,0,0,0.1)" : b.border}`,
            flexShrink: 0,
            boxShadow: isLight ? "0 1px 4px rgba(0,0,0,0.07)" : "none",
          }}
        >
          {b.circles && (
            <div
              style={{
                position: "relative",
                width: 22,
                height: 15,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0.5,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: "#EB001B",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 8,
                  top: 0.5,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: "#F79E1B",
                  opacity: 0.9,
                }}
              />
            </div>
          )}
          {b.dot && !b.circles && (
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                backgroundColor: b.dot,
                flexShrink: 0,
              }}
            />
          )}
          {b.symbol && (
            <span
              style={{
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.04em",
                color: isLight ? b.color : b.color,
                fontStyle: b.italic ? "italic" : "normal",
                fontFamily: b.italic
                  ? "Georgia, serif"
                  : "system-ui, sans-serif",
              }}
            >
              {b.symbol}
            </span>
          )}
          <span
            style={{
              fontSize: "11px",
              fontWeight: 500,
              color: isLight ? "rgba(20,30,60,0.7)" : "rgba(232,237,248,0.6)",
            }}
          >
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}
