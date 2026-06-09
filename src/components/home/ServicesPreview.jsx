import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdOutlineCameraAlt, MdBuild, MdRouter, MdCable,
  MdLock, MdSecurity, MdArrowForward,
} from "react-icons/md";
import { SERVICES } from "../../constants";
import { staggerContainer, staggerItem } from "../../animations/variants";

const iconMap = {
  MdOutlineCameraAlt, MdBuildCircle: MdBuild, MdRouter,
  MdCable, MdLock, MdSecurity,
};

const colorClasses = {
  purple: "from-purple-600/20 to-purple-800/5 border-purple-500/15 text-purple-400 bg-purple-500/15",
  sky: "from-sky-600/20 to-sky-800/5 border-sky-500/15 text-sky-400 bg-sky-500/15",
  lemon: "from-lemon-600/20 to-lemon-800/5 border-lemon-500/15 text-lemon-400 bg-lemon-500/15",
};

export default function ServicesPreview() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <p className="badge-sky inline-block mb-3">Our Services</p>
            <h2 className="section-title">
              Complete Security{" "}
              <span className="gradient-text">Services</span>
            </h2>
            <p className="section-subtitle mt-3">
              End-to-end installation, maintenance, and support for all your security needs.
            </p>
          </div>
          <Link to="/services" className="btn-secondary flex-shrink-0">
            All Services <MdArrowForward size={18} />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || MdSecurity;
            const c = colorClasses[service.color] || colorClasses.purple;
            return (
              <motion.div
                key={service.id}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className={`glass-card p-6 bg-gradient-to-br ${c.split(" ").slice(0, 3).join(" ")} border transition-all duration-300 hover:shadow-card-hover`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${c.split(" ").slice(3).join(" ")}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-2">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">{service.description}</p>
                <Link
                  to="/services"
                  className="flex items-center gap-1 text-sm font-medium text-white/50 hover:text-white transition-colors group"
                >
                  Learn More <MdArrowForward size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
