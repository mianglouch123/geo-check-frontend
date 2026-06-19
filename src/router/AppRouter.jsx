import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes.js";
import HomePage from "../presentation/pages/HomePage.jsx";
import GenerateTokenPage from "../presentation/pages/GenerateTokenPage.jsx";
import ConfirmacionPage from "../presentation/pages/Confirmacion.jsx";
import RegistroPage from "../presentation/pages/RegistroPage.jsx";
import LoginPage from "../presentation/pages/LoginPage.jsx";
import RegisterPage from "../presentation/pages/RegisterPage.jsx";
import VerifyPage from "../presentation/pages/VerifyPage.jsx";
import ForgotPasswordPage from "../presentation/pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "../presentation/pages/ResetPasswordPage.jsx";
import ResendVerificationPage from "../presentation/pages/ResendVerificationPage.jsx";
import { ProtectedRoute } from "../presentation/hooks/protected/ProtectedRoute.jsx";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.VERIFY} element={<VerifyPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
        <Route path={ROUTES.RESEND_VERIFICATION} element={<ResendVerificationPage />} />
        
        {/* Rutas existentes (algunas ahora protegidas) */}
        <Route path={ROUTES.GENERATE_VALIDATION} element={<GenerateTokenPage />} />
        <Route path={ROUTES.CONFIRMACION} element={<ConfirmacionPage />} />
        
        {/* Rutas protegidas */}
        <Route
          path={ROUTES.REGISTRO}
          element={
            <ProtectedRoute>
              <RegistroPage />
            </ProtectedRoute>
          }
        />
      
      </Routes>
    </BrowserRouter>
  );
}