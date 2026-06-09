import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdTune, MdSearch, MdGridView, MdViewList, MdClose,
} from "react-icons/md";
import ProductCard from "../components/products/ProductCard";
import { getProducts } from "../services/productService";
import { PRODUCT_CATEGORIES } from "../constants";

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [gridView, setGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
    getProducts().then(p => { setProducts(p); setLoading(false); });
  }, []);

  useEffect(() => {
    let result = [...products];
    if (selectedCategory !== "all") result = result.filter(p => p.category === selectedCategory);
    if (searchQuery) result = result.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    setFiltered(result);
  }, [products, searchQuery, selectedCategory, sortBy, priceRange]);

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="section-title mb-2">Shop <span className="gradient-text">Products</span></h1>
          <p className="text-white/50">Showing {filtered.length} products</p>
        </div>

        {/* Search & Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <input
              type="text"
              placeholder="Search products, brands..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input-field pl-11"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="input-field w-auto px-4"
            >
              {sortOptions.map(o => <option key={o.value} value={o.value} className="bg-[#1a1a2e]">{o.label}</option>)}
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${showFilters ? "bg-purple-500/20 border-purple-400/30 text-purple-300" : "glass border-white/10 text-white/70 hover:text-white"}`}
            >
              <MdTune size={18} /> Filters
            </button>
            <div className="flex rounded-xl overflow-hidden border border-white/10">
              <button onClick={() => setGridView(true)} className={`p-3 transition-colors ${gridView ? "bg-purple-500/20 text-purple-300" : "text-white/40 hover:text-white"}`}>
                <MdGridView size={18} />
              </button>
              <button onClick={() => setGridView(false)} className={`p-3 transition-colors ${!gridView ? "bg-purple-500/20 text-purple-300" : "text-white/40 hover:text-white"}`}>
                <MdViewList size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-64 flex-shrink-0 space-y-6"
            >
              {/* Category Filter */}
              <div className="glass-card p-5">
                <h3 className="font-display font-semibold text-white text-sm mb-4">Category</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all ${selectedCategory === "all" ? "bg-purple-500/20 text-purple-300" : "text-white/50 hover:text-white hover:bg-white/5"}`}
                  >
                    All Products
                  </button>
                  {PRODUCT_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all ${selectedCategory === cat.id ? "bg-purple-500/20 text-purple-300" : "text-white/50 hover:text-white hover:bg-white/5"}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="glass-card p-5">
                <h3 className="font-display font-semibold text-white text-sm mb-4">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="10000"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-purple-500"
                />
                <div className="flex justify-between text-white/40 text-xs mt-2">
                  <span>₦0</span>
                  <span>Up to ₦{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </motion.aside>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === "all" ? "bg-purple-500/30 text-purple-300 border border-purple-400/30" : "glass border border-white/10 text-white/50 hover:text-white"}`}
              >
                All
              </button>
              {PRODUCT_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat.id ? "bg-purple-500/30 text-purple-300 border border-purple-400/30" : "glass border border-white/10 text-white/50 hover:text-white"}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="skeleton aspect-square rounded-2xl" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white/30 text-lg mb-2">No products found</p>
                <p className="text-white/20 text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${gridView ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
                {filtered.map(p => (
                  <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
