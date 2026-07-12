import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MdRequestQuote, MdSearch, MdPhone, MdEmail,
  MdBusiness, MdCheckCircle, MdClose,
} from "react-icons/md";
import { getQuotes, updateQuoteStatus } from "../../services/quoteService";
import { COMPANY } from "../../constants";
import toast from "react-hot-toast";

const STATUS_COLORS = {
  new:         "bg-lemon-500/15 text-lemon-300 border-lemon-500/20",
  "in-review": "bg-sky-500/15 text-sky-300 border-sky-500/20",
  quoted:      "bg-purple-500/15 text-purple-300 border-purple-500/20",
  closed:      "bg-white/10 text-white/40 border-white/10",
};

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const load = () => getQuotes().then(q => { setQuotes(q); setLoading(false); });
  useEffect(() => { load(); }, []);

  const filtered = quotes.filter(q => {
    const matchStatus = statusFilter === "all" || q.status === statusFilter;
    const matchSearch =
      (q.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
      (q.company || "").toLowerCase().includes(search.toLowerCase()) ||
      (q.projectType || "").toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleStatus = async (id, status) => {
    try {
      await updateQuoteStatus(id, status);
      toast.success("Status updated");
      load();
      if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-white text-2xl">Quote Requests</h1>
        <p className="text-white/40 text-sm">{quotes.length} total requests · {quotes.filter(q => q.status === "new").length} new</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input
            placeholder="Search by name, company, project..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-11"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["all", "new", "in-review", "quoted", "closed"].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-full text-sm capitalize transition-all ${
                statusFilter === s
                  ? "bg-purple-500/30 text-purple-300 border border-purple-400/30"
                  : "glass border border-white/10 text-white/50 hover:text-white"
              }`}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-24 rounded-xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 glass-card">
          <MdRequestQuote className="text-white/20 mx-auto mb-3" size={40} />
          <p className="text-white/30">No quote requests found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map(q => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-5 hover:border-purple-400/20 transition-all cursor-pointer"
              onClick={() => setSelected(q)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MdRequestQuote className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-semibold">{q.fullName}</p>
                      {q.company && (
                        <span className="text-white/40 text-xs flex items-center gap-1">
                          <MdBusiness size={12} /> {q.company}
                        </span>
                      )}
                    </div>
                    <p className="text-white/50 text-sm">{q.projectType}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-white/40 text-xs flex items-center gap-1">
                        <MdPhone size={11} /> {q.phone}
                      </span>
                      <span className="text-white/40 text-xs flex items-center gap-1">
                        <MdEmail size={11} /> {q.email}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`badge border ${STATUS_COLORS[q.status] || STATUS_COLORS.new}`}>
                    {q.status}
                  </span>
                  {q.budget && <p className="text-sky-300 text-xs">{q.budget}</p>}
                </div>
              </div>
              {q.description && (
                <p className="text-white/30 text-sm mt-3 line-clamp-2 pl-15">{q.description}</p>
              )}
            </motion.div>
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
            className="glass-card p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-white text-xl">{selected.fullName}</h3>
                {selected.company && <p className="text-white/50 text-sm">{selected.company}</p>}
              </div>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all">
                <MdClose size={20} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {[
                { label: "Project Type",  value: selected.projectType },
                { label: "Budget",        value: selected.budget },
                { label: "Email",         value: selected.email },
                { label: "Phone",         value: selected.phone },
                { label: "Submitted",     value: selected.createdAt?.seconds ? new Date(selected.createdAt.seconds * 1000).toLocaleString() : "Recent" },
              ].filter(r => r.value).map(({ label, value }) => (
                <div key={label} className="flex gap-3">
                  <span className="text-white/40 text-sm w-28 flex-shrink-0">{label}:</span>
                  <span className="text-white text-sm">{value}</span>
                </div>
              ))}
              {selected.description && (
                <div>
                  <p className="text-white/40 text-sm mb-2">Description:</p>
                  <p className="text-white/70 text-sm leading-relaxed bg-white/5 rounded-xl p-4">{selected.description}</p>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 pt-5">
              <p className="text-white/40 text-sm mb-3">Update Status:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["new", "in-review", "quoted", "closed"].map(s => (
                  <button
                    key={s}
                    onClick={() => handleStatus(selected.id, s)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                      selected.status === s
                        ? "bg-purple-500/30 text-purple-300 border border-purple-400/30"
                        : "glass border border-white/10 text-white/50 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <a href={`tel:${selected.phone}`} className="btn-sky flex-1 justify-center text-sm py-2.5">
                  <MdPhone size={16} /> Call
                </a>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}?text=Hi ${selected.fullName}, regarding your ${selected.projectType} quote request...`}
                  target="_blank" rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-500/15 border border-green-500/20 text-green-400 text-sm font-semibold hover:bg-green-500/25 transition-all"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
