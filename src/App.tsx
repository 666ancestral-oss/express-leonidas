import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import HowItWorksSection from './components/HowItWorksSection';
import DifferentialsSection from './components/DifferentialsSection';
import MapSection from './components/MapSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactFormSection from './components/ContactFormSection';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollToTop from './components/ScrollToTop';
import BrandDivider from './components/BrandDivider';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookieConsent from './components/CookieConsent';
import BlogList from './pages/BlogList';
import BlogPostPage from './pages/BlogPostPage';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminHeroEditor from './pages/AdminHeroEditor';
import AdminPostList from './pages/AdminPostList';
import AdminPostForm from './pages/AdminPostForm';
import AdminPassword from './pages/AdminPassword';
import AdminSeed from './pages/AdminSeed';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

type Page = 'home' | 'privacy';

const META_DEFAULT = {
  title: 'Expresso Leonidas - Logística Premium | Fretes e Transportes para todo o Brasil',
  description: 'Fretes e transportes para todo o Brasil. Conectamos empresas, cargas e destinos com rapidez, tecnologia e segurança. Solicite sua cotação agora!',
  ogTitle: 'Expresso Leonidas - Logística Premium',
  ogDescription: 'Fretes e transportes para todo o Brasil. Conectamos empresas, cargas e destinos com rapidez, tecnologia e segurança.',
  canonical: 'https://el.edgeweb.com.br',
};

const META_PRIVACY = {
  title: 'Política de Privacidade | Expresso Leonidas',
  description: 'Conheça a Política de Privacidade da Expresso Leonidas. Saiba como tratamos seus dados pessoais em conformidade com a LGPD.',
  ogTitle: 'Política de Privacidade | Expresso Leonidas',
  ogDescription: 'Conheça a Política de Privacidade da Expresso Leonidas em conformidade com a LGPD.',
  canonical: 'https://el.edgeweb.com.br/privacidade',
};

function updateMeta(meta: typeof META_DEFAULT) {
  document.title = meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.ogTitle);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.ogDescription);
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', meta.ogTitle);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', meta.ogDescription);
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', meta.canonical);
}

function HomePage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <Header />
      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <BrandDivider />
        <HowItWorksSection />
        <DifferentialsSection />
        <MapSection />
        <TestimonialsSection />
        <ContactFormSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
      <CookieConsent />
    </>
  );
}

function PrivacyPage() {
  return (
    <>
      <Header variant="subpage" />
      <PrivacyPolicy />
      <Footer />
      <ScrollToTop />
      <CookieConsent />
    </>
  );
}

function AppRoutes() {
  const location = useLocation();
  const [page, setPage] = useState<Page>(
    location.pathname === '/privacidade' ? 'privacy' : 'home'
  );

  useEffect(() => {
    if (location.pathname === '/privacidade') setPage('privacy');
    else if (location.pathname === '/') setPage('home');
  }, [location.pathname]);

  useEffect(() => {
    if (page === 'privacy') updateMeta(META_PRIVACY);
    else if (page === 'home') updateMeta(META_DEFAULT);
  }, [page]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacidade" element={<PrivacyPage />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="hero" element={<AdminHeroEditor />} />
        <Route path="posts" element={<AdminPostList />} />
        <Route path="posts/new" element={<AdminPostForm />} />
        <Route path="posts/edit/:id" element={<AdminPostForm />} />
        <Route path="password" element={<AdminPassword />} />
        <Route path="seed" element={<AdminSeed />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-container">
          <AppRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
