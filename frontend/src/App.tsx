import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { Loader } from "lucide-react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ProductsPage from "./pages/ProductsPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import ProductPage from "./pages/ProductPage";
import ShopCartPage from "./pages/ShopCartPage";
import ProfilePage from "./pages/ProfilePage";
import HistoryPage from "./pages/HistoryPage"; //soon
import Page404 from "./pages/Page404";

import { useAuthStore } from "./store/useAuthStore";
import { useProductStore } from "./store/useProductStore";
import { useCartStore } from "./store/useCartStore";
import useThemeStore from "./store/useThemeStore";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import HomePage from "./pages/HomePage";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { setProductsPaginated, page, limit, filter, isAddingProduct } =
    useProductStore();
  const { checkCart } = useCartStore();
  const { theme, checkTheme } = useThemeStore();

  useEffect(() => {
    checkAuth();
    checkCart();
    checkTheme();
  }, [checkAuth, checkCart, checkTheme]);

  useEffect(() => {
    setProductsPaginated(page, limit, filter);
  }, [page, limit, filter, setProductsPaginated, isAddingProduct]);

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
          <Route path="/products" element={<ProductsPage />} />
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
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/admin"
          element={
            authUser?.role === "admin" ? (
              <AdminPanelPage />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />

        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
