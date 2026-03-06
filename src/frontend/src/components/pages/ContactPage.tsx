import { JsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "@/lib/router";
import { useMutation } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Loader2,
  Mail,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { useActor } from "../../hooks/useActor";

const businessTypes = [
  "Research Peptides",
  "Seeds & Clones",
  "CBD & Botanicals",
  "Nutraceuticals",
  "Telemedicine",
  "Digital Health",
  "High-Volume E-Commerce",
  "Subscription Business",
  "Specialty Retail",
  "Emerging Regulated Market",
  "Other",
];

export default function ContactPage() {
  useSeo({
    title: "Contact Cybin Enterprises | Start Your Approval Process",
    description:
      "Get in touch with Cybin Enterprises. Ready to start your payment approval process or have questions about merchant services? Contact us today.",
    canonical: "/contact",
  });

  const { actor } = useActor();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    message: "",
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Service unavailable. Please try again.");
      return actor.submitContactForm(
        form.name,
        form.email,
        form.phone,
        form.businessType,
        form.message,
      );
    },
    onSuccess: () => {
      setForm({
        name: "",
        email: "",
        phone: "",
        businessType: "",
        message: "",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid =
    form.name && form.email && form.businessType && form.message;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://cybinenterprises.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Contact",
              item: "https://cybinenterprises.com/contact",
            },
          ],
        }}
      />
      {/* Hero */}
      <section
        className="page-hero-bg"
        style={{
          padding: "80px 0 60px",
          borderBottom: "1px solid rgba(0,212,184,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Link
                to="/"
                className="text-sm"
                style={{ color: "rgba(232,237,248,0.45)" }}
              >
                Home
              </Link>
              <ChevronRight
                size={14}
                style={{ color: "rgba(232,237,248,0.3)" }}
              />
              <span className="text-sm" style={{ color: "#00d4b8" }}>
                Contact
              </span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold mb-5"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
                lineHeight: 1.15,
              }}
            >
              Contact{" "}
              <span style={{ color: "#00d4b8" }}>Cybin Enterprises</span>
            </h1>
            <p
              className="text-lg"
              style={{ color: "rgba(232, 237, 248, 0.65)", lineHeight: 1.7 }}
            >
              Have questions or ready to begin? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="cybin-glass-card p-8">
                <h2
                  className="text-2xl font-bold mb-6"
                  style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
                >
                  Send Us a Message
                </h2>

                {submitMutation.isSuccess && (
                  <div
                    data-ocid="contact.success_state"
                    className="flex items-start gap-3 p-4 rounded-xl mb-6"
                    style={{
                      backgroundColor: "rgba(0, 212, 184, 0.1)",
                      border: "1px solid rgba(0, 212, 184, 0.25)",
                    }}
                  >
                    <CheckCircle
                      size={20}
                      style={{
                        color: "#00d4b8",
                        flexShrink: 0,
                        marginTop: "1px",
                      }}
                    />
                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "#00d4b8" }}
                      >
                        Message Sent Successfully
                      </p>
                      <p
                        className="text-xs mt-1"
                        style={{ color: "rgba(232,237,248,0.6)" }}
                      >
                        Thank you for reaching out. Our team will be in touch
                        with you shortly.
                      </p>
                    </div>
                  </div>
                )}

                {submitMutation.isError && (
                  <div
                    data-ocid="contact.error_state"
                    className="flex items-start gap-3 p-4 rounded-xl mb-6"
                    style={{
                      backgroundColor: "rgba(255, 107, 107, 0.1)",
                      border: "1px solid rgba(255, 107, 107, 0.25)",
                    }}
                  >
                    <AlertCircle
                      size={20}
                      style={{
                        color: "#ff6b6b",
                        flexShrink: 0,
                        marginTop: "1px",
                      }}
                    />
                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "#ff6b6b" }}
                      >
                        Submission Error
                      </p>
                      <p
                        className="text-xs mt-1"
                        style={{ color: "rgba(232,237,248,0.6)" }}
                      >
                        {submitMutation.error?.message ??
                          "Something went wrong. Please try again."}
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium mb-2"
                        style={{ color: "rgba(232,237,248,0.7)" }}
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        data-ocid="contact.name.input"
                        className="w-full px-4 py-3 rounded-lg text-sm transition-all outline-none"
                        style={{
                          backgroundColor: "rgba(22, 30, 58, 0.8)",
                          border: "1px solid rgba(0, 212, 184, 0.15)",
                          color: "#e8edf8",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "rgba(0, 212, 184, 0.4)";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(0, 212, 184, 0.08)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor =
                            "rgba(0, 212, 184, 0.15)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium mb-2"
                        style={{ color: "rgba(232,237,248,0.7)" }}
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        data-ocid="contact.email.input"
                        className="w-full px-4 py-3 rounded-lg text-sm transition-all outline-none"
                        style={{
                          backgroundColor: "rgba(22, 30, 58, 0.8)",
                          border: "1px solid rgba(0, 212, 184, 0.15)",
                          color: "#e8edf8",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "rgba(0, 212, 184, 0.4)";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(0, 212, 184, 0.08)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor =
                            "rgba(0, 212, 184, 0.15)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-sm font-medium mb-2"
                        style={{ color: "rgba(232,237,248,0.7)" }}
                      >
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(555) 000-0000"
                        data-ocid="contact.phone.input"
                        className="w-full px-4 py-3 rounded-lg text-sm transition-all outline-none"
                        style={{
                          backgroundColor: "rgba(22, 30, 58, 0.8)",
                          border: "1px solid rgba(0, 212, 184, 0.15)",
                          color: "#e8edf8",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "rgba(0, 212, 184, 0.4)";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(0, 212, 184, 0.08)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor =
                            "rgba(0, 212, 184, 0.15)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-businessType"
                        className="block text-sm font-medium mb-2"
                        style={{ color: "rgba(232,237,248,0.7)" }}
                      >
                        Business Type *
                      </label>
                      <select
                        id="contact-businessType"
                        name="businessType"
                        value={form.businessType}
                        onChange={handleChange}
                        required
                        data-ocid="contact.business_type.select"
                        className="w-full px-4 py-3 rounded-lg text-sm transition-all outline-none cursor-pointer"
                        style={{
                          backgroundColor: "rgba(22, 30, 58, 0.8)",
                          border: "1px solid rgba(0, 212, 184, 0.15)",
                          color: form.businessType
                            ? "#e8edf8"
                            : "rgba(232,237,248,0.35)",
                          appearance: "none",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "rgba(0, 212, 184, 0.4)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor =
                            "rgba(0, 212, 184, 0.15)";
                        }}
                      >
                        <option
                          value=""
                          disabled
                          style={{ backgroundColor: "#0d1525" }}
                        >
                          Select your industry
                        </option>
                        {businessTypes.map((bt) => (
                          <option
                            key={bt}
                            value={bt}
                            style={{
                              backgroundColor: "#0d1525",
                              color: "#e8edf8",
                            }}
                          >
                            {bt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium mb-2"
                      style={{ color: "rgba(232,237,248,0.7)" }}
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your business and payment needs..."
                      data-ocid="contact.message.textarea"
                      className="w-full px-4 py-3 rounded-lg text-sm transition-all outline-none resize-none"
                      style={{
                        backgroundColor: "rgba(22, 30, 58, 0.8)",
                        border: "1px solid rgba(0, 212, 184, 0.15)",
                        color: "#e8edf8",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(0, 212, 184, 0.4)";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(0, 212, 184, 0.08)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(0, 212, 184, 0.15)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!isFormValid || submitMutation.isPending}
                    data-ocid="contact.submit_button"
                    className="cybin-btn-primary w-full justify-center text-sm"
                    style={{
                      opacity:
                        !isFormValid || submitMutation.isPending ? 0.6 : 1,
                      cursor:
                        !isFormValid || submitMutation.isPending
                          ? "not-allowed"
                          : "pointer",
                      padding: "0.875rem",
                    }}
                  >
                    {submitMutation.isPending ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                          data-ocid="contact.loading_state"
                        />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message <ChevronRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="cybin-glass-card p-6">
                <h3
                  className="font-bold mb-4"
                  style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
                >
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(0, 212, 184, 0.1)" }}
                    >
                      <Mail size={16} style={{ color: "#00d4b8" }} />
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-1"
                        style={{ color: "rgba(232,237,248,0.45)" }}
                      >
                        Email
                      </p>
                      <a
                        href="mailto:Customercare@CYBINENTERPRISES.COM"
                        className="text-sm transition-colors"
                        style={{ color: "#e8edf8" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#00d4b8";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#e8edf8";
                        }}
                      >
                        Customercare@CybinEnterprises.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(0, 212, 184, 0.1)" }}
                    >
                      <Phone size={16} style={{ color: "#00d4b8" }} />
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-1"
                        style={{ color: "rgba(232,237,248,0.45)" }}
                      >
                        Mobile
                      </p>
                      <a
                        href="tel:7242447111"
                        className="text-sm transition-colors"
                        style={{ color: "#e8edf8" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#00d4b8";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#e8edf8";
                        }}
                      >
                        724-244-7111
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(0, 212, 184, 0.1)" }}
                    >
                      <Phone size={16} style={{ color: "#00d4b8" }} />
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-1"
                        style={{ color: "rgba(232,237,248,0.45)" }}
                      >
                        Office
                      </p>
                      <a
                        href="tel:8883212100"
                        className="text-sm transition-colors"
                        style={{ color: "#e8edf8" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#00d4b8";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#e8edf8";
                        }}
                      >
                        888-321-2100
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="cybin-glass-card p-6"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0, 212, 184, 0.06), rgba(22, 30, 58, 0.8))",
                  border: "1px solid rgba(0, 212, 184, 0.15)",
                }}
              >
                <h3
                  className="font-bold mb-3"
                  style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
                >
                  Ready to Start?
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ color: "rgba(232,237,248,0.6)", lineHeight: 1.6 }}
                >
                  Begin the formal approval process and explore the payment
                  options available for your business.
                </p>
                <Link
                  to="/contact"
                  className="cybin-btn-primary text-sm w-full justify-center block text-center"
                >
                  Start Your Approval Process
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
