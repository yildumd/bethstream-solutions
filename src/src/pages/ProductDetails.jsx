import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdStar, MdArrowBack, MdWhatsapp, MdPhone,
  MdVerified, MdLocalShipping, MdSupportAgent,
} from "react-icons/md";
import { getProduct, getProducts } from "../services/productService";
import { formatPrice } from "../data/products";
import { COMPANY } from "../constants";
import ProductCard from "../components/products/ProductCard";

export default function ProductDetails() {
  const { id } = useParams();
  const [product,  setProduct]  = useState(null);
  const [related,  setRelated]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setLoading(true);
    getProduct(id).then(async (p) => {
      setProduct(p);
      setLoading(false);
      if (p) {
        const rel = await getProducts({ category: p.category, limit: 4 });
        setRelated(rel.filter(r => r.id !== p.id).slice(0, 4));
      }
    });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-brand-bg pt-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="skeleton aspect-square rounded-xl" />
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-8 rounded-lg" style={{ width: `${65 + i * 5}%` }} />
          ))}
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center">
      <div className="text-center">
        <p className="text-brand-gray text-lg mb-4">Product not found</p>
        <Link to="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    </div>
  );

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // WhatsApp message
  const waMessage = encodeURIComponent(
    `Hi Bethstream Solutions! 👋\n\nI'm interested in purchasing:\n\n` +
    `*${product.name}*\n` +
    `Brand: ${product.brand || "N/A"}\n` +
    `Price: ${formatPrice(product.price)}\n\n` +
    `Please confirm availability and how to proceed. Thank you!`
  );
  const waLink = `https://wa.me/${COMPANY.whatsapp}?text=${waMessage}`;

  return (
    <div className="min-h-screen bg-brand-bg">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-brand-border py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-brand-gray">
          <Link to="/"    className="hover:text-brand-blue transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-brand-blue transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-brand-slate truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* Images */}
          <div>
            <div className="relative aspect-square bg-white rounded-xl overflow-hidden border border-brand-border mb-3">
              <img
                src={product.images?.[activeImg] || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 badge bg-red-500 text-white font-bold">
                  -{discount}% OFF
                </div>
              )}
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`w-18 h-18 rounded-lg overflow-hidden border-2 transition-all ${
                      i === activeImg ? "border-brand-blue" : "border-brand-border hover:border-slate-300"
                    }`}
                    style={{ width: 72, height: 72 }}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <span className="badge-blue mb-3 inline-block">
              {product.subcategory || product.category}
            </span>
            <h1 className="font-display font-bold text-2xl md:text-3xl text-brand-slate mb-2">
              {product.name}
            </h1>
            <p className="text-brand-gray text-sm mb-4">
              Brand: <span className="text-brand-slate font-medium">{product.brand}</span>
            </p>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <MdStar key={i} size={16}
                      className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-slate-200"} />
                  ))}
                </div>
                <span className="text-brand-gray text-sm">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-display font-bold text-4xl text-brand-slate">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-slate-400 text-xl line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Stock */}
            {product.stock > 0 ? (
              <p className="text-green-600 text-sm font-medium mb-4">✓ In Stock ({product.stock} units)</p>
            ) : (
              <p className="text-red-500 text-sm font-medium mb-4">Out of Stock — Contact us for availability</p>
            )}

            <p className="text-brand-gray text-sm leading-relaxed mb-8">{product.description}</p>

            {/* WhatsApp Order Button — Primary CTA */}
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-base transition-colors mb-3">
              <MdWhatsapp size={24} />
              Order on WhatsApp
            </a>

            {/* Call button */}
            <a
              href={`tel:${COMPANY.phones[0]}`}
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border-2 border-brand-border hover:border-brand-blue text-brand-slate hover:text-brand-blue font-semibold transition-all mb-8">
              <MdPhone size={20} />
              Call to Order: {COMPANY.phones[0]}
            </a>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: MdVerified,      label: "Genuine Product" },
                { icon: MdLocalShipping, label: "Fast Delivery" },
                { icon: MdSupportAgent,  label: "Expert Support" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="card p-3 text-center">
                  <Icon className="text-brand-blue mx-auto mb-1.5" size={20} />
                  <p className="text-brand-gray text-xs font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specs Table */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="card p-8 mb-16">
            <h2 className="font-display font-bold text-brand-slate text-xl mb-6">
              Technical Specifications
            </h2>
            <div className="divide-y divide-brand-border">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex gap-4 py-3">
                  <span className="text-brand-gray text-sm w-44 flex-shrink-0">{key}</span>
                  <span className="text-brand-slate text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display font-bold text-brand-slate text-2xl mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
