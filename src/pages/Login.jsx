import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdAdminPanelSettings } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const [form,     setForm]     = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const { login }               = useAuth();
  const navigate                = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please enter your email and password");
      return;
    }
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/admin");
    } catch (err) {
      const msg =
        err.code === "auth/invalid-credential"   ? "Invalid email or password. Please try again." :
        err.code === "auth/user-not-found"        ? "No account found with this email." :
        err.code === "auth/wrong-password"        ? "Wrong password. Please try again." :
        err.code === "auth/too-many-requests"     ? "Too many attempts. Please wait a moment." :
        err.code === "auth/network-request-failed"? "Network error. Check your internet connection." :
        "Login failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-brand-blue flex items-center justify-center mx-auto mb-4 shadow-card">
            <MdAdminPanelSettings size={28} className="text-white" />
          </div>
          <h1 className="font-display font-bold text-brand-slate text-2xl">Admin Login</h1>
          <p className="text-brand-gray text-sm mt-1">Bethstream Solutions Management</p>
        </div>

        {/* Card */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label-text">Email Address</label>
              <div className="relative">
                <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@bethstream.com"
                  className="input-field pl-10"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="label-text">Password</label>
              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-field pl-10 pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-slate transition-colors">
                  {showPass ? <MdVisibilityOff size={17} /> : <MdVisibility size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 text-base">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : "Sign In to Dashboard"}
            </button>
          </form>

          <p className="text-center text-slate-400 text-xs mt-6">
            This page is for authorised staff only.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
