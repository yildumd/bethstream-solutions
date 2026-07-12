import { motion } from "framer-motion";
import { MdVerified, MdSpeed, MdHeadsetMic, MdLocalOffer, MdWorkspacePremium, MdLocationOn } from "react-icons/md";
import { WHY_CHOOSE_US } from "../../constants";

const iconMap = {
  shield: MdVerified, clock: MdSpeed, headset: MdHeadsetMic,
  tag: MdLocalOffer, award: MdWorkspacePremium, map: MdLocationOn,
};

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}>
            <h2 className="section-title mb-4">
              Why Businesses Choose Bethstream
            </h2>
            <p className="section-sub mb-8">
              Over a decade of delivering reliable security and networking
              solutions across Lagos and Nigeria.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHY_CHOOSE_US.map((item) => {
                const Icon = iconMap[item.icon] || MdVerified;
                return (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-blueLight flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="text-brand-blue" size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-slate text-sm mb-0.5">{item.title}</p>
                      <p className="text-brand-gray text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4">
            {[
              { v: "500+", l: "Projects Completed", desc: "Across Lagos & Nigeria" },
              { v: "200+", l: "Happy Clients",      desc: "Homes & businesses" },
              { v: "10+",  l: "Years Experience",   desc: "In the industry" },
              { v: "24/7", l: "Support",            desc: "Always available" },
            ].map(({ v, l, desc }) => (
              <div key={l} className="card p-6 text-center">
                <p className="font-display font-bold text-3xl text-brand-blue mb-1">{v}</p>
                <p className="font-semibold text-brand-slate text-sm mb-0.5">{l}</p>
                <p className="text-brand-gray text-xs">{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
