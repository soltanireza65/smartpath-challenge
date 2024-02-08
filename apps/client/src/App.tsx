import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import { PrivateRoute } from "./components/PrivateRoute";
// import { PrivateRoute } from "./components/PrivateRoute";

export const isAuthenticated = !!localStorage.getItem("accessToken") ?? false

function App() {

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/auth/signin" element={<SignInPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App











