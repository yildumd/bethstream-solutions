import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MdOutlineCameraAlt, MdBuild, MdRouter, MdCable,
  MdLock, MdSecurity, MdCheckCircle, MdArrowForward,
} from "react-icons/md";
import { SERVICES } from "../constants";
import CTABanner from "../components/home/CTABanner";

const iconMap = {
  MdOutlineCameraAlt, MdBuildCircle: MdBuild, MdRouter,
  MdCable, MdLock, MdSecurity,
};

export default function Services() {
  return (
    <div className="min-h-screen bg-brand-bg">

      {/* Page Header */}
      <div className="bg-white border-b border-brand-border py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-blue inline-block mb-4">Our Services</span>
            <h1 className="font-display font-bold text-4xl text-brand-slate mb-4">
              Complete Security & Networking Services
            </h1>
            <p className="text-brand-gray text-lg leading-relaxed">
              From installation to maintenance — end-to-end solutions for Lagos homes, businesses and enterprises.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services List */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          {SERVICES.map((service, idx) => {
            const Icon   = iconMap[service.icon] || MdSecurity;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="card overflow-hidden"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2`}>

                  {/* Image */}
                  <div className={`relative ${!isEven ? "lg:order-2" : ""}`}>
                    <div className="aspect-video lg:aspect-auto lg:h-full min-h-[240px] overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Service number badge on image */}
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white shadow-card flex items-center justify-center">
                      <span className="text-brand-blue font-display font-bold text-sm">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-8 lg:p-10 flex flex-col justify-center ${!isEven ? "lg:order-1" : ""}`}>

                    {/* Icon + Title */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-brand-blueLight flex items-center justify-center flex-shrink-0">
                        <Icon className="text-brand-blue" size={22} />
                      </div>
                      <h2 className="font-display font-bold text-2xl text-brand-slate">
                        {service.title}
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="text-brand-gray text-base leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Benefits */}
                    <ul className="space-y-2.5 mb-8">
                      {service.benefits.map(benefit => (
                        <li key={benefit} className="flex items-center gap-3">
                          <MdCheckCircle className="text-brand-accent flex-shrink-0" size={18} />
                          <span className="text-brand-slate text-sm font-medium">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div>
                      <Link to="/request-quote" className="btn-primary">
                        Get a Quote <MdArrowForward size={16} />
                      </Link>
                    </div>
                  </div>
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
