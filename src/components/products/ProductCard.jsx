import { useState } from "react";
import { Link } from "react-router-dom";
import { MdShoppingCart, MdStar, MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../data/products";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const { addItem, items } = useCart();
  const inCart = items.some(i => i.id === product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id, name: product.name, price: product.price,
      image: product.images?.[0], category: product.category, brand: product.brand,
    });
    toast.success("Added to cart");
  };

  return (
    <Link to={`/product/${product.slug || product.id}`}
      className="card-hover block group overflow-hidden">
      {/* Image */}
      <div className="relative bg-slate-50 aspect-square overflow-hidden rounded-t-xl">
        {!imgErr && product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
            onError={() => setImgErr(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-slate-200">
            📷
          </div>
        )}
        {/* Top badges */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          {product.new && (
            <span className="badge-blue text-[10px] font-bold px-2">NEW</span>
          )}
          {discount > 0 && (
            <span className="badge bg-red-500 text-white text-[10px] font-bold px-2">-{discount}%</span>
          )}
        </div>
        {/* Wishlist */}
        <button
          onClick={e => { e.preventDefault(); setWishlisted(!wishlisted); }}
          className="absolute top-2.5 right-2.5 w-8 h-8 bg-white rounded-full shadow-card flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          {wishlisted
            ? <MdFavorite className="text-red-400" size={16} />
            : <MdFavoriteBorder className="text-slate-400" size={16} />}
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-brand-gray font-medium mb-1">{product.brand}</p>
        <h3 className="text-brand-slate font-medium text-sm leading-snug mb-2 line-clamp-2 group-hover:text-brand-blue transition-colors">
          {product.name}
        </h3>

        {product.rating && (
          <div className="flex items-center gap-1 mb-2.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <MdStar key={i} size={12}
                className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-slate-200"} />
            ))}
            <span className="text-slate-400 text-xs ml-0.5">({product.reviews})</span>
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-brand-slate text-base">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-slate-400 text-xs line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <button
          onClick={handleAdd}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${
            inCart
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-brand-blueLight text-brand-blue hover:bg-brand-blue hover:text-white border border-brand-blue/20"
          }`}>
          <MdShoppingCart size={15} />
          {inCart ? "In Cart" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
}
