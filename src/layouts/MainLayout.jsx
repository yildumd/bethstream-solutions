import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Toaster } from "react-hot-toast";

export default function MainLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f1a]">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
