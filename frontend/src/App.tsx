import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import ProductPage from "./pages/ProductPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { useProductStore } from "./store/useProductStore";
import { useCartStore } from "./store/useCartStore";
import ShopCartPage from "./pages/ShopCartPage";
import Page404 from "./pages/Page404";
import useThemeStore from "./store/useThemeStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { setProducts } = useProductStore();
  const { checkCart } = useCartStore();
  const { theme, checkTheme } = useThemeStore();

  useEffect(() => {
    checkAuth();
    setProducts();
    checkCart();
    checkTheme();
  }, [checkAuth, setProducts, checkCart, checkTheme]);

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
        </Route>
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <LogInPage />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <SignUpPage />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
