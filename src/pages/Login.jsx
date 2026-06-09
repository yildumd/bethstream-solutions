import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (tab === "login") {
        await login(form.email, form.password);
      } else {
        await register(form.email, form.password, form.name);
      }
      navigate("/");
    } catch (err) {
      const msg = err.code === "auth/invalid-credential" ? "Invalid email or password"
        : err.code === "auth/email-already-in-use" ? "Email already registered"
        : "Authentication failed. Please try again.";
      toast.error(msg, { style: { background: "#1a1a2e", color: "#fff" } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-sky-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">BS</span>
          </div>
          <h1 className="font-display font-bold text-white text-2xl">Bethstream Solutions</h1>
          <p className="text-white/40 text-sm">Customer Portal</p>
        </div>

        <div className="glass-card p-8">
          {/* Tabs */}
          <div className="flex rounded-xl bg-white/5 p-1 mb-8">
            {["login", "register"].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${tab === t ? "bg-purple-600 text-white shadow-glow" : "text-white/50 hover:text-white"}`}
              >
                {t === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {tab === "register" && (
              <div>
                <label className="label-text">Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="John Okafor" className="input-field" />
              </div>
            )}
            <div>
              <label className="label-text">Email Address</label>
              <div className="relative">
                <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className="input-field pl-11" />
              </div>
            </div>
            <div>
              <label className="label-text">Password</label>
              <div className="relative">
                <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <input name="password" type={showPass ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="••••••••" className="input-field pl-11 pr-11" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                  {showPass ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : tab === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-white/40 text-sm mt-6">
            {tab === "login" ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setTab(tab === "login" ? "register" : "login")} className="text-purple-400 hover:text-purple-300 transition-colors">
              {tab === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
