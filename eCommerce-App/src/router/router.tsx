import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/login-page/login-page';
import RegistrationPage from '../pages/registration-page/registration-page';
import MainPage from '../pages/main-page/main-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import CatalogPage from '../pages/catalog-page/catalog-page';
import ProfilePage from '../pages/profile-page/profile-page';
import ProductsPage from '../pages/products-page/products-page';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/*" element={<NotFoundPage />} />
      <Route path="/main/product/:id" element={<ProductsPage />} />
    </Routes>
  );
}

export default Router;
