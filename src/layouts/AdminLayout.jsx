import { useState } from "react";
import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import {
  MdDashboard, MdInventory, MdShoppingBag, MdRequestQuote,
  MdMessage, MdMenu, MdClose, MdLogout, MdCategory,
  MdAddPhotoAlternate, MdSettings, MdOpenInNew,
} from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";

const NAV = [
  { path: "/admin",             label: "Overview",    icon: MdDashboard },
  { path: "/admin/products",    label: "Products",    icon: MdInventory },
  { path: "/admin/products/new",label: "Add Product", icon: MdAddPhotoAlternate },
  { path: "/admin/orders",      label: "Orders",      icon: MdShoppingBag },
  { path: "/admin/quotes",      label: "Quotes",      icon: MdRequestQuote },
  { path: "/admin/messages",    label: "Messages",    icon: MdMessage },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAdmin, loading, logout } = useAuth();
  const location = useLocation();

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!user || !isAdmin) return <Navigate to="/login" replace />;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-14 flex items-center px-5 border-b border-brand-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-blue flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs">BS</span>
          </div>
          <span className="font-display font-bold text-brand-slate text-sm">Admin Panel</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wide px-3 pt-2 pb-1">
          Management
        </p>
        {NAV.map(({ path, label, icon: Icon }) => {
          const exact = path === "/admin" ? location.pathname === path : location.pathname.startsWith(path) && !(path === "/admin/products" && location.pathname === "/admin/products/new");
          return (
            <Link key={path} to={path}
              onClick={() => setSidebarOpen(false)}
              className={exact ? "admin-link-active" : "admin-link"}>
              <Icon size={18} className="flex-shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}

        <div className="pt-3">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wide px-3 pb-1">Links</p>
          <a href="/" target="_blank" rel="noreferrer"
            className="admin-link">
            <MdOpenInNew size={18} />
            <span>View Website</span>
          </a>
        </div>
      </nav>

      {/* User */}
      <div className="p-3 border-t border-brand-border">
        <div className="flex items-center gap-2 px-3 py-2 mb-1">
          <div className="w-7 h-7 rounded-full bg-brand-blueLight flex items-center justify-center flex-shrink-0">
            <span className="text-brand-blue text-xs font-bold">
              {user?.email?.[0]?.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-brand-gray truncate">{user?.email}</p>
        </div>
        <button onClick={logout}
          className="admin-link w-full text-red-500 hover:text-red-600 hover:bg-red-50">
          <MdLogout size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-brand-border flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-56 bg-white border-r border-brand-border z-50">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center justify-between h-14 px-4 bg-white border-b border-brand-border">
          <button onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-brand-gray hover:bg-slate-100 transition-colors">
            <MdMenu size={22} />
          </button>
          <span className="font-display font-bold text-brand-slate text-sm">Admin Panel</span>
          <div className="w-9" />
        </div>

        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>

      <Toaster position="top-right"
        toastOptions={{ style: { background: "#1E293B", color: "#fff", fontSize: "14px" } }} />
    </div>
  );
}
