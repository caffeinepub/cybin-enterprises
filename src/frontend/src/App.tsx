import { BrowserRouter, Route, Routes } from "@/lib/router";
import Layout from "./components/Layout";
import AboutPage from "./components/pages/AboutPage";
import AdminPage from "./components/pages/AdminPage";
import ContactPage from "./components/pages/ContactPage";
import FaqPage from "./components/pages/FaqPage";
import FraudDeflectPage from "./components/pages/FraudDeflectPage";
import HomePage from "./components/pages/HomePage";
import IndustriesPage from "./components/pages/IndustriesPage";
import InsightsPage from "./components/pages/InsightsPage";
import KnowledgePage from "./components/pages/KnowledgePage";
import {
  CookiePolicyPage,
  PrivacyPolicyPage,
  TermsOfServicePage,
} from "./components/pages/LegalPage";
import PaymentSolutionsPage from "./components/pages/PaymentSolutionsPage";
import WizardPage from "./components/pages/WizardPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone wizard — no Layout wrapper */}
        <Route path="/apply" element={<WizardPage />} />

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
      </Routes>
    </BrowserRouter>
  );
}
