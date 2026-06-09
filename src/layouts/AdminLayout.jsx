import { useState } from "react";
import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdDashboard, MdInventory, MdShoppingBag, MdRequestQuote,
  MdMessage, MdSettings, MdMenu, MdClose, MdLogout,
  MdCategory, MdAnalytics,
} from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";

const links = [
  { path: "/admin", label: "Dashboard", icon: MdDashboard },
  { path: "/admin/products", label: "Products", icon: MdInventory },
  { path: "/admin/categories", label: "Categories", icon: MdCategory },
  { path: "/admin/orders", label: "Orders", icon: MdShoppingBag },
  { path: "/admin/quotes", label: "Quotes", icon: MdRequestQuote },
  { path: "/admin/messages", label: "Messages", icon: MdMessage },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, isAdmin, loading, logout } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center"><div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>;
  if (!user || !isAdmin) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex bg-[#0a0a12]">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        className="flex-shrink-0 bg-[#0d0d1a] border-r border-white/5 flex flex-col overflow-hidden"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-white/5">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-sky-500 flex-shrink-0" />
              <span className="font-display font-bold text-white text-sm">Admin Panel</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`${collapsed ? "mx-auto" : "ml-auto"} p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all`}
          >
            {collapsed ? <MdMenu size={18} /> : <MdClose size={18} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {links.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                title={collapsed ? label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-purple-500/20 text-purple-300"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-2 border-t border-white/5">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-white/50 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <MdLogout size={20} className="flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        <Outlet />
        <Toaster position="top-right" />
      </div>
    </div>
  );
}
