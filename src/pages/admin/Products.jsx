import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdAdd, MdEdit, MdDelete, MdSearch, MdFilterList,
  MdImage, MdCheckCircle,
} from "react-icons/md";
import { getProducts, deleteProduct } from "../../services/productService";
import { PRODUCT_CATEGORIES } from "../../constants";
import { formatPrice } from "../../data/products";
import toast from "react-hot-toast";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [deleteId, setDeleteId] = useState(null);

  const load = () => {
    setLoading(true);
    getProducts().then(p => { setProducts(p); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const filtered = products.filter(p => {
    const matchCat = category === "all" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.brand || "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      setDeleteId(null);
      load();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-white text-2xl">Products</h1>
          <p className="text-white/40 text-sm">{products.length} items in catalog</p>
        </div>
        <Link to="/admin/products/new" className="btn-primary text-sm py-2.5 px-5">
          <MdAdd size={18} /> Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-11"
          />
        </div>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="input-field w-auto"
        >
          <option value="all" className="bg-[#1a1a2e]">All Categories</option>
          {PRODUCT_CATEGORIES.map(c => (
            <option key={c.id} value={c.id} className="bg-[#1a1a2e]">{c.label}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-16 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-5 py-4 text-white/40 text-xs uppercase tracking-wide font-medium">Product</th>
                  <th className="text-left px-5 py-4 text-white/40 text-xs uppercase tracking-wide font-medium">Category</th>
                  <th className="text-left px-5 py-4 text-white/40 text-xs uppercase tracking-wide font-medium">Price</th>
                  <th className="text-left px-5 py-4 text-white/40 text-xs uppercase tracking-wide font-medium">Stock</th>
                  <th className="text-left px-5 py-4 text-white/40 text-xs uppercase tracking-wide font-medium">Status</th>
                  <th className="text-right px-5 py-4 text-white/40 text-xs uppercase tracking-wide font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-white/30">
                        No products found
                      </td>
                    </tr>
                  ) : (
                    filtered.map(product => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-b border-white/5 hover:bg-white/3 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex-shrink-0 overflow-hidden">
                              {product.images?.[0] ? (
                                <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <MdImage className="text-white/20" size={16} />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-white text-sm font-medium line-clamp-1">{product.name}</p>
                              <p className="text-white/40 text-xs">{product.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="badge-purple capitalize">{product.subcategory || product.category}</span>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-purple-300 font-semibold text-sm">{formatPrice(product.price)}</p>
                          {product.originalPrice && (
                            <p className="text-white/30 text-xs line-through">{formatPrice(product.originalPrice)}</p>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-sm font-medium ${(product.stock || 0) > 5 ? "text-lemon-400" : (product.stock || 0) > 0 ? "text-yellow-400" : "text-red-400"}`}>
                            {product.stock ?? "–"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          {product.featured && <span className="badge-lemon mr-1">Featured</span>}
                          {product.new && <span className="badge-sky">New</span>}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/admin/products/edit/${product.id}`}
                              className="p-2 rounded-lg text-white/40 hover:text-sky-400 hover:bg-sky-500/10 transition-all"
                            >
                              <MdEdit size={16} />
                            </Link>
                            <button
                              onClick={() => setDeleteId(product.id)}
                              className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
                            >
                              <MdDelete size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass-card p-8 max-w-sm w-full text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-4">
                <MdDelete className="text-red-400" size={22} />
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">Delete Product?</h3>
              <p className="text-white/50 text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="btn-secondary flex-1 justify-center text-sm">Cancel</button>
                <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 font-semibold text-sm hover:bg-red-500/30 transition-all">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
