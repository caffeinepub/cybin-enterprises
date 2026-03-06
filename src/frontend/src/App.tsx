import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import FraudDeflectPage from "./components/pages/FraudDeflectPage";
import HomePage from "./components/pages/HomePage";
import IndustriesPage from "./components/pages/IndustriesPage";
import InsightsPage from "./components/pages/InsightsPage";
import {
  CookiePolicyPage,
  PrivacyPolicyPage,
  TermsOfServicePage,
} from "./components/pages/LegalPage";
import PaymentSolutionsPage from "./components/pages/PaymentSolutionsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/payment-solutions" element={<PaymentSolutionsPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/fraud-deflect" element={<FraudDeflectPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
