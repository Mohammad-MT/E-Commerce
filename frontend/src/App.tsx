import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { Loader } from "lucide-react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import ProductPage from "./pages/ProductPage";
import ShopCartPage from "./pages/ShopCartPage";
import ProfilePage from "./pages/ProfilePage"; //soon
import HistoryPage from "./pages/HistoryPage"; //soon
import Page404 from "./pages/Page404";

import { useAuthStore } from "./store/useAuthStore";
import { useProductStore } from "./store/useProductStore";
import { useCartStore } from "./store/useCartStore";
import useThemeStore from "./store/useThemeStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { setProductsPaginated, page, limit } = useProductStore();
  const { checkCart } = useCartStore();
  const { theme, checkTheme } = useThemeStore();

  useEffect(() => {
    checkAuth();
    checkCart();
    checkTheme();
  }, [checkAuth, checkCart, checkTheme]);

  useEffect(() => {
    setProductsPaginated(page, limit);
  }, [page, limit, setProductsPaginated]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme ? "dark" : "light"} className="min-h-screen">
      <Navbar />
      <Routes>
        <Route>
          <Route index element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<ShopCartPage />} />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/history"
            element={authUser ? <HistoryPage /> : <Navigate to={"/login"} />}
          />
        </Route>
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <LogInPage />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <SignUpPage />}
        />
        {/* // soon */}
        <Route path="/about" element={<Page404 />} />
        {/* // soon */}
        <Route path="/contact" element={<Page404 />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
