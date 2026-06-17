import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdAdd, MdEdit, MdDelete, MdSearch, MdImage, MdStar } from "react-icons/md";
import { getProducts, deleteProduct } from "../../services/productService";
import { PRODUCT_CATEGORIES } from "../../constants";
import { formatPrice } from "../../data/products";
import toast from "react-hot-toast";

export default function AdminProducts() {
  const [products,  setProducts]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState("");
  const [category,  setCategory]  = useState("all");
  const [deleteId,  setDeleteId]  = useState(null);

  const load = () => {
    setLoading(true);
    getProducts().then(p => { setProducts(p); setLoading(false); });
  };
  useEffect(() => { load(); }, []);

  const filtered = products.filter(p => {
    const matchCat    = category === "all" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.brand || "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDelete = async () => {
    try {
      await deleteProduct(deleteId);
      toast.success("Product deleted");
      setDeleteId(null);
      load();
    } catch { toast.error("Delete failed"); }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-xl text-brand-slate">Products</h1>
          <p className="text-brand-gray text-sm">{products.length} items in catalog</p>
        </div>
        <Link to="/admin/products/new" className="btn-primary">
          <MdAdd size={18} /> Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input placeholder="Search products..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-9" />
        </div>
        <select value={category} onChange={e => setCategory(e.target.value)} className="input-field w-auto">
          <option value="all">All Categories</option>
          {PRODUCT_CATEGORIES.map(c => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton h-64 rounded-xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card py-16 text-center">
          <MdImage className="text-slate-200 mx-auto mb-3" size={40} />
          <p className="text-brand-gray text-sm">No products found</p>
          <Link to="/admin/products/new" className="btn-primary mt-4 inline-flex">
            <MdAdd size={16} /> Add your first product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map(product => (
              <motion.div key={product.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="card overflow-hidden group">
                {/* Image */}
                <div className="aspect-square bg-slate-50 relative overflow-hidden">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MdImage className="text-slate-200" size={36} />
                    </div>
                  )}
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex gap-1">
                    {product.featured && <span className="badge-blue text-[10px]">Featured</span>}
                    {product.new      && <span className="badge-green text-[10px]">New</span>}
                  </div>
                  {/* Action buttons on hover */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link to={`/admin/products/edit/${product.id}`}
                      className="w-8 h-8 bg-white rounded-lg shadow-card flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-colors">
                      <MdEdit size={15} />
                    </Link>
                    <button onClick={() => setDeleteId(product.id)}
                      className="w-8 h-8 bg-white rounded-lg shadow-card flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors">
                      <MdDelete size={15} />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-xs text-brand-gray mb-0.5">{product.brand}</p>
                  <p className="text-brand-slate text-sm font-medium line-clamp-2 leading-snug mb-2">
                    {product.name}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-brand-blue text-sm">{formatPrice(product.price)}</p>
                    <span className={`text-xs font-medium ${(product.stock || 0) > 5 ? "text-green-600" : (product.stock || 0) > 0 ? "text-amber-500" : "text-red-500"}`}>
                      {product.stock ?? 0} in stock
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="card p-8 max-w-sm w-full text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <MdDelete className="text-red-500" size={22} />
              </div>
              <h3 className="font-display font-bold text-brand-slate text-lg mb-2">Delete Product?</h3>
              <p className="text-brand-gray text-sm mb-6">This cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button onClick={handleDelete}
                  className="flex-1 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors">
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
