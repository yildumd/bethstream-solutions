import { Link } from "react-router-dom";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { COMPANY, NAV_LINKS, PRODUCT_CATEGORIES } from "../../constants";

export default function Footer() {
  return (
    <footer className="bg-brand-slate text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
<Link to="/" className="flex items-center mb-4">
  <img
    src="/bethstream-logo.png"
    alt="Bethstream Solutions"
    className="h-10 w-auto object-contain brightness-0 invert"
  />
</Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Nigeria's trusted provider of professional networking, CCTV, and enterprise security solutions.
            </p>
            <div className="flex gap-2">
              {[FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-blue flex items-center justify-center transition-colors">
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
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
            <h4 className="font-semibold text-white text-sm mb-4">Products</h4>
            <ul className="space-y-2">
              {PRODUCT_CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <Link to={`/categories/${cat.id}`}
                    className="text-slate-400 hover:text-white text-sm transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex gap-2.5">
                <MdLocationOn className="text-brand-blue flex-shrink-0 mt-0.5" size={16} />
                <span className="text-slate-400 text-sm">{COMPANY.address}</span>
              </li>
              {COMPANY.phones.map(p => (
                <li key={p}>
                  <a href={`tel:${p}`}
                    className="flex items-center gap-2.5 text-slate-400 hover:text-white text-sm transition-colors">
                    <MdPhone className="text-brand-blue" size={15} /> {p}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2.5 text-slate-400 hover:text-white text-sm transition-colors">
                  <MdEmail className="text-brand-blue" size={15} /> {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Bethstream Solutions. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy" className="text-slate-500 hover:text-white text-xs transition-colors">Privacy</Link>
            <Link to="/terms"   className="text-slate-500 hover:text-white text-xs transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
