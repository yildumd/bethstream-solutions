import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MdMessage, MdSearch, MdMarkEmailRead, MdMarkEmailUnread,
  MdPhone, MdEmail, MdClose, MdDelete,
} from "react-icons/md";
import { getMessages, markRead } from "../../services/messageService";
import { COMPANY } from "../../constants";
import toast from "react-hot-toast";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const load = () => getMessages().then(m => { setMessages(m); setLoading(false); });
  useEffect(() => { load(); }, []);

  const filtered = messages.filter(m => {
    const matchFilter = filter === "all" || (filter === "unread" && !m.read) || (filter === "read" && m.read);
    const matchSearch =
      (m.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (m.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (m.subject || "").toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleOpen = async (msg) => {
    setSelected(msg);
    if (!msg.read) {
      try {
        await markRead(msg.id);
        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m));
      } catch {}
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-white text-2xl">Customer Messages</h1>
        <p className="text-white/40 text-sm">
          {messages.length} messages · <span className="text-lemon-400">{unreadCount} unread</span>
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input
            placeholder="Search messages..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-11"
          />
        </div>
        <div className="flex gap-2">
          {[
            { value: "all",    label: "All" },
            { value: "unread", label: `Unread (${unreadCount})` },
            { value: "read",   label: "Read" },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === value
                  ? "bg-purple-500/30 text-purple-300 border border-purple-400/30"
                  : "glass border border-white/10 text-white/50 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-20 rounded-xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 glass-card">
          <MdMessage className="text-white/20 mx-auto mb-3" size={40} />
          <p className="text-white/30">No messages found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(msg => (
            <motion.button
              key={msg.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => handleOpen(msg)}
              className={`w-full text-left glass-card p-5 hover:border-purple-400/20 transition-all ${
                !msg.read ? "border-purple-500/20 bg-purple-500/5" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${!msg.read ? "bg-lemon-400" : "bg-white/20"}`} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-medium ${!msg.read ? "text-white" : "text-white/70"}`}>
                        {msg.name || "Unknown"}
                      </p>
                      <p className="text-white/40 text-xs">{msg.email}</p>
                    </div>
                    {msg.subject && (
                      <p className={`text-sm truncate ${!msg.read ? "text-white/70" : "text-white/40"}`}>
                        {msg.subject}
                      </p>
                    )}
                    {msg.message && (
                      <p className="text-white/30 text-xs truncate">{msg.message}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {msg.createdAt?.seconds && (
                    <span className="text-white/30 text-xs">
                      {new Date(msg.createdAt.seconds * 1000).toLocaleDateString()}
                    </span>
                  )}
                  {!msg.read
                    ? <MdMarkEmailUnread className="text-lemon-400" size={16} />
                    : <MdMarkEmailRead className="text-white/20" size={16} />
                  }
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={e => e.target === e.currentTarget && setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-8 max-w-lg w-full"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-white text-xl">{selected.name}</h3>
                <p className="text-white/50 text-sm">{selected.email}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all">
                <MdClose size={20} />
              </button>
            </div>

            {selected.subject && (
              <div className="mb-4">
                <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Subject</p>
                <p className="text-white font-medium">{selected.subject}</p>
              </div>
            )}

            <div className="mb-6">
              <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Message</p>
              <div className="bg-white/5 rounded-xl p-5">
                <p className="text-white/80 text-sm leading-relaxed">{selected.message}</p>
              </div>
            </div>

            <div className="flex gap-3">
              {selected.phone && (
                <a href={`tel:${selected.phone}`} className="btn-sky flex-1 justify-center text-sm py-2.5">
                  <MdPhone size={16} /> Call
                </a>
              )}
              <a href={`mailto:${selected.email}`} className="btn-primary flex-1 justify-center text-sm py-2.5">
                <MdEmail size={16} /> Reply
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
