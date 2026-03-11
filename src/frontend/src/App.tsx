import { ThemeProvider } from "@/contexts/ThemeContext";
import { usePageTracking } from "@/hooks/usePageTracking";
import { BrowserRouter, Route, Routes, useNavigate } from "@/lib/router";
import { useEffect } from "react";
import Layout from "./components/Layout";
import AboutPage from "./components/pages/AboutPage";
import AccessibilityPage from "./components/pages/AccessibilityPage";
import AdminPage from "./components/pages/AdminPage";
import BlogPostPage from "./components/pages/BlogPostPage";
import CompliancePage from "./components/pages/CompliancePage";
import ContactPage from "./components/pages/ContactPage";
import DoNotSellPage from "./components/pages/DoNotSellPage";
import FaqPage from "./components/pages/FaqPage";
import FraudDeflectPage from "./components/pages/FraudDeflectPage";
import HardwarePage from "./components/pages/HardwarePage";
import HomePage from "./components/pages/HomePage";
import HowItWorksPage from "./components/pages/HowItWorksPage";
import IndustriesPage from "./components/pages/IndustriesPage";
import IndustryLandingPage from "./components/pages/IndustryLandingPage";
import InsightsPage from "./components/pages/InsightsPage";
import KnowledgePage from "./components/pages/KnowledgePage";
import {
  CookiePolicyPage,
  PrivacyPolicyPage,
  TermsOfServicePage,
} from "./components/pages/LegalPage";
import PartnersPage from "./components/pages/PartnersPage";
import PaymentSolutionsPage from "./components/pages/PaymentSolutionsPage";
import PeptidesPage from "./components/pages/PeptidesPage";
import SolutionsEnterprisePage from "./components/pages/SolutionsEnterprisePage";
import SolutionsPage from "./components/pages/SolutionsPage";
import WizardPage from "./components/pages/WizardPage";

function IntegrationsRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);
  return null;
}

function EnterpriseRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/apply?tier=enterprise", { replace: true });
  }, [navigate]);
  return null;
}

function AppRoutes() {
  usePageTracking();
  return (
    <Routes>
      {/* Standalone wizard — no Layout wrapper */}
      <Route path="/apply" element={<WizardPage />} />

      {/* Enterprise apply redirect */}
      <Route path="/apply/enterprise" element={<EnterpriseRedirect />} />

      {/* Standalone admin — no Layout wrapper */}
      <Route path="/admin" element={<AdminPage />} />

      {/* All other pages wrapped in Layout */}
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/payment-solutions"
        element={
          <Layout>
            <PaymentSolutionsPage />
          </Layout>
        }
      />
      <Route
        path="/industries"
        element={
          <Layout>
            <IndustriesPage />
          </Layout>
        }
      />
      <Route
        path="/industries/peptides"
        element={
          <Layout>
            <PeptidesPage />
          </Layout>
        }
      />
      <Route
        path="/industries/:slug"
        element={
          <Layout>
            <IndustryLandingPage />
          </Layout>
        }
      />
      <Route
        path="/hardware"
        element={
          <Layout>
            <HardwarePage />
          </Layout>
        }
      />
      <Route
        path="/fraud-deflect"
        element={
          <Layout>
            <FraudDeflectPage />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <AboutPage />
          </Layout>
        }
      />
      <Route
        path="/insights"
        element={
          <Layout>
            <InsightsPage />
          </Layout>
        }
      />
      <Route
        path="/insights/:slug"
        element={
          <Layout>
            <BlogPostPage />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <ContactPage />
          </Layout>
        }
      />
      <Route
        path="/privacy-policy"
        element={
          <Layout>
            <PrivacyPolicyPage />
          </Layout>
        }
      />
      <Route
        path="/terms-of-service"
        element={
          <Layout>
            <TermsOfServicePage />
          </Layout>
        }
      />
      <Route
        path="/cookie-policy"
        element={
          <Layout>
            <CookiePolicyPage />
          </Layout>
        }
      />
      <Route
        path="/faq"
        element={
          <Layout>
            <FaqPage />
          </Layout>
        }
      />
      <Route
        path="/knowledge"
        element={
          <Layout>
            <KnowledgePage />
          </Layout>
        }
      />
      <Route
        path="/partners"
        element={
          <Layout>
            <PartnersPage />
          </Layout>
        }
      />
      <Route path="/integrations" element={<IntegrationsRedirect />} />
      <Route
        path="/compliance"
        element={
          <Layout>
            <CompliancePage />
          </Layout>
        }
      />
      <Route
        path="/do-not-sell"
        element={
          <Layout>
            <DoNotSellPage />
          </Layout>
        }
      />
      <Route
        path="/accessibility"
        element={
          <Layout>
            <AccessibilityPage />
          </Layout>
        }
      />
      <Route
        path="/how-it-works"
        element={
          <Layout>
            <HowItWorksPage />
          </Layout>
        }
      />
      <Route
        path="/solutions"
        element={
          <Layout>
            <SolutionsPage />
          </Layout>
        }
      />
      <Route
        path="/solutions/enterprise"
        element={
          <Layout>
            <SolutionsEnterprisePage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
