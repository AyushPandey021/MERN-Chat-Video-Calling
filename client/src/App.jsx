import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotificationsPage from "./pages/NotificationsPage";
import OnboardingPage from "./pages/OnboardingPage";
import SignUpPage from "./pages/SignUpPage";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";

export default function App() {
  const { data: authData, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry: false,
  });

  const authUser = authData?.user;
  console.log(authUser);
  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path={"/login"}
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path={"/notifications"}
          element={authUser ? <NotificationsPage /> : <Navigate to="/login" />}
        />
        <Route
          path={"/call"}
          element={authUser ? <CallPage /> : <Navigate to="/login" />}
        />
        <Route
          path={"/chat"}
          element={authUser ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path={"/onboarding"}
          element={authUser ? <OnboardingPage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}
