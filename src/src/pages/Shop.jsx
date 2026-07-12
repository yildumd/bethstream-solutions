import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MdSearch, MdTune } from "react-icons/md";
import ProductCard from "../components/products/ProductCard";
import { getProducts } from "../services/productService";
import { PRODUCT_CATEGORIES } from "../constants";

export default function Shop() {
  const [products,  setProducts]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState("");
  const [category,  setCategory]  = useState("all");
  const [sortBy,    setSortBy]    = useState("newest");
  const [maxPrice,  setMaxPrice]  = useState(1000000);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setCategory(cat);
    getProducts().then(p => { setProducts(p); setLoading(false); });
  }, []);

  const filtered = products
    .filter(p => category === "all" || p.category === category)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) ||
                 (p.brand || "").toLowerCase().includes(search.toLowerCase()))
    .filter(p => p.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === "price-asc")  return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating")     return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Page Header */}
      <div className="bg-white border-b border-brand-border py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display font-bold text-2xl text-brand-slate mb-1">All Products</h1>
          <p className="text-brand-gray text-sm">{filtered.length} products available</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input placeholder="Search products..." value={search}
              onChange={e => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input-field w-auto">
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[{ id: "all", label: "All Products" }, ...PRODUCT_CATEGORIES].map(cat => (
            <button key={cat.id} onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                category === cat.id
                  ? "bg-brand-blue text-white border-brand-blue"
                  : "bg-white text-brand-gray border-brand-border hover:border-brand-blue hover:text-brand-blue"
              }`}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Price filter */}
        <div className="card p-4 mb-6 flex items-center gap-4">
          <span className="text-sm text-brand-gray whitespace-nowrap">Max price:</span>
          <input type="range" min="0" max="1000000" step="10000" value={maxPrice}
            onChange={e => setMaxPrice(Number(e.target.value))}
            className="flex-1 accent-brand-blue" />
          <span className="text-sm font-semibold text-brand-slate whitespace-nowrap">
            ₦{maxPrice.toLocaleString()}
          </span>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton h-72 rounded-xl" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card py-16 text-center">
            <p className="text-brand-gray">No products match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
