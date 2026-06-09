import { motion } from "framer-motion";
import {
  MdVerified, MdSpeed, MdHeadsetMic, MdLocalOffer,
  MdWorkspacePremium, MdLocationOn,
} from "react-icons/md";
import { WHY_CHOOSE_US } from "../../constants";
import { staggerContainer, staggerItem } from "../../animations/variants";

const iconMap = {
  shield: MdVerified, clock: MdSpeed, headset: MdHeadsetMic,
  tag: MdLocalOffer, award: MdWorkspacePremium, map: MdLocationOn,
};

const colorMap = {
  purple: { bg: "bg-purple-500/15", text: "text-purple-400", border: "border-purple-500/20" },
  sky: { bg: "bg-sky-500/15", text: "text-sky-400", border: "border-sky-500/20" },
  lemon: { bg: "bg-lemon-500/15", text: "text-lemon-400", border: "border-lemon-500/20" },
};

export default function WhyChooseUs() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="badge-lemon inline-block mb-3">Why Choose Us</p>
          <h2 className="section-title">
            The Bethstream{" "}
            <span className="gradient-text">Advantage</span>
          </h2>
          <p className="section-subtitle mx-auto mt-3">
            We combine technical expertise with local knowledge to deliver world-class solutions right here in Lagos.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {WHY_CHOOSE_US.map((item) => {
            const Icon = iconMap[item.icon] || MdVerified;
            const c = colorMap[item.color] || colorMap.purple;
            return (
              <motion.div
                key={item.title}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className={`glass-card p-6 border ${c.border} hover:shadow-card-hover transition-all duration-300`}
              >
                <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mb-4`}>
                  <Icon className={c.text} size={24} />
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
