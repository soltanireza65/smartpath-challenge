import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import { PrivateRoute } from "./components/PrivateRoute";
import SignInCallback from "./pages/SignInCallback";
import PasswordForgotten from "./pages/PasswordForgotten";
import VerifyPasswordResetCode from "./pages/VerifyPasswordResetCode";
import PasswordReset from "./pages/PasswordReset";

export const isAuthenticated = !!localStorage.getItem("accessToken") ?? false

function App() {

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/auth/callback" element={<SignInCallback />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/auth/signin" element={<SignInPage />} />
        <Route path="/auth/password-forgot" element={<PasswordForgotten />} />
        <Route path="/auth/password-reset-verify" element={<VerifyPasswordResetCode />} />
        <Route path="/auth/password-reset" element={<PasswordReset />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App












