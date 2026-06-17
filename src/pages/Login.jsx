import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const [tab,      setTab]      = useState("login");
  const [form,     setForm]     = useState({ email: "", password: "", name: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const { login, register }     = useAuth();
  const navigate                = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (tab === "login") await login(form.email, form.password);
      else                 await register(form.email, form.password, form.name);
      navigate("/");
    } catch (err) {
      const msg =
        err.code === "auth/invalid-credential"    ? "Invalid email or password" :
        err.code === "auth/email-already-in-use"  ? "Email already registered" :
        "Authentication failed. Try again.";
      toast.error(msg);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold">BS</span>
          </div>
          <h1 className="font-display font-bold text-brand-slate text-xl">Bethstream Solutions</h1>
          <p className="text-brand-gray text-sm">Customer Portal</p>
        </div>

        <div className="card p-7">
          {/* Tabs */}
          <div className="flex rounded-lg bg-slate-100 p-1 mb-6">
            {[["login", "Sign In"], ["register", "Register"]].map(([t, l]) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                  tab === t ? "bg-white text-brand-slate shadow-card" : "text-brand-gray hover:text-brand-slate"
                }`}>
                {l}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "register" && (
              <div>
                <label className="label-text">Full Name</label>
                <input name="name" value={form.name} onChange={handleChange}
                  placeholder="John Okafor" className="input-field" />
              </div>
            )}
            <div>
              <label className="label-text">Email Address</label>
              <div className="relative">
                <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="john@example.com" className="input-field pl-9" />
              </div>
            </div>
            <div>
              <label className="label-text">Password</label>
              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input name="password" type={showPass ? "text" : "password"}
                  value={form.password} onChange={handleChange}
                  placeholder="••••••••" className="input-field pl-9 pr-9" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-slate">
                  {showPass ? <MdVisibilityOff size={16} /> : <MdVisibility size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
              {loading
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : tab === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-brand-gray text-sm mt-5">
            {tab === "login" ? "No account? " : "Have an account? "}
            <button onClick={() => setTab(tab === "login" ? "register" : "login")}
              className="text-brand-blue font-medium hover:underline">
              {tab === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
