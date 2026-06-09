import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdArrowBack } from "react-icons/md";
import { PRODUCT_CATEGORIES } from "../constants";
import { getProducts } from "../services/productService";
import ProductCard from "../components/products/ProductCard";
import { staggerContainer, staggerItem } from "../animations/variants";

export default function Categories() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSubcat, setActiveSubcat] = useState("all");

  const category = id ? PRODUCT_CATEGORIES.find(c => c.id === id) : null;

  useEffect(() => {
    getProducts(id ? { category: id } : {}).then(p => {
      setProducts(p);
      setLoading(false);
    });
  }, [id]);

  const filtered = activeSubcat === "all" ? products : products.filter(p => p.subcategory === activeSubcat);

  if (!id) return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="section-title mb-3">Product <span className="gradient-text">Categories</span></h1>
          <p className="text-white/50">Browse our full range of security and networking products.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCT_CATEGORIES.map(cat => (
            <Link key={cat.id} to={`/categories/${cat.id}`}>
              <motion.div whileHover={{ y: -4 }} className="glass-card overflow-hidden group">
                <div className="aspect-video overflow-hidden">
                  <img src={cat.image} alt={cat.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-white text-lg mb-1">{cat.label}</h3>
                  <p className="text-white/50 text-sm">{cat.subcategories.length} subcategories</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/categories" className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <MdArrowBack size={18} /> All Categories
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="section-title mb-3">{category?.label || "Products"}</h1>
          <p className="text-white/50">{filtered.length} products available</p>
        </motion.div>

        {category?.subcategories && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => setActiveSubcat("all")} className={`px-4 py-2 rounded-full text-sm transition-all ${activeSubcat === "all" ? "bg-purple-500/30 text-purple-300 border border-purple-400/30" : "glass border border-white/10 text-white/50 hover:text-white"}`}>All</button>
            {category.subcategories.map(s => (
              <button key={s} onClick={() => setActiveSubcat(s)} className={`px-4 py-2 rounded-full text-sm transition-all ${activeSubcat === s ? "bg-purple-500/30 text-purple-300 border border-purple-400/30" : "glass border border-white/10 text-white/50 hover:text-white"}`}>{s}</button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton aspect-square rounded-2xl" />)}
          </div>
        ) : (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(p => <motion.div key={p.id} variants={staggerItem}><ProductCard product={p} /></motion.div>)}
          </motion.div>
        )}
      </div>
    </div>
  );
}
