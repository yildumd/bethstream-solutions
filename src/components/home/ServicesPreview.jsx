import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdOutlineCameraAlt, MdBuild, MdRouter, MdCable, MdLock, MdSecurity, MdArrowForward,
} from "react-icons/md";
import { SERVICES } from "../../constants";

const iconMap = {
  MdOutlineCameraAlt, MdBuildCircle: MdBuild, MdRouter,
  MdCable, MdLock, MdSecurity,
};

export default function ServicesPreview() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="section-title mb-2">Our Services</h2>
            <p className="section-sub max-w-lg">
              End-to-end installation, maintenance and support.
            </p>
          </div>
          <Link to="/services" className="btn-outline flex-shrink-0">
            All Services <MdArrowForward size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon] || MdSecurity;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="card p-6 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-10 h-10 rounded-lg bg-brand-blueLight flex items-center justify-center mb-4">
                  <Icon className="text-brand-blue" size={20} />
                </div>
                <h3 className="font-semibold text-brand-slate text-base mb-2">{service.title}</h3>
                <p className="text-brand-gray text-sm leading-relaxed mb-4 line-clamp-2">
                  {service.description}
                </p>
                <Link to="/services"
                  className="text-brand-blue text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  Learn more <MdArrowForward size={14} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
