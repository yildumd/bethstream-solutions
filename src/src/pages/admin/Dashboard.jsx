import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdInventory, MdShoppingBag, MdRequestQuote, MdMessage,
  MdAdd, MdArrowForward, MdAttachMoney, MdTrendingUp,
} from "react-icons/md";
import { getOrders }   from "../../services/orderService";
import { getQuotes }   from "../../services/quoteService";
import { getMessages } from "../../services/messageService";
import { getProducts } from "../../services/productService";
import { formatPrice } from "../../data/products";

function StatCard({ icon: Icon, label, value, sub, color, to }) {
  const colors = {
    blue:  "bg-brand-blueLight text-brand-blue",
    green: "bg-green-50 text-green-600",
    amber: "bg-amber-50 text-amber-600",
    slate: "bg-slate-100 text-slate-600",
  };
  return (
    <Link to={to} className="card p-5 hover:shadow-card-hover transition-all group block">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[color]}`}>
          <Icon size={20} />
        </div>
        <MdArrowForward size={16} className="text-slate-300 group-hover:text-brand-blue transition-colors" />
      </div>
      <p className="text-2xl font-display font-bold text-brand-slate mb-0.5">{value}</p>
      <p className="text-sm text-brand-gray">{label}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </Link>
  );
}

export default function Dashboard() {
  const [data, setData] = useState({ orders: [], quotes: [], messages: [], products: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getOrders(), getQuotes(), getMessages(), getProducts()])
      .then(([orders, quotes, messages, products]) => {
        setData({ orders, quotes, messages, products });
        setLoading(false);
      }).catch(() => setLoading(false));
  }, []);

  const revenue      = data.orders.filter(o => o.status !== "cancelled").reduce((s, o) => s + (o.total || 0), 0);
  const pendingCount = data.orders.filter(o => o.status === "pending").length;
  const newQuotes    = data.quotes.filter(q => q.status === "new").length;
  const unread       = data.messages.filter(m => !m.read).length;

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl text-brand-slate">Dashboard</h1>
          <p className="text-brand-gray text-sm">Welcome back. Here's what's happening.</p>
        </div>
        <Link to="/admin/products/new" className="btn-primary">
          <MdAdd size={18} /> Add Product
        </Link>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-28 rounded-xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={MdAttachMoney} label="Total Revenue" value={formatPrice(revenue)}
            sub={`${data.orders.length} orders`} color="green" to="/admin/orders" />
          <StatCard icon={MdShoppingBag} label="Orders" value={data.orders.length}
            sub={`${pendingCount} pending`} color="blue" to="/admin/orders" />
          <StatCard icon={MdRequestQuote} label="Quotes" value={data.quotes.length}
            sub={`${newQuotes} new`} color="amber" to="/admin/quotes" />
          <StatCard icon={MdMessage} label="Messages" value={data.messages.length}
            sub={`${unread} unread`} color="slate" to="/admin/messages" />
        </div>
      )}

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="font-semibold text-brand-slate text-base mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { to: "/admin/products/new", label: "Add New Product",    icon: MdAdd,          desc: "Upload & publish",      color: "bg-brand-blue text-white" },
            { to: "/admin/products",     label: "Manage Products",    icon: MdInventory,    desc: "Edit or delete",        color: "bg-white text-brand-slate border border-brand-border" },
            { to: "/admin/quotes",       label: "Review Quotes",      icon: MdRequestQuote, desc: `${newQuotes} new`,      color: "bg-white text-brand-slate border border-brand-border" },
            { to: "/admin/messages",     label: "Read Messages",      icon: MdMessage,      desc: `${unread} unread`,      color: "bg-white text-brand-slate border border-brand-border" },
          ].map(({ to, label, icon: Icon, desc, color }) => (
            <Link key={to} to={to}
              className={`flex flex-col gap-2 p-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-card-hover ${color}`}>
              <Icon size={20} />
              <div>
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs opacity-70">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border">
            <h3 className="font-semibold text-brand-slate text-sm">Recent Orders</h3>
            <Link to="/admin/orders" className="text-brand-blue text-xs font-medium hover:underline">
              View all
            </Link>
          </div>
          {data.orders.length === 0 ? (
            <div className="py-10 text-center text-slate-400 text-sm">No orders yet</div>
          ) : (
            <div className="divide-y divide-brand-border">
              {data.orders.slice(0, 5).map(order => (
                <div key={order.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50">
                  <div>
                    <p className="text-brand-slate text-sm font-medium">{order.name || "Customer"}</p>
                    <p className="text-slate-400 text-xs">{order.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-brand-slate font-semibold text-sm">{formatPrice(order.total || 0)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      order.status === "delivered" ? "bg-green-50 text-green-700"
                        : order.status === "processing" ? "bg-blue-50 text-blue-700"
                        : "bg-amber-50 text-amber-700"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Quotes */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border">
            <h3 className="font-semibold text-brand-slate text-sm">Recent Quotes</h3>
            <Link to="/admin/quotes" className="text-brand-blue text-xs font-medium hover:underline">
              View all
            </Link>
          </div>
          {data.quotes.length === 0 ? (
            <div className="py-10 text-center text-slate-400 text-sm">No quotes yet</div>
          ) : (
            <div className="divide-y divide-brand-border">
              {data.quotes.slice(0, 5).map(q => (
                <div key={q.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50">
                  <div>
                    <p className="text-brand-slate text-sm font-medium">{q.fullName || "Unknown"}</p>
                    <p className="text-slate-400 text-xs">{q.projectType}</p>
                  </div>
                  <span className={`badge text-xs ${q.status === "new" ? "badge-blue" : "badge-gray"}`}>
                    {q.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
