import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdPhone, MdEmail, MdLocationOn, MdWhatsapp,
} from "react-icons/md";
import {
  FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn,
} from "react-icons/fa";
import { COMPANY, NAV_LINKS, PRODUCT_CATEGORIES } from "../../constants";

const FooterSection = ({ title, children }) => (
  <div>
    <h4 className="font-display font-semibold text-white text-sm uppercase tracking-widest mb-5">
      {title}
    </h4>
    {children}
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-[#0a0a15] border-t border-white/5 mt-20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-sky-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">BS</span>
              </div>
              <div>
                <p className="font-display font-bold text-white text-sm">Bethstream</p>
                <p className="text-lemon-400 text-xs font-medium">Solutions</p>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Nigeria's trusted provider of networking, CCTV, and enterprise security solutions.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: FaInstagram, href: COMPANY.social.instagram },
                { icon: FaFacebookF, href: COMPANY.social.facebook },
                { icon: FaTwitter, href: COMPANY.social.twitter },
                { icon: FaLinkedinIn, href: COMPANY.social.linkedin },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white/50 hover:text-white hover:bg-purple-500/20 transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <FooterSection title="Quick Links">
            <ul className="space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white/50 hover:text-lemon-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/request-quote" className="text-white/50 hover:text-lemon-400 text-sm transition-colors">
                  Request Quote
                </Link>
              </li>
            </ul>
          </FooterSection>

          {/* Categories */}
          <FooterSection title="Products">
            <ul className="space-y-2">
              {PRODUCT_CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <Link to={`/categories/${cat.id}`} className="text-white/50 hover:text-lemon-400 text-sm transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/shop" className="text-white/50 hover:text-lemon-400 text-sm transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </FooterSection>

          {/* Contact */}
          <FooterSection title="Contact Us">
            <ul className="space-y-3">
              <li className="flex gap-3">
                <MdLocationOn className="text-purple-400 flex-shrink-0 mt-0.5" size={16} />
                <span className="text-white/50 text-sm">{COMPANY.address}</span>
              </li>
              {COMPANY.phones.map(p => (
                <li key={p}>
                  <a href={`tel:${p}`} className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors">
                    <MdPhone className="text-sky-400 flex-shrink-0" size={16} />
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors">
                  <MdEmail className="text-lemon-400 flex-shrink-0" size={16} />
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg px-3 py-2 text-sm hover:bg-green-500/20 transition-all"
                >
                  <MdWhatsapp size={16} /> WhatsApp Us
                </a>
              </li>
            </ul>
          </FooterSection>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Bethstream Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-white/30 hover:text-white/60 text-xs transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-white/30 hover:text-white/60 text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
