import { useState } from "react";
import { Link } from "react-router-dom";
import { MdWhatsapp, MdStar, MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { formatPrice } from "../../data/products";
import { COMPANY } from "../../constants";

export default function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [imgErr,     setImgErr]     = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Build WhatsApp message with product details
  const waMessage = encodeURIComponent(
    `Hi Bethstream Solutions! 👋\n\nI'm interested in purchasing:\n\n` +
    `*${product.name}*\n` +
    `Brand: ${product.brand || "N/A"}\n` +
    `Price: ${formatPrice(product.price)}\n\n` +
    `Please provide more details and availability. Thank you!`
  );
  const waLink = `https://wa.me/${COMPANY.whatsapp}?text=${waMessage}`;

  return (
    <div className="card-hover overflow-hidden group">
      {/* Image */}
      <Link to={`/product/${product.slug || product.id}`}>
        <div className="relative bg-slate-50 aspect-square overflow-hidden">
          {!imgErr && product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgErr(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl text-slate-200">
              📷
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex gap-1.5">
            {product.new && (
              <span className="badge-blue text-[10px] font-bold px-2">NEW</span>
            )}
            {discount > 0 && (
              <span className="badge bg-red-500 text-white text-[10px] font-bold px-2">
                -{discount}%
              </span>
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
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-brand-gray font-medium mb-1">{product.brand}</p>

        <Link to={`/product/${product.slug || product.id}`}>
          <h3 className="text-brand-slate font-medium text-sm leading-snug mb-2 line-clamp-2 hover:text-brand-blue transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <MdStar key={i} size={12}
                className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-slate-200"} />
            ))}
            <span className="text-slate-400 text-xs ml-0.5">({product.reviews})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-brand-slate text-base">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-slate-400 text-xs line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* WhatsApp Order Button */}
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold bg-green-500 hover:bg-green-600 text-white transition-colors">
          <MdWhatsapp size={17} />
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}
