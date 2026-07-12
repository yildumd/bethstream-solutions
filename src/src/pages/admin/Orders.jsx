import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdShoppingBag, MdSearch, MdCheckCircle, MdLocalShipping, MdPending, MdCancel } from "react-icons/md";
import { getOrders, updateOrderStatus } from "../../services/orderService";
import { formatPrice } from "../../data/products";
import toast from "react-hot-toast";

const STATUS_CONFIG = {
  pending:    { label: "Pending",    color: "yellow", icon: MdPending },
  processing: { label: "Processing", color: "sky",    icon: MdLocalShipping },
  delivered:  { label: "Delivered",  color: "lemon",  icon: MdCheckCircle },
  cancelled:  { label: "Cancelled",  color: "red",    icon: MdCancel },
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const load = () => {
    getOrders().then(o => { setOrders(o); setLoading(false); });
  };
  useEffect(() => { load(); }, []);

  const filtered = orders.filter(o => {
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    const matchSearch = (o.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (o.email || "").toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      toast.success(`Order marked as ${status}`);
      load();
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-white text-2xl">Orders</h1>
        <p className="text-white/40 text-sm">{orders.length} total orders</p>
      </div>

      {/* Status Pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {["all", "pending", "processing", "delivered", "cancelled"].map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
              statusFilter === s
                ? "bg-purple-500/30 text-purple-300 border border-purple-400/30"
                : "glass border border-white/10 text-white/50 hover:text-white"
            }`}
          >
            {s === "all" ? "All Orders" : s}
            {s !== "all" && (
              <span className="ml-2 text-xs opacity-60">
                ({orders.filter(o => o.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
        <input
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-field pl-11 max-w-md"
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-20 rounded-xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 glass-card">
          <MdShoppingBag className="text-white/20 mx-auto mb-3" size={40} />
          <p className="text-white/30">No orders found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(order => {
            const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
            const Icon = cfg.icon;
            const isOpen = expanded === order.id;
            return (
              <div key={order.id} className="glass-card overflow-hidden">
                <button
                  onClick={() => setExpanded(isOpen ? null : order.id)}
                  className="w-full flex items-center justify-between p-5 hover:bg-white/3 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0">
                      <MdShoppingBag className="text-purple-400" size={18} />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{order.name || "Customer"}</p>
                      <p className="text-white/40 text-xs">{order.email} · {
                        order.createdAt?.seconds
                          ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
                          : "Recent"
                      }</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-purple-300 font-bold">{formatPrice(order.total || 0)}</p>
                    <span className={`badge bg-${cfg.color}-500/15 text-${cfg.color}-300 border border-${cfg.color}-500/20`}>
                      <Icon size={12} className="mr-1" />
                      {cfg.label}
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="border-t border-white/10 p-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Contact</p>
                        <p className="text-white text-sm">{order.phone}</p>
                        <p className="text-white/50 text-sm">{order.address}</p>
                        <p className="text-white/50 text-sm">{order.city}, {order.state}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Items ({(order.items || []).length})</p>
                        <div className="space-y-1">
                          {(order.items || []).map((item, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="text-white/60 truncate pr-2">{item.name} ×{item.quantity}</span>
                              <span className="text-white/80 flex-shrink-0">{formatPrice((item.price || 0) * (item.quantity || 1))}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <p className="text-white/40 text-sm mr-2 self-center">Update status:</p>
                      {Object.entries(STATUS_CONFIG).map(([key, { label }]) => (
                        <button
                          key={key}
                          onClick={() => handleStatus(order.id, key)}
                          disabled={order.status === key}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            order.status === key
                              ? "bg-white/10 text-white/30 cursor-default"
                              : "glass border border-white/10 text-white/60 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
