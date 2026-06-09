import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdDelete, MdShoppingBag, MdArrowForward } from "react-icons/md";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";

export default function Cart() {
  const { items, total, removeItem, updateQty, clearCart } = useCart();

  if (items.length === 0) return (
    <div className="min-h-screen pt-28 flex items-center justify-center">
      <div className="text-center">
        <MdShoppingBag className="text-white/20 mx-auto mb-4" size={64} />
        <h2 className="font-display font-bold text-white text-2xl mb-2">Your Cart is Empty</h2>
        <p className="text-white/40 mb-6">Browse our products and add items to your cart.</p>
        <Link to="/shop" className="btn-primary">Shop Now</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="section-title">Shopping <span className="gradient-text">Cart</span></h1>
          <button onClick={clearCart} className="text-white/40 hover:text-red-400 text-sm transition-colors">Clear Cart</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass-card p-5 flex gap-4"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-white/5">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">📷</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/40 text-xs mb-1">{item.brand}</p>
                    <h3 className="text-white font-medium text-sm truncate">{item.name}</h3>
                    <p className="text-purple-300 font-semibold mt-1">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <button onClick={() => removeItem(item.id)} className="text-white/30 hover:text-red-400 transition-colors">
                      <MdDelete size={18} />
                    </button>
                    <div className="flex items-center glass rounded-lg overflow-hidden text-sm">
                      <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-2.5 py-1.5 text-white/60 hover:text-white hover:bg-white/5">−</button>
                      <span className="px-3 py-1.5 text-white">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-2.5 py-1.5 text-white/60 hover:text-white hover:bg-white/5">+</button>
                    </div>
                    <p className="text-white/60 text-sm">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="glass-card p-6 h-fit sticky top-24">
            <h3 className="font-display font-semibold text-white text-lg mb-5">Order Summary</h3>
            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Subtotal ({items.length} items)</span>
                <span className="text-white">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Shipping</span>
                <span className="text-lemon-400">Calculated at checkout</span>
              </div>
            </div>
            <div className="border-t border-white/10 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="font-semibold text-white">Total</span>
                <span className="font-bold text-purple-300 text-xl">{formatPrice(total)}</span>
              </div>
            </div>
            <Link to="/checkout" className="btn-primary w-full justify-center">
              Checkout <MdArrowForward size={18} />
            </Link>
            <Link to="/shop" className="btn-secondary w-full justify-center mt-3 text-sm">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
