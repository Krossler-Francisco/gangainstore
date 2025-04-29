import { Routes, Route } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminHome from "./AdminHome";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import AdminUsers from "./AdminUsers";
import AdminSettings from "./AdminSettings";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="navbar">
        <AdminNavbar />
      </div>
      <div className="main-content">
        <div className="header">
          <h2>Panel Admin</h2>
        </div>
        <div className="content">
          <div className="content-wrapper">
            <Routes>
              <Route index element={<AdminHome />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
