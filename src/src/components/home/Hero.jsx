import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdArrowForward, MdCheckCircle, MdWhatsapp } from "react-icons/md";
import { COMPANY } from "../../constants";

const CHECK_ITEMS = [
  "Professional Installation",
  "Genuine Products",
  "24/7 Support",
  "Warranty Covered",
];

export default function Hero() {
  return (
    <section className="bg-white border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>

            <span className="inline-flex items-center gap-2 bg-brand-blueLight text-brand-blue text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              Based in Ikeja, Lagos · Serving All of Nigeria
            </span>

            <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-slate leading-[1.15] mb-5">
              Smart Security &{" "}
              <span className="text-brand-blue">Networking</span>{" "}
              Solutions
            </h1>

            <p className="text-brand-gray text-lg leading-relaxed mb-8 max-w-lg">
              Professional CCTV installation, networking equipment, and
              surveillance solutions for homes, businesses, and enterprises
              across Nigeria.
            </p>

            {/* Checkmarks */}
            <div className="grid grid-cols-2 gap-2 mb-8">
              {CHECK_ITEMS.map(item => (
                <div key={item} className="flex items-center gap-2">
                  <MdCheckCircle className="text-brand-accent flex-shrink-0" size={16} />
                  <span className="text-sm text-brand-gray">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/shop" className="btn-primary px-8 py-3">
                Browse Products <MdArrowForward size={18} />
              </Link>
              <Link to="/request-quote" className="btn-secondary px-8 py-3">
                Request a Quote
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank" rel="noreferrer"
                className="btn-green px-6 py-3">
                <MdWhatsapp size={18} /> WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right — image grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:grid grid-cols-2 gap-4">

            {[
              { src: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&q=80", label: "CCTV Cameras" },
              { src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80", label: "Networking" },
              { src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80", label: "Structured Cabling" },
              { src: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=400&q=80", label: "Recorders" },
            ].map((img, i) => (
              <div key={i} className={`relative rounded-xl overflow-hidden ${i === 0 ? "row-span-2" : ""}`}>
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover"
                  style={{ height: i === 0 ? "100%" : "160px" }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white text-xs font-semibold">{img.label}</p>
                </div>
              </div>
            ))}

            {/* Trust badge */}
            <div className="col-span-2 card p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-blueLight flex items-center justify-center flex-shrink-0">
                <span className="text-brand-blue font-bold text-lg">✓</span>
              </div>
              <div>
                <p className="font-semibold text-brand-slate text-sm">500+ Projects Completed</p>
                <p className="text-brand-gray text-xs">Trusted by businesses across Lagos & beyond</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
