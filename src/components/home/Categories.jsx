import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdArrowForward, MdRouter, MdVideocam, MdStorage, MdSdCard } from "react-icons/md";
import { PRODUCT_CATEGORIES } from "../../constants";
import { staggerContainer, staggerItem } from "../../animations/variants";

const icons = {
  networking: MdRouter,
  cctv: MdVideocam,
  recorders: MdStorage,
  storage: MdSdCard,
};

const colorMap = {
  purple: "from-purple-600/20 to-purple-800/10 border-purple-500/20 hover:border-purple-400/40",
  sky: "from-sky-600/20 to-sky-800/10 border-sky-500/20 hover:border-sky-400/40",
  lemon: "from-lemon-600/20 to-lemon-800/10 border-lemon-500/20 hover:border-lemon-400/40",
};

const iconColorMap = {
  purple: "text-purple-400 bg-purple-500/20",
  sky: "text-sky-400 bg-sky-500/20",
  lemon: "text-lemon-400 bg-lemon-500/20",
};

export default function Categories() {
  return (
    <section className="section-padding bg-white/2">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="badge-sky inline-block mb-3">Product Categories</p>
          <h2 className="section-title">
            Everything You Need For{" "}
            <span className="gradient-text">Complete Security</span>
          </h2>
          <p className="section-subtitle mx-auto mt-3">
            From cameras to network equipment — all in one place.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PRODUCT_CATEGORIES.map((cat) => {
            const Icon = icons[cat.id] || MdRouter;
            const colors = colorMap[cat.color] || colorMap.purple;
            const iconColors = iconColorMap[cat.color] || iconColorMap.purple;
            return (
              <motion.div key={cat.id} variants={staggerItem}>
                <Link
                  to={`/categories/${cat.id}`}
                  className={`group block glass-card p-6 bg-gradient-to-br ${colors} border transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconColors}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-2">{cat.label}</h3>
                  <p className="text-white/50 text-sm mb-4 leading-relaxed">{cat.description}</p>
                  <ul className="space-y-1 mb-5">
                    {cat.subcategories.map(sub => (
                      <li key={sub} className="text-white/40 text-xs flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-white/30" />
                        {sub}
                      </li>
                    ))}
                  </ul>
                  <span className="flex items-center gap-1 text-sm font-medium text-white/50 group-hover:text-white transition-colors">
                    Browse {cat.label} <MdArrowForward size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
