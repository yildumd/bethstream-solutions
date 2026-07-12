import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdArrowForward, MdRouter, MdVideocam, MdStorage, MdSdCard } from "react-icons/md";
import { PRODUCT_CATEGORIES } from "../../constants";

const icons = { networking: MdRouter, cctv: MdVideocam, recorders: MdStorage, storage: MdSdCard };

export default function Categories() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="section-title mb-3">Shop by Category</h2>
          <p className="section-sub max-w-xl mx-auto">
            Everything you need for a complete security and networking setup.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCT_CATEGORIES.map((cat, i) => {
            const Icon = icons[cat.id] || MdRouter;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}>
                <Link to={`/categories/${cat.id}`}
                  className="card-hover block p-6 group">
                  <div className="w-11 h-11 rounded-lg bg-brand-blueLight flex items-center justify-center mb-4">
                    <Icon className="text-brand-blue" size={22} />
                  </div>
                  <h3 className="font-display font-semibold text-brand-slate text-base mb-1.5">
                    {cat.label}
                  </h3>
                  <p className="text-brand-gray text-sm mb-4 line-clamp-2">{cat.description}</p>
                  <div className="space-y-1 mb-4">
                    {cat.subcategories.map(s => (
                      <p key={s} className="text-xs text-slate-400 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-300" />{s}
                      </p>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-brand-blue text-sm font-medium group-hover:gap-2 transition-all">
                    Browse <MdArrowForward size={16} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
