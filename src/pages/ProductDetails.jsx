import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdStar, MdShoppingCart, MdArrowBack, MdWhatsapp,
  MdVerified, MdLocalShipping, MdSupportAgent,
} from "react-icons/md";
import { getProduct, getProducts } from "../services/productService";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/products/ProductCard";
import { formatPrice } from "../data/products";
import { COMPANY } from "../constants";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const { addItem, items } = useCart();
  const inCart = items.some(i => i.id === product?.id);

  useEffect(() => {
    getProduct(id).then(async (p) => {
      setProduct(p);
      setLoading(false);
      if (p) {
        const rel = await getProducts({ category: p.category, limit: 4 });
        setRelated(rel.filter(r => r.id !== p.id).slice(0, 4));
      }
    });
  }, [id]);

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.images?.[0], category: product.category, brand: product.brand });
    toast.success("Added to cart!", { style: { background: "#1a1a2e", color: "#fff", border: "1px solid rgba(124,58,237,0.3)" } });
  };

  if (loading) return (
    <div className="min-h-screen pt-28 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="skeleton aspect-square rounded-2xl" />
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-8 rounded-xl" style={{ width: `${60 + i * 5}%` }} />)}
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen pt-28 flex items-center justify-center">
      <div className="text-center">
        <p className="text-white/40 text-xl mb-4">Product not found</p>
        <Link to="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    </div>
  );

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-white/60 truncate max-w-xs">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <div className="relative aspect-square glass-card overflow-hidden mb-4 rounded-2xl">
              <img
                src={product.images?.[activeImg] || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 badge-purple">-{discount}%</div>
              )}
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${i === activeImg ? "border-purple-400" : "border-white/10"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="badge-purple mb-3">{product.subcategory || product.category}</p>
            <h1 className="font-display font-bold text-3xl text-white mb-2">{product.name}</h1>
            <p className="text-white/40 text-sm mb-4">Brand: <span className="text-white/70">{product.brand}</span></p>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <MdStar key={i} size={16} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-white/20"} />
                  ))}
                </div>
                <span className="text-white/50 text-sm">{product.rating} ({product.reviews} reviews)</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-purple-300 font-display font-bold text-4xl">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-white/30 text-xl line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-8">{product.description}</p>

            {/* Qty & Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center glass rounded-xl overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-3 text-white/60 hover:text-white transition-colors hover:bg-white/5">−</button>
                <span className="px-5 py-3 text-white font-medium">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-4 py-3 text-white/60 hover:text-white transition-colors hover:bg-white/5">+</button>
              </div>
              <button
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${inCart ? "bg-lemon-500/20 text-lemon-300 border border-lemon-500/30" : "btn-primary"}`}
              >
                <MdShoppingCart size={20} />
                {inCart ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${COMPANY.whatsapp}?text=Hi, I'm interested in ${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 font-semibold hover:bg-green-500/20 transition-all mb-8"
            >
              <MdWhatsapp size={20} /> Enquire on WhatsApp
            </a>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: MdVerified, label: "Genuine Product" },
                { icon: MdLocalShipping, label: "Fast Delivery" },
                { icon: MdSupportAgent, label: "Expert Support" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="glass rounded-xl p-3 text-center">
                  <Icon className="text-purple-400 mx-auto mb-1" size={20} />
                  <p className="text-white/50 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specs Table */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="glass-card p-8 mb-16">
            <h2 className="font-display font-bold text-white text-xl mb-6">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-xl overflow-hidden">
              {Object.entries(product.specs).map(([k, v], i) => (
                <div key={k} className="flex gap-4 bg-[#0f0f1a] p-4">
                  <span className="text-white/40 text-sm w-40 flex-shrink-0">{k}</span>
                  <span className="text-white text-sm font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display font-bold text-white text-2xl mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
