import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MdOutlineCameraAlt, MdBuild, MdRouter, MdCable,
  MdLock, MdSecurity, MdCheckCircle, MdArrowForward,
} from "react-icons/md";
import { SERVICES } from "../constants";
import { staggerContainer, staggerItem } from "../animations/variants";
import CTABanner from "../components/home/CTABanner";

const iconMap = {
  MdOutlineCameraAlt, MdBuildCircle: MdBuild, MdRouter,
  MdCable, MdLock, MdSecurity,
};

const colorClasses = {
  purple: { bg: "bg-purple-500/15", text: "text-purple-400", border: "border-purple-500/20", badge: "badge-purple" },
  sky: { bg: "bg-sky-500/15", text: "text-sky-400", border: "border-sky-500/20", badge: "badge-sky" },
  lemon: { bg: "bg-lemon-500/15", text: "text-lemon-400", border: "border-lemon-500/20", badge: "badge-lemon" },
};

export default function Services() {
  return (
    <div className="min-h-screen pt-28">
      {/* Header */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="badge-sky inline-block mb-4">Our Services</p>
            <h1 className="section-title mb-4">
              Complete <span className="gradient-text">Security Services</span>
            </h1>
            <p className="section-subtitle mx-auto">
              From installation to maintenance — we deliver end-to-end security and networking solutions for Lagos businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          {SERVICES.map((service, idx) => {
            const Icon = iconMap[service.icon] || MdSecurity;
            const c = colorClasses[service.color] || colorClasses.purple;
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center`}
              >
                <div className={`${!isEven ? "lg:order-2" : ""}`}>
                  <div className="relative rounded-2xl overflow-hidden aspect-video">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center border ${c.border}`}>
                      <Icon className={c.text} size={24} />
                    </div>
                  </div>
                </div>
                <div className={`${!isEven ? "lg:order-1" : ""}`}>
                  <span className={`${c.badge} inline-block mb-3`}>Service {String(idx + 1).padStart(2, "0")}</span>
                  <h2 className="font-display font-bold text-white text-3xl mb-4">{service.title}</h2>
                  <p className="text-white/60 leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-8">
                    {service.benefits.map(b => (
                      <li key={b} className="flex items-center gap-3 text-sm">
                        <MdCheckCircle className={c.text} size={16} />
                        <span className="text-white/70">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/request-quote" className="btn-primary">
                    Get a Quote <MdArrowForward size={18} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
