import { Route, Routes } from "react-router";

import AdminLayout from "./layouts/admin.layout";
import AuthLayout from "./layouts/auth.layout";
import PublicLayout from "./layouts/public.layout";
import RootLayout from "./layouts/root.layout";
import ChatPage from "./pages/admin/chat.page";
import DashboardPage from "./pages/admin/dashboard.page";
import ProfilePage from "./pages/admin/profile.page";
import LoginPage from "./pages/auth/login.page";
import RegisterPage from "./pages/auth/register.page";
import HomePage from "./pages/public/home.page";
import NotFoundPage from "./pages/public/not-found.page";

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route
            index
            element={<HomePage />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Route>

        {/* Private */}
        <Route
          path="admin"
          element={<AdminLayout />}
        >
          <Route
            index
            element={<DashboardPage />}
          />
          <Route
            path="profile"
            element={<ProfilePage />}
          />
          <Route
            path="chat"
            element={<ChatPage />}
          />
        </Route>

        {/* Auth */}
        <Route
          path="auth"
          element={<AuthLayout />}
        >
          <Route
            path="login"
            element={<LoginPage />}
          />
          <Route
            path="register"
            element={<RegisterPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
