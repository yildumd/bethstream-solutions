import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdMenu, MdClose, MdShoppingCart, MdPhone, MdWhatsapp } from "react-icons/md";
import { useCart } from "../../context/CartContext";
import { NAV_LINKS, COMPANY } from "../../constants";

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const { count }   = useCart();
  const location    = useLocation();

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
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
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
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-9 h-9 rounded-lg bg-brand-blue flex items-center justify-center">
                <span className="text-white font-bold text-sm">BS</span>
              </div>
              <div>
                <p className="font-display font-bold text-brand-slate text-sm leading-tight">Bethstream</p>
                <p className="text-brand-blue text-xs font-semibold leading-tight">Solutions</p>
              </div>
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

            {/* Right */}
            <div className="flex items-center gap-2">
              <Link to="/request-quote"
                className="hidden md:flex btn-primary py-2 px-5 text-xs">
                Get a Quote
              </Link>

              <Link to="/cart"
                className="relative p-2.5 rounded-lg text-brand-gray hover:text-brand-blue hover:bg-brand-blueLight transition-colors">
                <MdShoppingCart size={22} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-brand-blue text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {count > 9 ? "9+" : count}
                  </span>
                )}
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
                  <Link to="/request-quote" className="btn-primary w-full justify-center">
                    Get a Quote
                  </Link>
                  <a href={`https://wa.me/${COMPANY.whatsapp}`}
                    target="_blank" rel="noreferrer"
                    className="btn-green w-full justify-center">
                    <MdWhatsapp size={16} /> WhatsApp Us
                  </a>
                  <div className="flex gap-3 pt-1">
                    {COMPANY.phones.map(p => (
                      <a key={p} href={`tel:${p}`}
                        className="text-brand-gray text-xs flex items-center gap-1 hover:text-brand-blue transition-colors">
                        <MdPhone size={12} /> {p}
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
