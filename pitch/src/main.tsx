import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

function DemoHandoff() {
  useEffect(() => {
    window.location.replace("http://localhost:3000");
  }, []);

  return (
    <div className="ambient flex min-h-screen items-center justify-center px-6">
      <p className="font-mono text-sm text-white/60">Opening live demo…</p>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/demo" element={<DemoHandoff />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
