import React, { useMemo } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { HomePage } from './page/home/homePage';
import { AboutPage } from './page/about/AboutPage';
import { PreOrderPage } from './page/PreOrder/PreOrderPage';
import { ContactsPage } from './page/Contacts/ContactsPage';
import { Header } from './components/header/header';
import './styles/interactive.css';
import { DEFAULT_LANGUAGE, I18nProvider, SUPPORTED_LANGUAGES, buildLocalizedPath, getPathWithoutLanguage, getPreferredLanguage } from './i18n';

const RouteRedirect = ({ path = '' }) => {
  const location = useLocation();
  const lang = getPreferredLanguage();
  const target = buildLocalizedPath(lang, path);
  return <Navigate replace to={`${target}${location.search}${location.hash}`} />;
};

const LanguageLayout = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const safeLang = SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;

  const changeLanguage = (nextLang) => {
    const nextPath = getPathWithoutLanguage(location.pathname);
    navigate(`${buildLocalizedPath(nextLang, nextPath)}${location.search}${location.hash}`);
  };

  const providerValue = useMemo(() => ({ lang: safeLang, changeLanguage }), [safeLang, changeLanguage]);

  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    const normalizedPath = getPathWithoutLanguage(location.pathname);
    return <Navigate replace to={`${buildLocalizedPath(getPreferredLanguage(), normalizedPath)}${location.search}${location.hash}`} />;
  }

  return (
    <I18nProvider {...providerValue}>
      <div className="App">
        <Header />
        <Outlet />
      </div>
    </I18nProvider>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<RouteRedirect />} />
      <Route path="/about" element={<RouteRedirect path="about" />} />
      <Route path="/pre-order" element={<RouteRedirect path="pre-order" />} />
      <Route path="/contacts" element={<RouteRedirect path="contacts" />} />

      <Route path="/:lang" element={<LanguageLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="pre-order" element={<PreOrderPage />} />
        <Route path="contacts" element={<ContactsPage />} />
      </Route>

      <Route path="*" element={<RouteRedirect />} />
    </Routes>
  );
}

export default App;
