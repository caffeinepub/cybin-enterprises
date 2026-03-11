import { useActor } from "@/hooks/useActor";
import { useQuery } from "@tanstack/react-query";
import {
  Building2,
  Calendar,
  HandshakeIcon,
  Loader2,
  Mail,
  Phone,
  User,
} from "lucide-react";

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const partnershipColors: Record<string, string> = {
  "Technology Integration": "#00d4b8",
  "Referral Partner": "#a87ef5",
  "White-Label Solutions": "#ffc832",
  "Strategic Alliance": "#ff8c42",
  Other: "#60a5fa",
};

export default function PartnerLeadsPanel() {
  const { actor } = useActor();

  const leadsQuery = useQuery({
    queryKey: ["admin-partner-leads"],
    queryFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.getAllPartnerLeads();
    },
    enabled: !!actor,
    staleTime: 30_000,
  });

  const leads = leadsQuery.data ?? [];

  if (leadsQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2
          size={28}
          className="animate-spin"
          style={{ color: "#00d4b8" }}
        />
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div
        className="text-center py-16 rounded-2xl"
        data-ocid="partners.empty_state"
        style={{
          backgroundColor: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <HandshakeIcon
          size={40}
          style={{ color: "rgba(232,237,248,0.15)", margin: "0 auto 16px" }}
        />
        <p
          className="font-semibold mb-2"
          style={{ color: "rgba(232,237,248,0.55)" }}
        >
          No partner leads yet
        </p>
        <p className="text-sm" style={{ color: "rgba(232,237,248,0.3)" }}>
          Applications submitted via the Partners page will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-ocid="partners.leads.list">
      <div className="flex items-center justify-between mb-2">
        <h2
          className="text-xl font-bold"
          style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
        >
          Partner Leads
        </h2>
        <span
          className="text-sm px-3 py-1 rounded-full"
          style={{
            backgroundColor: "rgba(110,247,212,0.08)",
            border: "1px solid rgba(110,247,212,0.15)",
            color: "#00d4b8",
          }}
        >
          {leads.length} application{leads.length !== 1 ? "s" : ""}
        </span>
      </div>

      {[...leads].reverse().map((lead, i) => {
        const typeColor = partnershipColors[lead.partnershipType] ?? "#60a5fa";
        return (
          <div
            key={Number(lead.id)}
            data-ocid={`partners.leads.item.${i + 1}`}
            className="rounded-xl p-5 sm:p-6"
            style={{
              backgroundColor: `${typeColor}04`,
              border: `1px solid ${typeColor}18`,
            }}
          >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: typeColor }}
                  >
                    #{Number(lead.id) + 1}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      backgroundColor: `${typeColor}12`,
                      color: typeColor,
                      border: `1px solid ${typeColor}25`,
                    }}
                  >
                    {lead.partnershipType || "Unspecified"}
                  </span>
                </div>
                <h3
                  className="text-lg font-bold"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    color: "#e8edf8",
                  }}
                >
                  {lead.companyName}
                </h3>
              </div>
              <span
                className="text-xs whitespace-nowrap flex items-center gap-1.5"
                style={{ color: "rgba(232,237,248,0.35)" }}
              >
                <Calendar size={11} />
                {formatDate(lead.timestamp)}
              </span>
            </div>

            {/* Contact grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              <InfoCell
                icon={User}
                label="Contact"
                value={lead.contactName}
                color={typeColor}
              />
              <InfoCell
                icon={Mail}
                label="Email"
                value={lead.email}
                color={typeColor}
              />
              <InfoCell
                icon={Phone}
                label="Phone"
                value={lead.phone || "—"}
                color={typeColor}
              />
              <InfoCell
                icon={Building2}
                label="Company"
                value={lead.companyName}
                color={typeColor}
              />
            </div>

            {/* Description */}
            {lead.description && (
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "rgba(232,237,248,0.35)" }}
                >
                  Partnership Goals
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(232,237,248,0.7)" }}
                >
                  {lead.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function InfoCell({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div>
      <p
        className="text-xs font-semibold uppercase tracking-wider mb-0.5"
        style={{ color: "rgba(232,237,248,0.35)" }}
      >
        {label}
      </p>
      <div className="flex items-center gap-1.5">
        <Icon size={12} style={{ color, flexShrink: 0 }} />
        <p
          className="text-sm truncate"
          style={{ color: "rgba(232,237,248,0.8)" }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
