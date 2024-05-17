import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/login-page/login-page';
import RegistrationPage from '../pages/registration-page/registration-page';
import MainPage from '../pages/main-page/main-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
