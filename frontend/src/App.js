import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroDocumento";
import MisDocumentosPage from "./pages/MisDocumentos";
import DashboardPage from "./pages/Dashboard";
import UsuariosPage from "./pages/UsuariosPage";
import SalidaDocumentoPage from "./pages/SalidaDocumento";
import NotFoundPage from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/mis-documentos" element={<MisDocumentosPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/salida-documento" element={<SalidaDocumentoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
