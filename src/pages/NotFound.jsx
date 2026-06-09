import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdArrowBack, MdHome } from "react-icons/md";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <p className="text-9xl font-display font-black gradient-text mb-4">404</p>
        <h2 className="font-display font-bold text-white text-3xl mb-3">Page Not Found</h2>
        <p className="text-white/50 mb-8 max-w-sm">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => window.history.back()} className="btn-secondary">
            <MdArrowBack size={18} /> Go Back
          </button>
          <Link to="/" className="btn-primary">
            <MdHome size={18} /> Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
