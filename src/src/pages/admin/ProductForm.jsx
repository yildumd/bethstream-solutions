import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  MdArrowBack, MdCloudUpload, MdDelete, MdSave,
  MdAddCircleOutline, MdRemoveCircleOutline, MdImage,
  MdCheckCircle,
} from "react-icons/md";
import { addProduct, updateProduct, getProduct } from "../../services/productService";
import { PRODUCT_CATEGORIES } from "../../constants";
import toast from "react-hot-toast";

const BLANK = {
  name: "", brand: "", category: "cctv", subcategory: "",
  price: "", originalPrice: "", stock: "",
  description: "", featured: false, new: false, tags: "",
  specs: [{ key: "", value: "" }],
};

export default function ProductForm() {
  const { id }    = useParams();
  const isEdit    = Boolean(id);
  const navigate  = useNavigate();
  const dropRef   = useRef(null);
  const fileRef   = useRef(null);

  const [form,           setForm]           = useState(BLANK);
  const [imageFiles,     setImageFiles]     = useState([]);
  const [previews,       setPreviews]       = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading,        setLoading]        = useState(false);
  const [fetching,       setFetching]       = useState(isEdit);
  const [dragOver,       setDragOver]       = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    getProduct(id).then(p => {
      if (!p) { setFetching(false); return; }
      setForm({
        name: p.name || "", brand: p.brand || "",
        category: p.category || "cctv", subcategory: p.subcategory || "",
        price: p.price || "", originalPrice: p.originalPrice || "",
        stock: p.stock || "", description: p.description || "",
        featured: p.featured || false, new: p.new || false,
        tags: (p.tags || []).join(", "),
        specs: p.specs
          ? Object.entries(p.specs).map(([key, value]) => ({ key, value }))
          : [{ key: "", value: "" }],
      });
      setExistingImages(p.images || []);
      setFetching(false);
    });
  }, [id]);

  const addImages = (files) => {
    const valid = Array.from(files).filter(f => f.type.startsWith("image/"));
    setImageFiles(prev => [...prev, ...valid]);
    valid.forEach(f => {
      const reader = new FileReader();
      reader.onload = e => setPreviews(prev => [...prev, e.target.result]);
      reader.readAsDataURL(f);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addImages(e.dataTransfer.files);
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const addSpec    = () => setForm(f => ({ ...f, specs: [...f.specs, { key: "", value: "" }] }));
  const removeSpec = i  => setForm(f => ({ ...f, specs: f.specs.filter((_, idx) => idx !== i) }));
  const updateSpec = (i, field, val) =>
    setForm(f => ({ ...f, specs: f.specs.map((s, idx) => idx === i ? { ...s, [field]: val } : s) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) { toast.error("Name and price are required"); return; }
    setLoading(true);
    try {
      const specsObj = {};
      form.specs.forEach(({ key, value }) => { if (key.trim()) specsObj[key.trim()] = value; });
      const data = {
        ...form,
        price:         Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
        stock:         form.stock ? Number(form.stock) : 0,
        tags:          form.tags.split(",").map(t => t.trim()).filter(Boolean),
        specs:         specsObj,
        images:        existingImages,
      };
      if (isEdit) {
        await updateProduct(id, data);
        toast.success("Product updated successfully!");
      } else {
        await addProduct(data, imageFiles);
        toast.success("Product added successfully!");
      }
      navigate("/admin/products");
    } catch (err) {
      toast.error("Failed to save. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentCat = PRODUCT_CATEGORIES.find(c => c.id === form.category);

  if (fetching) return (
    <div className="p-8 space-y-4 max-w-3xl">
      {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-12 rounded-xl" style={{ width: `${70 + i * 5}%` }} />)}
    </div>
  );

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link to="/admin/products"
          className="p-2 rounded-lg border border-brand-border hover:bg-slate-100 text-brand-gray transition-colors">
          <MdArrowBack size={18} />
        </Link>
        <div>
          <h1 className="font-display font-bold text-xl text-brand-slate">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h1>
          <p className="text-brand-gray text-sm">
            {isEdit ? "Update product information" : "Fill in the details and upload images"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ── IMAGE UPLOAD (Prominent) ── */}
        <div className="card p-6">
          <h3 className="font-semibold text-brand-slate text-sm mb-4 flex items-center gap-2">
            <MdImage size={18} className="text-brand-blue" />
            Product Images
          </h3>

          {/* Drop zone */}
          <div
            ref={dropRef}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all mb-4 ${
              dragOver
                ? "border-brand-blue bg-brand-blueLight"
                : "border-slate-200 hover:border-brand-blue hover:bg-brand-blueLight/50"
            }`}>
            <MdCloudUpload size={36} className={`mx-auto mb-3 ${dragOver ? "text-brand-blue" : "text-slate-300"}`} />
            <p className="text-brand-slate font-semibold text-sm mb-1">
              Drop images here or <span className="text-brand-blue">click to browse</span>
            </p>
            <p className="text-slate-400 text-xs">JPG, PNG, WEBP — multiple images supported</p>
            <input ref={fileRef} type="file" multiple accept="image/*"
              onChange={e => addImages(e.target.files)} className="hidden" />
          </div>

          {/* Image previews */}
          {(existingImages.length > 0 || previews.length > 0) && (
            <div className="flex flex-wrap gap-3">
              {existingImages.map((img, i) => (
                <div key={`ex-${i}`} className="relative group w-24 h-24 rounded-lg overflow-hidden border border-brand-border">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button type="button"
                    onClick={() => setExistingImages(arr => arr.filter((_, idx) => idx !== i))}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <MdDelete className="text-white" size={20} />
                  </button>
                  <span className="absolute bottom-1 left-1 text-[9px] bg-green-500 text-white px-1.5 py-0.5 rounded font-medium">Saved</span>
                </div>
              ))}
              {previews.map((src, i) => (
                <div key={`new-${i}`} className="relative group w-24 h-24 rounded-lg overflow-hidden border border-brand-border">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button type="button"
                    onClick={() => {
                      setPreviews(a => a.filter((_, idx) => idx !== i));
                      setImageFiles(a => a.filter((_, idx) => idx !== i));
                    }}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <MdDelete className="text-white" size={20} />
                  </button>
                  <span className="absolute bottom-1 left-1 text-[9px] bg-brand-blue text-white px-1.5 py-0.5 rounded font-medium">New</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── BASIC INFO ── */}
        <div className="card p-6">
          <h3 className="font-semibold text-brand-slate text-sm mb-4">Product Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="label-text">Product Name *</label>
              <input name="name" value={form.name} onChange={handleChange}
                placeholder="e.g. Hikvision DS-2CD2143G2-I 4MP IP Camera"
                className="input-field" />
            </div>
            <div>
              <label className="label-text">Brand</label>
              <input name="brand" value={form.brand} onChange={handleChange}
                placeholder="Hikvision" className="input-field" />
            </div>
            <div>
              <label className="label-text">Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="input-field">
                {PRODUCT_CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-text">Subcategory</label>
              <select name="subcategory" value={form.subcategory} onChange={handleChange} className="input-field">
                <option value="">Select subcategory...</option>
                {(currentCat?.subcategories || []).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-text">Tags (comma-separated)</label>
              <input name="tags" value={form.tags} onChange={handleChange}
                placeholder="ip-camera, 4mp, outdoor" className="input-field" />
            </div>
            <div className="sm:col-span-2">
              <label className="label-text">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange}
                rows={4} placeholder="Describe this product..."
                className="input-field resize-none" />
            </div>
          </div>
        </div>

        {/* ── PRICING ── */}
        <div className="card p-6">
          <h3 className="font-semibold text-brand-slate text-sm mb-4">Pricing & Stock</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="label-text">Selling Price (₦) *</label>
              <input name="price" type="number" value={form.price} onChange={handleChange}
                placeholder="45000" className="input-field" />
            </div>
            <div>
              <label className="label-text">Original Price (₦)</label>
              <input name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange}
                placeholder="55000 (for discount)" className="input-field" />
            </div>
            <div>
              <label className="label-text">Stock Quantity</label>
              <input name="stock" type="number" value={form.stock} onChange={handleChange}
                placeholder="10" className="input-field" />
            </div>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange}
                className="w-4 h-4 accent-brand-blue rounded" />
              <span className="text-sm text-brand-slate">Show on Homepage (Featured)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="new" checked={form.new} onChange={handleChange}
                className="w-4 h-4 accent-brand-blue rounded" />
              <span className="text-sm text-brand-slate">Mark as New Arrival</span>
            </label>
          </div>
        </div>

        {/* ── SPECS ── */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-brand-slate text-sm">
              Technical Specifications
              <span className="text-slate-400 font-normal ml-2">(optional)</span>
            </h3>
            <button type="button" onClick={addSpec}
              className="flex items-center gap-1 text-brand-blue text-sm hover:underline">
              <MdAddCircleOutline size={16} /> Add row
            </button>
          </div>
          <div className="space-y-2.5">
            {form.specs.map((spec, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  placeholder="Spec (e.g. Resolution)"
                  value={spec.key}
                  onChange={e => updateSpec(i, "key", e.target.value)}
                  className="input-field flex-1" />
                <input
                  placeholder="Value (e.g. 4MP)"
                  value={spec.value}
                  onChange={e => updateSpec(i, "value", e.target.value)}
                  className="input-field flex-1" />
                {form.specs.length > 1 && (
                  <button type="button" onClick={() => removeSpec(i)}
                    className="text-slate-300 hover:text-red-400 transition-colors flex-shrink-0">
                    <MdRemoveCircleOutline size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pb-8">
          <button type="submit" disabled={loading} className="btn-primary px-8 py-3">
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              <><MdSave size={18} /> {isEdit ? "Update Product" : "Publish Product"}</>
            )}
          </button>
          <Link to="/admin/products" className="btn-secondary px-6 py-3">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
