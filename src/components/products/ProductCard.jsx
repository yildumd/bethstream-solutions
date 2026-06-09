import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdShoppingCart, MdFavoriteBorder, MdFavorite,
  MdStar, MdVisibility, MdLocalOffer,
} from "react-icons/md";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../data/products";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { addItem, items } = useCart();
  const inCart = items.some(i => i.id === product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      category: product.category,
      brand: product.brand,
    });
    toast.success("Added to cart!", {
      style: { background: "#1a1a2e", color: "#fff", border: "1px solid rgba(124,58,237,0.3)" },
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="glass-card overflow-hidden group cursor-pointer hover:border-purple-400/30 transition-all duration-300 hover:shadow-card-hover"
    >
      <Link to={`/product/${product.slug || product.id}`}>
        {/* Image */}
        <div className="relative overflow-hidden bg-gradient-to-br from-white/5 to-white/2 aspect-square">
          {!imgError && product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-white/20 text-5xl">📷</div>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.new && (
              <span className="badge-lemon text-xs">NEW</span>
            )}
            {discount > 0 && (
              <span className="badge-purple text-xs">-{discount}%</span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
            className="absolute top-3 right-3 w-8 h-8 rounded-lg glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white/10"
          >
            {wishlisted
              ? <MdFavorite className="text-red-400" size={16} />
              : <MdFavoriteBorder className="text-white/60" size={16} />
            }
          </button>

          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
            <span className="flex items-center gap-1 text-white/80 text-xs bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
              <MdVisibility size={12} /> View Details
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-white/40 text-xs mb-1 uppercase tracking-wide font-medium">{product.brand}</p>
          <h3 className="text-white font-medium text-sm leading-tight mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <MdStar
                    key={i}
                    size={12}
                    className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-white/20"}
                  />
                ))}
              </div>
              <span className="text-white/40 text-xs">({product.reviews})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-purple-300 font-bold text-base">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-white/30 text-xs line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              inCart
                ? "bg-lemon-500/20 text-lemon-300 border border-lemon-500/30"
                : "bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/30 hover:border-purple-400/50"
            }`}
          >
            <MdShoppingCart size={16} />
            {inCart ? "In Cart" : "Add to Cart"}
          </button>
        </div>
      </Link>
    </motion.div>
  );
}
