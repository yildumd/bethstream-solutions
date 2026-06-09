import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdArrowBack, MdCheckCircle, MdLock } from "react-icons/md";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { formatPrice } from "../data/products";
import toast from "react-hot-toast";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "", payment: "bank" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  if (items.length === 0 && !done) return (
    <div className="min-h-screen pt-28 flex items-center justify-center">
      <div className="text-center">
        <p className="text-white/40 mb-4">Your cart is empty</p>
        <Link to="/shop" className="btn-primary">Shop Now</Link>
      </div>
    </div>
  );

  if (done) return (
    <div className="min-h-screen pt-28 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-12 text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-lemon-500/20 flex items-center justify-center mx-auto mb-6">
          <MdCheckCircle className="text-lemon-400" size={32} />
        </div>
        <h2 className="font-display font-bold text-white text-2xl mb-3">Order Placed!</h2>
        <p className="text-white/60 mb-6">Thank you for your order. We'll contact you within 24 hours to confirm and arrange delivery/pickup.</p>
        <Link to="/" className="btn-primary w-full justify-center">Back to Home</Link>
      </motion.div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) { toast.error("Please fill required fields"); return; }
    setLoading(true);
    try {
      await createOrder({ ...form, items, total, status: "pending" });
      clearCart();
      setDone(true);
    } catch { toast.error("Order failed. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <Link to="/cart" className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <MdArrowBack size={18} /> Back to Cart
        </Link>
        <h1 className="section-title mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-white mb-5">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="label-text">Full Name *</label><input name="name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className="input-field" /></div>
                <div><label className="label-text">Email *</label><input name="email" type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} className="input-field" /></div>
                <div><label className="label-text">Phone *</label><input name="phone" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} className="input-field" /></div>
                <div><label className="label-text">City</label><input name="city" value={form.city} onChange={e => setForm(f => ({...f, city: e.target.value}))} className="input-field" /></div>
                <div className="sm:col-span-2"><label className="label-text">Delivery Address</label><input name="address" value={form.address} onChange={e => setForm(f => ({...f, address: e.target.value}))} className="input-field" /></div>
              </div>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-white mb-5">Payment Method</h3>
              {[
                { value: "bank", label: "Bank Transfer", desc: "Transfer to our account, send receipt via WhatsApp" },
                { value: "pickup", label: "Pay on Pickup", desc: "Pay cash or POS at our Ikeja showroom" },
              ].map(({ value, label, desc }) => (
                <label key={value} className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all mb-3 ${form.payment === value ? "border-purple-400/40 bg-purple-500/10" : "border-white/10 hover:border-white/20"}`}>
                  <input type="radio" name="payment" value={value} checked={form.payment === value} onChange={e => setForm(f => ({...f, payment: e.target.value}))} className="mt-0.5 accent-purple-500" />
                  <div>
                    <p className="text-white font-medium text-sm">{label}</p>
                    <p className="text-white/40 text-xs">{desc}</p>
                  </div>
                </label>
              ))}
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><MdLock size={18} /> Place Order</>}
            </button>
          </form>
          <div className="glass-card p-6 h-fit">
            <h3 className="font-display font-semibold text-white mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {items.map(i => (
                <div key={i.id} className="flex justify-between text-sm">
                  <span className="text-white/60 truncate pr-2">{i.name} ×{i.quantity}</span>
                  <span className="text-white flex-shrink-0">{formatPrice(i.price * i.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-3">
              <div className="flex justify-between font-bold">
                <span className="text-white">Total</span>
                <span className="text-purple-300">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
