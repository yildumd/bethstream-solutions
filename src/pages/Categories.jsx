import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdArrowBack, MdArrowForward, MdRouter, MdVideocam, MdStorage, MdSdCard, MdCable } from "react-icons/md";
import { PRODUCT_CATEGORIES } from "../constants";
import { getProducts } from "../services/productService";
import ProductCard from "../components/products/ProductCard";

const icons = {
  networking:  MdRouter,
  cctv:        MdVideocam,
  accessories: MdCable,
  recorders:  MdStorage,
  storage:    MdSdCard,
};

export default function Categories() {
  const { id } = useParams();
  const [products,      setProducts]      = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [activeSubcat,  setActiveSubcat]  = useState("all");

  const category = id ? PRODUCT_CATEGORIES.find(c => c.id === id) : null;

  useEffect(() => {
    setLoading(true);
    setActiveSubcat("all");
    getProducts(id ? { category: id } : {}).then(p => {
      setProducts(p);
      setLoading(false);
    });
  }, [id]);

  const filtered = activeSubcat === "all"
    ? products
    : products.filter(p => p.subcategory === activeSubcat);

  // ── ALL CATEGORIES VIEW ──
  if (!id) return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <div className="bg-white border-b border-brand-border py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-blue inline-block mb-4">Browse</span>
            <h1 className="font-display font-bold text-4xl text-brand-slate mb-3">
              Product Categories
            </h1>
            <p className="text-brand-gray text-lg">
              Everything you need for a complete security and networking setup.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCT_CATEGORIES.map((cat, i) => {
            const Icon = icons[cat.id] || MdRouter;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}>
                <Link to={`/categories/${cat.id}`}
                  className="card-hover block group overflow-hidden">
                  {/* Image */}
                  <div className="aspect-video overflow-hidden bg-slate-100">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-brand-blueLight flex items-center justify-center flex-shrink-0">
                        <Icon className="text-brand-blue" size={18} />
                      </div>
                      <h3 className="font-display font-bold text-brand-slate text-base">
                        {cat.label}
                      </h3>
                    </div>
                    <p className="text-brand-gray text-sm mb-3 line-clamp-2">
                      {cat.description}
                    </p>
                    <div className="space-y-1 mb-4">
                      {cat.subcategories.map(s => (
                        <p key={s} className="text-slate-500 text-xs flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                          {s}
                        </p>
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-brand-blue text-sm font-semibold group-hover:gap-2 transition-all">
                      Browse Products <MdArrowForward size={15} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ── SINGLE CATEGORY VIEW ──
  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <div className="bg-white border-b border-brand-border py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Link to="/categories"
            className="flex items-center gap-2 text-brand-gray hover:text-brand-blue text-sm mb-5 transition-colors w-fit">
            <MdArrowBack size={16} /> All Categories
          </Link>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display font-bold text-3xl text-brand-slate mb-1">
              {category?.label || "Products"}
            </h1>
            <p className="text-brand-gray text-sm">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""} available
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subcategory filter tabs */}
        {category?.subcategories && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveSubcat("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                activeSubcat === "all"
                  ? "bg-brand-blue text-white border-brand-blue"
                  : "bg-white text-brand-gray border-brand-border hover:border-brand-blue hover:text-brand-blue"
              }`}>
              All
            </button>
            {category.subcategories.map(s => (
              <button
                key={s}
                onClick={() => setActiveSubcat(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  activeSubcat === s
                    ? "bg-brand-blue text-white border-brand-blue"
                    : "bg-white text-brand-gray border-brand-border hover:border-brand-blue hover:text-brand-blue"
                }`}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Products */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton h-72 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card py-16 text-center">
            <p className="text-brand-gray mb-2">No products found in this category yet.</p>
            <Link to="/contact" className="btn-primary mt-4 inline-flex">
              Ask Us Directly
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}