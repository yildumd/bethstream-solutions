import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MdInventory, MdShoppingBag, MdRequestQuote, MdMessage,
  MdTrendingUp, MdPeople, MdAttachMoney, MdArrowForward,
} from "react-icons/md";
import { getOrders } from "../../services/orderService";
import { getQuotes } from "../../services/quoteService";
import { getMessages } from "../../services/messageService";
import { getProducts } from "../../services/productService";
import { formatPrice } from "../../data/products";
import { staggerContainer, staggerItem } from "../../animations/variants";

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <motion.div
    variants={staggerItem}
    className="glass-card p-6 border border-white/10 hover:border-white/20 transition-all"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-11 h-11 rounded-xl bg-${color}-500/15 flex items-center justify-center`}>
        <Icon className={`text-${color}-400`} size={22} />
      </div>
      <span className="text-lemon-400 text-xs flex items-center gap-1 font-medium">
        <MdTrendingUp size={14} /> Live
      </span>
    </div>
    <p className="text-white/50 text-sm mb-1">{label}</p>
    <p className="font-display font-bold text-white text-3xl">{value}</p>
    {sub && <p className="text-white/30 text-xs mt-1">{sub}</p>}
  </motion.div>
);

export default function Dashboard() {
  const [data, setData] = useState({ orders: [], quotes: [], messages: [], products: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getOrders(), getQuotes(), getMessages(), getProducts()])
      .then(([orders, quotes, messages, products]) => {
        setData({ orders, quotes, messages, products });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const revenue = data.orders
    .filter(o => o.status !== "cancelled")
    .reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = data.orders.filter(o => o.status === "pending").length;
  const newQuotes = data.quotes.filter(q => q.status === "new").length;
  const unreadMessages = data.messages.filter(m => !m.read).length;

  const cards = [
    { icon: MdAttachMoney, label: "Total Revenue", value: formatPrice(revenue), sub: `${data.orders.length} total orders`, color: "lemon" },
    { icon: MdShoppingBag,  label: "Orders", value: data.orders.length, sub: `${pendingOrders} pending`, color: "purple" },
    { icon: MdRequestQuote, label: "Quote Requests", value: data.quotes.length, sub: `${newQuotes} new`, color: "sky" },
    { icon: MdMessage,      label: "Messages", value: data.messages.length, sub: `${unreadMessages} unread`, color: "purple" },
    { icon: MdInventory,    label: "Products", value: data.products.length, sub: "in catalog", color: "lemon" },
    { icon: MdPeople,       label: "Clients Served", value: "200+", sub: "all time", color: "sky" },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-white text-2xl">Dashboard</h1>
          <p className="text-white/40 text-sm">Welcome back — here's your overview.</p>
        </div>
        <Link to="/admin/products/new" className="btn-primary text-sm py-2.5 px-5">
          + Add Product
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-36 rounded-2xl" />
          ))}
        </div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8"
        >
          {cards.map(c => <StatCard key={c.label} {...c} />)}
        </motion.div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display font-semibold text-white">Recent Orders</h3>
            <Link to="/admin/orders" className="text-purple-400 text-sm hover:text-purple-300 flex items-center gap-1">
              View All <MdArrowForward size={14} />
            </Link>
          </div>
          {data.orders.length === 0 ? (
            <p className="text-white/30 text-sm text-center py-8">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {data.orders.slice(0, 5).map(order => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-all">
                  <div>
                    <p className="text-white text-sm font-medium">{order.name || "Customer"}</p>
                    <p className="text-white/40 text-xs">
                      {order.createdAt?.seconds
                        ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
                        : "Just now"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-300 text-sm font-semibold">{formatPrice(order.total || 0)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      order.status === "delivered" ? "bg-lemon-500/20 text-lemon-300"
                        : order.status === "processing" ? "bg-sky-500/20 text-sky-300"
                        : "bg-purple-500/20 text-purple-300"
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
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display font-semibold text-white">Quote Requests</h3>
            <Link to="/admin/quotes" className="text-purple-400 text-sm hover:text-purple-300 flex items-center gap-1">
              View All <MdArrowForward size={14} />
            </Link>
          </div>
          {data.quotes.length === 0 ? (
            <p className="text-white/30 text-sm text-center py-8">No quote requests yet</p>
          ) : (
            <div className="space-y-3">
              {data.quotes.slice(0, 5).map(q => (
                <div key={q.id} className="flex items-center justify-between p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-all">
                  <div>
                    <p className="text-white text-sm font-medium">{q.fullName || "Unknown"}</p>
                    <p className="text-white/40 text-xs">{q.projectType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sky-300 text-xs truncate max-w-[120px]">{q.budget}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      q.status === "new" ? "bg-lemon-500/20 text-lemon-300" : "bg-white/10 text-white/40"
                    }`}>
                      {q.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { to: "/admin/products/new", label: "Add Product",     icon: MdInventory,    color: "purple" },
          { to: "/admin/orders",       label: "Manage Orders",   icon: MdShoppingBag,  color: "sky" },
          { to: "/admin/quotes",       label: "View Quotes",     icon: MdRequestQuote, color: "lemon" },
          { to: "/admin/messages",     label: "Messages",        icon: MdMessage,      color: "purple" },
        ].map(({ to, label, icon: Icon, color }) => (
          <Link
            key={to}
            to={to}
            className="glass-card p-4 text-center hover:border-purple-400/20 hover:-translate-y-0.5 transition-all group"
          >
            <div className={`w-10 h-10 rounded-xl bg-${color}-500/15 flex items-center justify-center mx-auto mb-3`}>
              <Icon className={`text-${color}-400`} size={20} />
            </div>
            <p className="text-white/60 text-xs font-medium group-hover:text-white transition-colors">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
