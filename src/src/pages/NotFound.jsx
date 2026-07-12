import { Link } from "react-router-dom";
import { MdArrowBack, MdHome } from "react-icons/md";
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-brand-bg">
      <div className="text-center">
        <p className="text-8xl font-display font-black text-brand-blue mb-4">404</p>
        <h2 className="font-display font-bold text-brand-slate text-2xl mb-2">Page Not Found</h2>
        <p className="text-brand-gray mb-8">The page you're looking for doesn't exist.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => window.history.back()} className="btn-secondary">
            <MdArrowBack size={16} /> Go Back
          </button>
          <Link to="/" className="btn-primary">
            <MdHome size={16} /> Home
          </Link>
        </div>
      </div>
    </div>
  );
}
