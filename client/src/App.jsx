import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotificationsPage from "./pages/NotificationsPage";
import OnboardingPage from "./pages/OnboardingPage";
import SignUpPage from "./pages/SignUpPage";

export default function App() {
  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/notifications"} element={<NotificationsPage />} />
        <Route path={"/call"} element={<CallPage />} />
        <Route path={"/chat"} element={<ChatPage />} />
        <Route path={"/onboarding"} element={<OnboardingPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}
