import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Tools from "./pages/Tools.jsx";
import WhatsApp from "./pages/WhatsApp.jsx";
import QR from "./pages/QR.jsx";
import Card from "./pages/Card.jsx";
import FollowHub from "./pages/FollowHub.jsx";
import PublicView from "./pages/PublicView.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Pricing from "./pages/Pricing.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import Admin from "./pages/Admin.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/whatsapp" element={<WhatsApp />} />
        <Route path="/qr" element={<QR />} />
        <Route path="/card" element={<Card />} />
        <Route path="/follow-hub" element={<FollowHub />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      {/* Public share pages — minimal chrome */}
      <Route path="/s/:shortId" element={<PublicView />} />
      <Route path="/c/:shortId" element={<PublicView />} />
      <Route path="/u/:shortId" element={<PublicView />} />
      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
