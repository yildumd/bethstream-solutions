import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdMenu, MdClose, MdPhone, MdWhatsapp } from "react-icons/md";
import { NAV_LINKS, COMPANY } from "../../constants";

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      {/* Top strip */}
      <div className="bg-brand-blue text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-blue-200">
            📍 7 Obafemi Awolowo Way, Opposite Ikeja LG, Lagos
          </span>
          <div className="flex items-center gap-5">
            {COMPANY.phones.map(p => (
              <a key={p} href={`tel:${p}`}
                className="flex items-center gap-1 text-blue-200 hover:text-white transition-colors">
                <MdPhone size={11} /> {p}
              </a>
            ))}
            <a href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank" rel="noreferrer"
              className="flex items-center gap-1 text-blue-200 hover:text-white transition-colors">
              <MdWhatsapp size={12} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-nav" : "border-b border-brand-border"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img
                src="/bethstream-logo.png"
                alt="Bethstream Solutions"
                className="h-14 w-auto object-contain"
              />
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <Link key={link.path} to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-brand-blue bg-brand-blueLight"
                      : "text-brand-gray hover:text-brand-slate hover:bg-slate-50"
                  }`}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <a href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank" rel="noreferrer"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors">
                <MdWhatsapp size={17} /> WhatsApp
              </a>
              <Link to="/request-quote"
                className="hidden md:flex btn-primary py-2 px-4 text-sm">
                Get a Quote
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 rounded-lg text-brand-gray hover:bg-slate-100 transition-colors">
                {mobileOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-brand-border bg-white overflow-hidden">
              <div className="px-4 py-3 space-y-1">
                {/* Mobile logo */}
                <div className="pb-3 mb-2 border-b border-brand-border">
                  <img
                    src="/bethstream-logo.png"
                    alt="Bethstream Solutions"
                    className="h-8 w-auto object-contain"
                  />
                </div>
                {NAV_LINKS.map(link => (
                  <Link key={link.path} to={link.path}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? "text-brand-blue bg-brand-blueLight"
                        : "text-brand-gray hover:text-brand-slate hover:bg-slate-50"
                    }`}>
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 border-t border-brand-border space-y-2">
                  <a href={`https://wa.me/${COMPANY.whatsapp}`}
                    target="_blank" rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors">
                    <MdWhatsapp size={18} /> WhatsApp Us
                  </a>
                  <Link to="/request-quote" className="btn-primary w-full justify-center">
                    Get a Quote
                  </Link>
                  <div className="flex flex-col gap-1 pt-1">
                    {COMPANY.phones.map(p => (
                      <a key={p} href={`tel:${p}`}
                        className="text-brand-gray text-sm flex items-center gap-2 hover:text-brand-blue transition-colors px-1">
                        <MdPhone size={14} /> {p}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}