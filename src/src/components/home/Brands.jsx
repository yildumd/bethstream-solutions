import { motion } from "framer-motion";
import { BRANDS } from "../../constants";

export default function Brands() {
  const doubled = [...BRANDS, ...BRANDS];
  return (
    <section className="bg-slate-50 border-y border-brand-border py-8 overflow-hidden">
      <p className="text-center text-brand-gray text-xs uppercase tracking-widest font-medium mb-6">
        Authorised Distributor Of Leading Brands
      </p>
      <div className="relative flex overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 items-center whitespace-nowrap flex-shrink-0">
          {doubled.map((brand, i) => (
            <span key={i}
              className="text-slate-400 hover:text-brand-blue font-semibold text-base transition-colors cursor-default flex-shrink-0">
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
