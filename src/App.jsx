import { MantineProvider } from "@mantine/core";
import HomePage from "./components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/admin/Dashboard";
import AdminProducts from "./components/admin/Products";
import AdminCategories from "./components/admin/Categories";
import AdminOrders from "./components/admin/Orders";
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <AuthProvider>
            <MantineProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/admin" element={<ProtectedRoute />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="orders" element={<AdminOrders />} />
                </Route>
              </Routes>
            </MantineProvider>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
