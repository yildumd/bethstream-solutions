import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdArrowBack, MdCheckCircle, MdLock, MdWhatsapp } from "react-icons/md";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { formatPrice } from "../data/products";
import { COMPANY } from "../constants";
import toast from "react-hot-toast";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [done, setDone]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm]       = useState({
    name: "", email: "", phone: "", address: "", city: "", payment: "bank",
  });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  if (items.length === 0 && !done) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg">
      <div className="text-center">
        <p className="text-brand-gray mb-4">Your cart is empty</p>
        <Link to="/shop" className="btn-primary">Browse Products</Link>
      </div>
    </div>
  );

  if (done) return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
          <MdCheckCircle className="text-green-500" size={32} />
        </div>
        <h2 className="font-display font-bold text-brand-slate text-2xl mb-3">Order Received!</h2>
        <p className="text-brand-gray text-sm mb-6">
          Thank you! We will call or WhatsApp you within a few hours to confirm your order and arrange delivery or pickup.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left">
          <p className="text-xs text-brand-gray mb-1">Order placed by</p>
          <p className="font-semibold text-brand-slate text-sm">{form.name}</p>
          <p className="text-brand-gray text-xs">{form.phone}</p>
        </div>
        <a
          href={`https://wa.me/${COMPANY.whatsapp}?text=Hi, I just placed an order on your website. My name is ${encodeURIComponent(form.name)}, phone ${form.phone}`}
          target="_blank" rel="noreferrer"
          className="btn-green w-full justify-center mb-3">
          <MdWhatsapp size={18} /> Follow Up on WhatsApp
        </a>
        <Link to="/" className="btn-secondary w-full justify-center text-sm">Back to Home</Link>
      </motion.div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please enter your name and phone number");
      return;
    }
    setLoading(true);
    try {
      await createOrder({ ...form, items, total });
      clearCart();
      setDone(true);
    } catch {
      toast.error("Something went wrong. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/cart"
          className="flex items-center gap-2 text-brand-gray hover:text-brand-blue text-sm mb-6 transition-colors">
          <MdArrowBack size={16} /> Back to Cart
        </Link>

        <h1 className="font-display font-bold text-2xl text-brand-slate mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
            {/* Contact */}
            <div className="card p-6">
              <h3 className="font-semibold text-brand-slate mb-5">Your Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-text">Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange}
                    placeholder="John Okafor" className="input-field" />
                </div>
                <div>
                  <label className="label-text">Phone Number *</label>
                  <input name="phone" value={form.phone} onChange={handleChange}
                    placeholder="080XXXXXXXX" className="input-field" />
                </div>
                <div>
                  <label className="label-text">Email Address</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="john@example.com (optional)" className="input-field" />
                </div>
                <div>
                  <label className="label-text">City</label>
                  <input name="city" value={form.city} onChange={handleChange}
                    placeholder="Lagos" className="input-field" />
                </div>
                <div className="sm:col-span-2">
                  <label className="label-text">Delivery Address</label>
                  <input name="address" value={form.address} onChange={handleChange}
                    placeholder="Full address for delivery (optional if picking up)" className="input-field" />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="card p-6">
              <h3 className="font-semibold text-brand-slate mb-5">Payment Method</h3>
              <div className="space-y-3">
                {[
                  { value: "bank",    label: "Bank Transfer",    desc: "Transfer to our account, send receipt via WhatsApp" },
                  { value: "pickup",  label: "Pay on Pickup",    desc: "Pay cash or POS when you collect from our Ikeja office" },
                  { value: "delivery",label: "Pay on Delivery",  desc: "Pay cash or POS when we deliver to you (Lagos only)" },
                ].map(({ value, label, desc }) => (
                  <label key={value}
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      form.payment === value
                        ? "border-brand-blue bg-brand-blueLight"
                        : "border-brand-border hover:border-slate-300"
                    }`}>
                    <input type="radio" name="payment" value={value}
                      checked={form.payment === value}
                      onChange={handleChange}
                      className="mt-0.5 accent-brand-blue" />
                    <div>
                      <p className="text-brand-slate font-semibold text-sm">{label}</p>
                      <p className="text-brand-gray text-xs mt-0.5">{desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              {form.payment === "bank" && (
                <div className="mt-4 bg-slate-50 rounded-xl p-4 text-sm">
                  <p className="font-semibold text-brand-slate mb-2">Bank Account Details</p>
                  <p className="text-brand-gray">Bank: <span className="text-brand-slate font-medium">GTBank</span></p>
                  <p className="text-brand-gray">Account Name: <span className="text-brand-slate font-medium">Bethstream Solutions</span></p>
                  <p className="text-brand-gray">Account Number: <span className="text-brand-slate font-medium">0123456789</span></p>
                  <p className="text-xs text-brand-gray mt-2">After transfer, send your receipt to our WhatsApp to confirm your order.</p>
                </div>
              )}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 text-base">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Placing Order...
                </span>
              ) : (
                <><MdLock size={18} /> Place Order</>
              )}
            </button>
          </form>

          {/* Summary */}
          <div className="card p-6 h-fit sticky top-24">
            <h3 className="font-semibold text-brand-slate mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                    {item.image
                      ? <img src={item.image} alt="" className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-xl">📷</div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-brand-slate text-xs font-medium line-clamp-2">{item.name}</p>
                    <p className="text-brand-gray text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-brand-slate text-xs font-semibold flex-shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-brand-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-brand-gray">Subtotal</span>
                <span className="text-brand-slate">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-gray">Delivery</span>
                <span className="text-brand-slate">To be confirmed</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t border-brand-border">
                <span className="text-brand-slate">Total</span>
                <span className="text-brand-blue text-lg">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}