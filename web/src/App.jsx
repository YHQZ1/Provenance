import { BrowserRouter, Routes, Route } from "react-router-dom";

import Provenance from "./pages/Landing.jsx";
import Auth from "./pages/Auth.jsx";
import Home from "./pages/Home.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Provenance />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
