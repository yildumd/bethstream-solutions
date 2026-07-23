import { Link } from "react-router-dom";
import { MdPhone, MdEmail, MdLocationOn, MdWhatsapp } from "react-icons/md";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { COMPANY, NAV_LINKS, PRODUCT_CATEGORIES } from "../../constants";

export default function Footer() {
  return (
    <footer className="bg-brand-slate text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div style={{
                background: "white",
                borderRadius: "10px",
                padding: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50px",
                height: "50px",
                flexShrink: 0,
              }}>
                <img
                  src="/favicon-logo.png"
                  alt="Bethstream Solutions"
                  style={{ width: "38px", height: "38px", objectFit: "contain" }}
                />
              </div>
              <div>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
                  fontWeight: "800",
                  fontSize: "18px",
                  color: "white",
                  lineHeight: "1.2",
                  margin: 0,
                }}>
                  Bethstream
                </p>
                <p style={{
                  fontWeight: "700",
                  fontSize: "11px",
                  color: "#93c5fd",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  lineHeight: "1.2",
                  margin: 0,
                }}>
                  Solutions
                </p>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Nigeria's trusted provider of professional networking, CCTV, and enterprise security solutions.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2">
              {[FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-blue flex items-center justify-center transition-colors">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-5 uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[...NAV_LINKS, { label: "Request Quote", path: "/request-quote" }].map(link => (
                <li key={link.path}>
                  <Link to={link.path}
                    className="text-slate-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-5 uppercase tracking-widest">
              Products
            </h4>
            <ul className="space-y-2.5">
              {PRODUCT_CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <Link to={`/categories/${cat.id}`}
                    className="text-slate-400 hover:text-white text-sm transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/shop"
                  className="text-slate-400 hover:text-white text-sm transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-5 uppercase tracking-widest">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <MdLocationOn className="text-brand-blue flex-shrink-0 mt-0.5" size={16} />
                <span className="text-slate-400 text-sm leading-relaxed">
                  {COMPANY.address}
                </span>
              </li>
              {COMPANY.phones.map(p => (
                <li key={p}>
                  <a href={`tel:${p}`}
                    className="flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors">
                    <MdPhone className="text-brand-blue flex-shrink-0" size={15} /> {p}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors">
                  <MdEmail className="text-brand-blue flex-shrink-0" size={15} />
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${COMPANY.whatsapp}`}
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors">
                  <MdWhatsapp className="text-green-400 flex-shrink-0" size={16} />
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Bethstream Solutions. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy"
              className="text-slate-500 hover:text-white text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms"
              className="text-slate-500 hover:text-white text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
