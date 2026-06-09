import { motion } from "framer-motion";
import { BRANDS } from "../../constants";

export default function Brands() {
  const doubled = [...BRANDS, ...BRANDS];
  return (
    <section className="py-12 border-y border-white/5 bg-white/2 overflow-hidden">
      <p className="text-center text-white/30 text-xs uppercase tracking-widest mb-8">Trusted Brands We Carry</p>
      <div className="relative flex overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 items-center whitespace-nowrap flex-shrink-0"
        >
          {doubled.map((brand, i) => (
            <span
              key={i}
              className="text-white/30 hover:text-white/70 font-display font-semibold text-lg transition-colors cursor-default flex-shrink-0"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
