import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import ProfilePage from "./pages/ProfilePage";
import Suggestions from "./pages/Suggestions";
import Reviews from "./pages/Reviews";
import Addresses from "./pages/AddressesPage";
import PrivateRoute from "./components/PrivateRoute";

import AdminProductsPage from "./pages/AdminProductsPage";
import AdminStockPage from "./pages/AdminStockPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>


        {/* Layout compartilhado */}
        <Route element={<MainLayout />}>
          {/* Página pública */}
          <Route
            path="/"
            element={<MenuPage />}
          />
          <Route
            path="/home"
            element={<HomePage />}
          />

          <Route
            path="/menu"
            element={<MenuPage />}
          />

          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <MyOrdersPage />
              </PrivateRoute>}
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>}
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/suggestions"
            element={
              <PrivateRoute>
                <Suggestions />
              </PrivateRoute>
            }
          />

          <Route
            path="/reviews"
            element={
              <PrivateRoute>
                <Reviews />
              </PrivateRoute>
            }
          />

          <Route
            path="/addresses"
            element={
              <PrivateRoute>
                <Addresses />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/products"
            element={<AdminProductsPage />}
          />

          <Route
            path="/admin/stock"
            element={<AdminStockPage />}
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />

        </Route>

      </Routes >
    </BrowserRouter >
  );
}

export default App;