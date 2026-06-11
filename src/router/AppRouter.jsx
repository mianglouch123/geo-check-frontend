import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes.js";
import HomePage from "../presentation/pages/HomePage.jsx";
import GenerateTokenPage from "../presentation/pages/GenerateTokenPage.jsx";
import ConfirmacionPage from "../presentation/pages/Confirmacion.jsx";
import RegistroPage from "../presentation/pages/RegistroPage.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.GENERATE_VALIDATION} element={<GenerateTokenPage />} />
        <Route path={ROUTES.REGISTRO} element={<RegistroPage />} />
        <Route path={ROUTES.CONFIRMACION} element={<ConfirmacionPage />} />
      </Routes>
    </BrowserRouter>
  );
}