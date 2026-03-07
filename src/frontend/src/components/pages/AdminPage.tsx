import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  Download,
  FileText,
  ImageIcon,
  Loader2,
  Lock,
  LogOut,
  Mail,
  Phone,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useActor } from "../../hooks/useActor";
import ImageEditorPanel from "./admin/ImageEditorPanel";

// ─── Simple client-side PIN guard ────────────────────────────────────────────
const ADMIN_PIN = "cybin2026";

type Tab = "submissions" | "applications" | "leads" | "images";

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

function downloadJson(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      onLogin();
    } else {
      setError(true);
      setPin("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#020408" }}
    >
      <div
        className="w-full rounded-2xl p-8 sm:p-10"
        style={{
          maxWidth: "400px",
          background:
            "linear-gradient(160deg, rgba(10,8,20,0.95), rgba(5,4,15,0.98))",
          border: "1px solid rgba(255, 200, 50, 0.2)",
          boxShadow: "0 0 80px rgba(255, 200, 50, 0.04)",
        }}
      >
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{
              backgroundColor: "rgba(255, 200, 50, 0.08)",
              border: "2px solid rgba(255, 200, 50, 0.3)",
            }}
          >
            <Lock size={28} style={{ color: "#ffc832" }} />
          </div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
          >
            Admin Panel
          </h1>
          <p className="text-sm" style={{ color: "rgba(232,237,248,0.45)" }}>
            Cybin Enterprises — Internal Access
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="admin-pin"
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "rgba(232,237,248,0.6)" }}
            >
              Access PIN
            </label>
            <input
              id="admin-pin"
              type="password"
              data-ocid="admin.pin.input"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-xl text-sm text-center tracking-widest"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: error
                  ? "1.5px solid rgba(255,107,107,0.7)"
                  : "1.5px solid rgba(255, 200, 50, 0.2)",
                color: "#e8edf8",
                outline: "none",
                fontFamily: "Cabinet Grotesk, monospace",
                fontSize: "18px",
                letterSpacing: "0.3em",
              }}
              onFocus={(e) => {
                if (!error)
                  e.currentTarget.style.borderColor = "rgba(255, 200, 50, 0.5)";
              }}
              onBlur={(e) => {
                if (!error)
                  e.currentTarget.style.borderColor = "rgba(255, 200, 50, 0.2)";
              }}
            />
            {error && (
              <p
                className="text-xs mt-2 text-center"
                style={{ color: "#ff6b6b" }}
              >
                Incorrect PIN. Try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            data-ocid="admin.login.button"
            className="w-full py-3 rounded-xl font-bold text-sm transition-all"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 200, 50, 0.9), rgba(255, 165, 30, 0.9))",
              color: "#0a0f1e",
              border: "none",
              fontFamily: "Cabinet Grotesk, sans-serif",
            }}
          >
            Access Admin Panel
          </button>
        </form>

        <p
          className="text-xs text-center mt-6"
          style={{ color: "rgba(232,237,248,0.2)" }}
        >
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <div
      className="rounded-xl p-5"
      style={{
        backgroundColor: `${color}08`,
        border: `1px solid ${color}20`,
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: `${color}cc` }}
        >
          {label}
        </span>
      </div>
      <p
        className="text-3xl font-bold"
        style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
      >
        {value}
      </p>
    </div>
  );
}

// ─── Main Admin Panel ──────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => {
    return sessionStorage.getItem("cybin-admin-auth") === "true";
  });
  const [activeTab, setActiveTab] = useState<Tab>("images");
  const { actor } = useActor();

  const handleLogin = () => {
    sessionStorage.setItem("cybin-admin-auth", "true");
    setAuthed(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("cybin-admin-auth");
    setAuthed(false);
  };

  const submissionsQuery = useQuery({
    queryKey: ["admin-submissions"],
    queryFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.getAllSubmissions();
    },
    enabled: !!actor && authed,
    staleTime: 30_000,
  });

  const applicationsQuery = useQuery({
    queryKey: ["admin-applications"],
    queryFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.getAllWizardApplications();
    },
    enabled: !!actor && authed,
    staleTime: 30_000,
  });

  const leadsQuery = useQuery({
    queryKey: ["admin-leads"],
    queryFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.getAllPartialLeads();
    },
    enabled: !!actor && authed,
    staleTime: 30_000,
  });

  if (!authed) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const submissions = submissionsQuery.data ?? [];
  const applications = applicationsQuery.data ?? [];
  const leads = leadsQuery.data ?? [];

  const isLoading =
    submissionsQuery.isLoading ||
    applicationsQuery.isLoading ||
    leadsQuery.isLoading;

  const handleExportAll = () => {
    const exportData = {
      exported_at: new Date().toISOString(),
      contact_submissions: submissions.map((s) => ({
        ...s,
        id: Number(s.id),
        timestamp: formatDate(s.timestamp),
      })),
      wizard_applications: applications.map((a) => ({
        ...a,
        id: Number(a.id),
        timestamp: formatDate(a.timestamp),
      })),
      partial_leads: leads.map((l) => ({
        ...l,
        id: Number(l.id),
        timestamp: formatDate(l.timestamp),
      })),
    };
    downloadJson(
      exportData,
      `cybin-admin-export-${new Date().toISOString().slice(0, 10)}.json`,
    );
  };

  const tabConfig: {
    id: Tab;
    label: string;
    icon: React.ElementType;
    count: number | null;
    color: string;
  }[] = [
    {
      id: "images",
      label: "Image Editor",
      icon: ImageIcon,
      count: null,
      color: "#ff8c42",
    },
    {
      id: "applications",
      label: "Wizard Applications",
      icon: Shield,
      count: applications.length,
      color: "#00d4b8",
    },
    {
      id: "submissions",
      label: "Contact Submissions",
      icon: Mail,
      count: submissions.length,
      color: "#a87ef5",
    },
    {
      id: "leads",
      label: "Partial Leads",
      icon: TrendingUp,
      count: leads.length,
      color: "#ffc832",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#08090f", color: "#e8edf8" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40 px-4 sm:px-6 py-4 flex items-center justify-between"
        style={{
          backgroundColor: "rgba(8,9,15,0.97)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,212,184,0.1)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,212,184,0.1)" }}
          >
            <Shield size={16} style={{ color: "#00d4b8" }} />
          </div>
          <div>
            <p
              className="text-sm font-bold"
              style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
            >
              Cybin Enterprises
            </p>
            <p className="text-xs" style={{ color: "rgba(232,237,248,0.4)" }}>
              Admin Dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            data-ocid="admin.export.button"
            onClick={handleExportAll}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{
              backgroundColor: "rgba(0,212,184,0.08)",
              border: "1px solid rgba(0,212,184,0.2)",
              color: "#00d4b8",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0,212,184,0.14)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0,212,184,0.08)";
            }}
          >
            <Download size={13} />
            Export All Data
          </button>
          <button
            type="button"
            data-ocid="admin.logout.button"
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all"
            style={{
              color: "rgba(232,237,248,0.5)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ff6b6b";
              e.currentTarget.style.borderColor = "rgba(255,107,107,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(232,237,248,0.5)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            <LogOut size={13} />
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Row */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2
              size={32}
              className="animate-spin"
              style={{ color: "#00d4b8" }}
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <StatCard
                icon={Shield}
                label="Wizard Applications"
                value={applications.length}
                color="#00d4b8"
              />
              <StatCard
                icon={Mail}
                label="Contact Submissions"
                value={submissions.length}
                color="#a87ef5"
              />
              <StatCard
                icon={TrendingUp}
                label="Partial Leads"
                value={leads.length}
                color="#ffc832"
              />
            </div>

            {/* Mobile Export */}
            <div className="sm:hidden mb-6">
              <button
                type="button"
                data-ocid="admin.export_mobile.button"
                onClick={handleExportAll}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
                style={{
                  backgroundColor: "rgba(0,212,184,0.08)",
                  border: "1px solid rgba(0,212,184,0.2)",
                  color: "#00d4b8",
                }}
              >
                <Download size={15} />
                Export All Data as JSON
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
              {tabConfig.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    data-ocid={`admin.${tab.id}.tab`}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all"
                    style={{
                      backgroundColor: isActive
                        ? `${tab.color}12`
                        : "rgba(255,255,255,0.03)",
                      border: isActive
                        ? `1.5px solid ${tab.color}40`
                        : "1.5px solid rgba(255,255,255,0.07)",
                      color: isActive ? tab.color : "rgba(232,237,248,0.55)",
                    }}
                  >
                    <Icon size={14} />
                    {tab.label}
                    {tab.count !== null && (
                      <span
                        className="px-1.5 py-0.5 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: isActive
                            ? `${tab.color}20`
                            : "rgba(255,255,255,0.06)",
                          color: isActive ? tab.color : "rgba(232,237,248,0.4)",
                        }}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            {activeTab === "images" && <ImageEditorPanel />}
            {activeTab === "applications" && (
              <ApplicationsTable applications={applications} />
            )}
            {activeTab === "submissions" && (
              <SubmissionsTable submissions={submissions} />
            )}
            {activeTab === "leads" && <LeadsTable leads={leads} />}
          </>
        )}
      </main>
    </div>
  );
}

// ─── Applications Table ───────────────────────────────────────────────────────

function ApplicationsTable({
  applications,
}: {
  applications: {
    id: bigint;
    industry: string;
    regulatoryHurdle: string;
    name: string;
    email: string;
    phone: string;
    businessName: string;
    fein: string;
    hasFein: boolean;
    timestamp: bigint;
  }[];
}) {
  if (applications.length === 0) {
    return (
      <EmptyState
        icon={Shield}
        label="No wizard applications yet"
        desc="Applications submitted via the intake wizard will appear here."
      />
    );
  }

  return (
    <div className="space-y-4" data-ocid="admin.applications.list">
      {[...applications].reverse().map((app, i) => (
        <div
          key={Number(app.id)}
          data-ocid={`admin.applications.item.${i + 1}`}
          className="rounded-xl p-5 sm:p-6"
          style={{
            backgroundColor: "rgba(0,212,184,0.03)",
            border: "1px solid rgba(0,212,184,0.12)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: "#00d4b8" }}
                >
                  #{Number(app.id) + 1}
                </span>
                {app.hasFein && (
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: "rgba(0,212,184,0.12)",
                      color: "#00d4b8",
                      border: "1px solid rgba(0,212,184,0.25)",
                    }}
                  >
                    FEIN Provided
                  </span>
                )}
                {!app.hasFein && (
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: "rgba(255,200,50,0.08)",
                      color: "#ffc832",
                      border: "1px solid rgba(255,200,50,0.2)",
                    }}
                  >
                    Preliminary Consultation
                  </span>
                )}
              </div>
              <h3
                className="text-lg font-bold"
                style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
              >
                {app.name || "(No name)"}
              </h3>
              {app.businessName && (
                <p
                  className="text-sm"
                  style={{ color: "rgba(232,237,248,0.6)" }}
                >
                  {app.businessName}
                </p>
              )}
            </div>
            <span
              className="text-xs whitespace-nowrap"
              style={{ color: "rgba(232,237,248,0.35)" }}
            >
              {formatDate(app.timestamp)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
            <InfoCell icon={Mail} label="Email" value={app.email} />
            <InfoCell icon={Phone} label="Phone" value={app.phone || "—"} />
            <InfoCell
              icon={Shield}
              label="Industry"
              value={app.industry || "—"}
            />
            <InfoCell
              icon={AlertCircle}
              label="Hurdle"
              value={app.regulatoryHurdle || "—"}
            />
            {app.fein && <InfoCell icon={Lock} label="FEIN" value={app.fein} />}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Submissions Table ────────────────────────────────────────────────────────

function SubmissionsTable({
  submissions,
}: {
  submissions: {
    id: bigint;
    name: string;
    email: string;
    phone: string;
    businessType: string;
    message: string;
    timestamp: bigint;
  }[];
}) {
  if (submissions.length === 0) {
    return (
      <EmptyState
        icon={Mail}
        label="No contact submissions yet"
        desc="Messages sent via the contact form will appear here."
      />
    );
  }

  return (
    <div className="space-y-4" data-ocid="admin.submissions.list">
      {[...submissions].reverse().map((sub, i) => (
        <div
          key={Number(sub.id)}
          data-ocid={`admin.submissions.item.${i + 1}`}
          className="rounded-xl p-5 sm:p-6"
          style={{
            backgroundColor: "rgba(124,92,191,0.03)",
            border: "1px solid rgba(124,92,191,0.15)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <span
                className="text-xs font-bold uppercase tracking-wider block mb-1"
                style={{ color: "#a87ef5" }}
              >
                #{Number(sub.id) + 1}
              </span>
              <h3
                className="text-lg font-bold"
                style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
              >
                {sub.name}
              </h3>
            </div>
            <span
              className="text-xs whitespace-nowrap"
              style={{ color: "rgba(232,237,248,0.35)" }}
            >
              {formatDate(sub.timestamp)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm mb-4">
            <InfoCell icon={Mail} label="Email" value={sub.email} />
            <InfoCell icon={Phone} label="Phone" value={sub.phone || "—"} />
            <InfoCell
              icon={Users}
              label="Business Type"
              value={sub.businessType}
            />
          </div>

          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "rgba(232,237,248,0.4)" }}
            >
              Message
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(232,237,248,0.75)" }}
            >
              {sub.message}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Leads Table ──────────────────────────────────────────────────────────────

function LeadsTable({
  leads,
}: {
  leads: {
    id: bigint;
    email: string;
    industry: string;
    regulatoryHurdle: string;
    timestamp: bigint;
  }[];
}) {
  if (leads.length === 0) {
    return (
      <EmptyState
        icon={TrendingUp}
        label="No partial leads yet"
        desc="Users who entered their email on the wizard but didn't complete the form will appear here."
      />
    );
  }

  return (
    <div className="space-y-3" data-ocid="admin.leads.list">
      <p className="text-xs mb-4" style={{ color: "rgba(232,237,248,0.4)" }}>
        These users entered their email during the intake wizard but did not
        complete the full application.
      </p>
      {[...leads].reverse().map((lead, i) => (
        <div
          key={Number(lead.id)}
          data-ocid={`admin.leads.item.${i + 1}`}
          className="rounded-xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-4 gap-3"
          style={{
            backgroundColor: "rgba(255,200,50,0.03)",
            border: "1px solid rgba(255,200,50,0.12)",
          }}
        >
          <InfoCell icon={Mail} label="Email" value={lead.email} />
          <InfoCell
            icon={Shield}
            label="Industry"
            value={lead.industry || "—"}
          />
          <InfoCell
            icon={AlertCircle}
            label="Hurdle"
            value={lead.regulatoryHurdle || "—"}
          />
          <InfoCell
            icon={FileText}
            label="Date"
            value={formatDate(lead.timestamp)}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function InfoCell({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
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
        <Icon
          size={12}
          style={{ color: "rgba(232,237,248,0.4)", flexShrink: 0 }}
        />
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

function EmptyState({
  icon: Icon,
  label,
  desc,
}: {
  icon: React.ElementType;
  label: string;
  desc: string;
}) {
  return (
    <div
      className="text-center py-16 rounded-2xl"
      data-ocid="admin.empty_state"
      style={{
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Icon
        size={40}
        style={{ color: "rgba(232,237,248,0.15)", margin: "0 auto 16px" }}
      />
      <p
        className="font-semibold mb-2"
        style={{ color: "rgba(232,237,248,0.55)" }}
      >
        {label}
      </p>
      <p className="text-sm" style={{ color: "rgba(232,237,248,0.3)" }}>
        {desc}
      </p>
    </div>
  );
}
