import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdArrowBack, MdUpload, MdDelete, MdSave,
  MdAddCircle, MdRemoveCircle,
} from "react-icons/md";
import { addProduct, updateProduct, getProduct } from "../../services/productService";
import { PRODUCT_CATEGORIES } from "../../constants";
import toast from "react-hot-toast";

const BLANK = {
  name: "", brand: "", category: "cctv", subcategory: "",
  price: "", originalPrice: "", stock: "", description: "",
  featured: false, new: false, tags: "",
  specs: [{ key: "", value: "" }],
};

export default function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [form, setForm] = useState(BLANK);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      getProduct(id).then(p => {
        if (p) {
          setForm({
            name: p.name || "",
            brand: p.brand || "",
            category: p.category || "cctv",
            subcategory: p.subcategory || "",
            price: p.price || "",
            originalPrice: p.originalPrice || "",
            stock: p.stock || "",
            description: p.description || "",
            featured: p.featured || false,
            new: p.new || false,
            tags: (p.tags || []).join(", "),
            specs: p.specs
              ? Object.entries(p.specs).map(([key, value]) => ({ key, value }))
              : [{ key: "", value: "" }],
          });
          setExistingImages(p.images || []);
        }
        setFetching(false);
      });
    }
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => [...prev, ...files]);
    const previews = files.map(f => URL.createObjectURL(f));
    setImagePreviews(prev => [...prev, ...previews]);
  };

  const removeNewImage = (idx) => {
    setImageFiles(f => f.filter((_, i) => i !== idx));
    setImagePreviews(p => p.filter((_, i) => i !== idx));
  };

  const removeExistingImage = (idx) => {
    setExistingImages(imgs => imgs.filter((_, i) => i !== idx));
  };

  const addSpec = () => setForm(f => ({ ...f, specs: [...f.specs, { key: "", value: "" }] }));
  const removeSpec = (i) => setForm(f => ({ ...f, specs: f.specs.filter((_, idx) => idx !== i) }));
  const updateSpec = (i, field, val) => {
    setForm(f => ({
      ...f,
      specs: f.specs.map((s, idx) => idx === i ? { ...s, [field]: val } : s),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      toast.error("Name and price are required");
      return;
    }
    setLoading(true);
    try {
      const specsObj = {};
      form.specs.forEach(({ key, value }) => { if (key) specsObj[key] = value; });

      const data = {
        ...form,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
        stock: form.stock ? Number(form.stock) : 0,
        tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
        specs: specsObj,
        images: existingImages,
      };

      if (isEdit) {
        await updateProduct(id, data);
        toast.success("Product updated!", {
          style: { background: "#1a1a2e", color: "#fff", border: "1px solid rgba(132,204,22,0.3)" },
        });
      } else {
        await addProduct(data, imageFiles);
        toast.success("Product added!", {
          style: { background: "#1a1a2e", color: "#fff", border: "1px solid rgba(132,204,22,0.3)" },
        });
      }
      navigate("/admin/products");
    } catch (err) {
      toast.error("Failed to save product");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentCategory = PRODUCT_CATEGORIES.find(c => c.id === form.category);

  if (fetching) return (
    <div className="p-8 space-y-4">
      {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-12 rounded-xl" />)}
    </div>
  );

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/products" className="p-2 rounded-xl glass text-white/50 hover:text-white transition-colors">
          <MdArrowBack size={20} />
        </Link>
        <div>
          <h1 className="font-display font-bold text-white text-2xl">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h1>
          <p className="text-white/40 text-sm">{isEdit ? "Update product information" : "Add a new product to the catalog"}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-white mb-5 text-sm uppercase tracking-wide">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="label-text">Product Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Hikvision DS-2CD2143G2-I 4MP Camera" className="input-field" />
            </div>
            <div>
              <label className="label-text">Brand</label>
              <input name="brand" value={form.brand} onChange={handleChange} placeholder="Hikvision" className="input-field" />
            </div>
            <div>
              <label className="label-text">Category *</label>
              <select name="category" value={form.category} onChange={handleChange} className="input-field">
                {PRODUCT_CATEGORIES.map(c => (
                  <option key={c.id} value={c.id} className="bg-[#1a1a2e]">{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-text">Subcategory</label>
              <select name="subcategory" value={form.subcategory} onChange={handleChange} className="input-field">
                <option value="" className="bg-[#1a1a2e]">Select subcategory...</option>
                {(currentCategory?.subcategories || []).map(s => (
                  <option key={s} value={s} className="bg-[#1a1a2e]">{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-text">Tags (comma-separated)</label>
              <input name="tags" value={form.tags} onChange={handleChange} placeholder="ip-camera, 4mp, outdoor" className="input-field" />
            </div>
            <div className="sm:col-span-2">
              <label className="label-text">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Full product description..." className="input-field resize-none" />
            </div>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-white mb-5 text-sm uppercase tracking-wide">Pricing & Stock</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="label-text">Price (₦) *</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="45000" className="input-field" />
            </div>
            <div>
              <label className="label-text">Original Price (₦)</label>
              <input name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} placeholder="55000" className="input-field" />
            </div>
            <div>
              <label className="label-text">Stock Quantity</label>
              <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="10" className="input-field" />
            </div>
          </div>
          <div className="flex gap-6 mt-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 accent-purple-500 rounded" />
              <span className="text-white/70 text-sm">Featured Product</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="new" checked={form.new} onChange={handleChange} className="w-4 h-4 accent-lemon-500 rounded" />
              <span className="text-white/70 text-sm">Mark as New</span>
            </label>
          </div>
        </div>

        {/* Images */}
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-white mb-5 text-sm uppercase tracking-wide">Product Images</h3>

          {/* Existing images */}
          {existingImages.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4">
              {existingImages.map((img, i) => (
                <div key={i} className="relative group w-20 h-20 rounded-xl overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(i)}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MdDelete className="text-red-400" size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* New image previews */}
          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4">
              {imagePreviews.map((src, i) => (
                <div key={i} className="relative group w-20 h-20 rounded-xl overflow-hidden">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeNewImage(i)}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MdDelete className="text-red-400" size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-dashed border-white/20 text-white/50 hover:border-purple-400/50 hover:text-purple-300 transition-all"
          >
            <MdUpload size={18} /> Upload Images
          </button>
          <input ref={fileRef} type="file" multiple accept="image/*" onChange={handleImages} className="hidden" />
        </div>

        {/* Specs */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wide">Technical Specifications</h3>
            <button type="button" onClick={addSpec} className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm transition-colors">
              <MdAddCircle size={18} /> Add Row
            </button>
          </div>
          <div className="space-y-3">
            {form.specs.map((spec, i) => (
              <div key={i} className="flex gap-3 items-center">
                <input
                  placeholder="Spec name (e.g. Resolution)"
                  value={spec.key}
                  onChange={e => updateSpec(i, "key", e.target.value)}
                  className="input-field flex-1"
                />
                <input
                  placeholder="Value (e.g. 4MP)"
                  value={spec.value}
                  onChange={e => updateSpec(i, "value", e.target.value)}
                  className="input-field flex-1"
                />
                {form.specs.length > 1 && (
                  <button type="button" onClick={() => removeSpec(i)} className="text-white/30 hover:text-red-400 transition-colors flex-shrink-0">
                    <MdRemoveCircle size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button type="submit" disabled={loading} className="btn-primary px-8 py-3.5">
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              <><MdSave size={18} /> {isEdit ? "Update Product" : "Add Product"}</>
            )}
          </button>
          <Link to="/admin/products" className="btn-secondary px-6 py-3.5">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
