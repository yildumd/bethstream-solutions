import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdMenu, MdClose, MdShoppingCart, MdPerson, MdSearch,
  MdPhone, MdKeyboardArrowDown,
} from "react-icons/md";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { NAV_LINKS, COMPANY } from "../../constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { count } = useCart();
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-purple-900/80 text-white/80 text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>📍 7 Obafemi Awolowo Way, Ikeja, Lagos</span>
          <div className="flex items-center gap-4">
            {COMPANY.phones.map(p => (
              <a key={p} href={`tel:${p}`} className="flex items-center gap-1 hover:text-lemon-400 transition-colors">
                <MdPhone size={12} /> {p}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        initial={false}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#0f0f1a]/95 backdrop-blur-xl shadow-premium border-b border-white/5 mt-0" : "bg-transparent mt-8 md:mt-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-sky-500 flex items-center justify-center shadow-glow group-hover:shadow-glow-lemon transition-all duration-300">
                <span className="text-white font-bold text-sm">BS</span>
              </div>
              <div className="hidden sm:block">
                <p className="font-display font-bold text-white text-sm leading-tight">Bethstream</p>
                <p className="text-lemon-400 text-xs font-medium leading-tight">Solutions</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? "bg-purple-500/20 text-purple-300"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/request-quote" className="ml-2 btn-lemon text-sm py-2 px-4">
                Get Quote
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                <MdSearch size={20} />
              </button>

              <Link to="/cart" className="relative p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all">
                <MdShoppingCart size={20} />
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-lemon-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                  >
                    {count}
                  </motion.span>
                )}
              </Link>

              <Link
                to={user ? (isAdmin ? "/admin" : "/account") : "/login"}
                className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                <MdPerson size={20} />
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                {mobileOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-white/10 bg-[#0f0f1a]/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="max-w-2xl mx-auto px-4 py-4">
                <div className="relative">
                  <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search products, brands, categories..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-400/50 transition-all"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-white/10 bg-[#0f0f1a]/98 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      location.pathname === link.path
                        ? "bg-purple-500/20 text-purple-300"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link to="/request-quote" className="block w-full text-center btn-lemon mt-2">
                  Request Quote
                </Link>
                <div className="pt-2 border-t border-white/10 mt-2">
                  {COMPANY.phones.map(p => (
                    <a key={p} href={`tel:${p}`} className="flex items-center gap-2 px-4 py-2 text-sm text-white/60 hover:text-white">
                      <MdPhone size={14} /> {p}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
