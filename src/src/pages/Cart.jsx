import { Link } from "react-router-dom";
import { MdWhatsapp, MdPhone, MdArrowBack } from "react-icons/md";
import { COMPANY } from "../constants";
import { formatPrice } from "../data/products";

export default function Cart() {
  // Build a WhatsApp message for enquiring about multiple products
  const waMessage = encodeURIComponent(
    `Hi Bethstream Solutions! 👋\n\nI'd like to enquire about your products and pricing.\n\nPlease help me place an order. Thank you!`
  );

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <div className="card p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
          <MdWhatsapp className="text-green-500" size={32} />
        </div>
        <h2 className="font-display font-bold text-brand-slate text-2xl mb-3">
          Ready to Order?
        </h2>
        <p className="text-brand-gray text-sm mb-6">
          Browse our products and tap <strong className="text-brand-slate">"Order on WhatsApp"</strong> on any item.
          Our team will respond quickly with availability, pricing, and delivery details.
        </p>

        <div className="space-y-3 mb-8">
          <a
            href={`https://wa.me/${COMPANY.whatsapp}?text=${waMessage}`}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition-colors">
            <MdWhatsapp size={22} /> Chat on WhatsApp
          </a>
          <a
            href={`tel:${COMPANY.phones[0]}`}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border-2 border-brand-border hover:border-brand-blue text-brand-slate hover:text-brand-blue font-semibold transition-all">
            <MdPhone size={20} /> Call: {COMPANY.phones[0]}
          </a>
        </div>

        <Link to="/shop" className="btn-primary w-full justify-center">
          Browse Products
        </Link>
      </div>
    </div>
  );
}
