import { motion } from "framer-motion";
import { MdVerified, MdPeople, MdEmojiEvents, MdCheckCircle } from "react-icons/md";
import { STATS, WHY_CHOOSE_US } from "../constants";
import CTABanner from "../components/home/CTABanner";
import {
  MdVerified as ShieldIcon, MdSpeed, MdHeadsetMic,
  MdLocalOffer, MdWorkspacePremium, MdLocationOn,
} from "react-icons/md";

const iconMap = {
  shield: MdVerified, clock: MdSpeed, headset: MdHeadsetMic,
  tag: MdLocalOffer, award: MdWorkspacePremium, map: MdLocationOn,
};

export default function About() {
  return (
    <div className="min-h-screen bg-brand-bg">

      {/* Page Header */}
      <div className="bg-white border-b border-brand-border py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-blue inline-block mb-4">About Us</span>
            <h1 className="font-display font-bold text-4xl text-brand-slate mb-4">
              Lagos's Trusted Technology Partner
            </h1>
            <p className="text-brand-gray text-lg leading-relaxed">
              Founded in the heart of Ikeja, Lagos — delivering world-class networking
              and security solutions to Nigerian businesses.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story + Stats */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-16">

            {/* Story */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}>
              <h2 className="font-display font-bold text-3xl text-brand-slate mb-5">
                Who We Are
              </h2>
              <p className="text-brand-gray text-base leading-relaxed mb-4">
                Bethstream Solutions has been at the forefront of delivering professional
                networking and security solutions to Nigerian businesses since our inception.
                Based at 7 Obafemi Awolowo Way, Ikeja — we are right at the heart of Lagos.
              </p>
              <p className="text-brand-gray text-base leading-relaxed mb-6">
                We combine technical expertise, genuine products, and an intimate understanding
                of the Nigerian market to provide solutions that actually work — accounting for
                power challenges, bandwidth realities, and budgets unique to Africa.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Authorised distributor of Hikvision, Dahua, Cisco & more",
                  "Certified installation technicians",
                  "Serving homes, SMEs and enterprises",
                  "After-sales support and maintenance",
                ].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <MdCheckCircle className="text-brand-accent flex-shrink-0" size={18} />
                    <span className="text-brand-slate text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4">
              {[
                { v: "500+", l: "Projects Completed", d: "Across Lagos & Nigeria" },
                { v: "200+", l: "Happy Clients",      d: "Homes & businesses" },
                { v: "10+",  l: "Years Experience",   d: "In the industry" },
                { v: "24/7", l: "Support",            d: "Always available" },
              ].map(({ v, l, d }, i) => (
                <div key={l} className={`card p-6 text-center ${i % 2 === 1 ? "mt-6" : ""}`}>
                  <p className="font-display font-bold text-3xl text-brand-blue mb-1">{v}</p>
                  <p className="font-semibold text-brand-slate text-sm mb-0.5">{l}</p>
                  <p className="text-brand-gray text-xs">{d}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mission / Vision / Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {[
              {
                icon: MdVerified,
                title: "Our Mission",
                text: "To provide every Nigerian business — large or small — with enterprise-grade security and networking infrastructure that protects and empowers.",
              },
              {
                icon: MdPeople,
                title: "Our Vision",
                text: "To become West Africa's most trusted technology solutions provider, connecting businesses to the infrastructure they need to thrive.",
              },
              {
                icon: MdEmojiEvents,
                title: "Our Values",
                text: "Integrity, excellence, and genuine service. We only recommend what you truly need and stand behind every product and installation.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-7 text-center">
                <div className="w-12 h-12 rounded-xl bg-brand-blueLight flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-brand-blue" size={24} />
                </div>
                <h3 className="font-display font-bold text-brand-slate text-lg mb-3">{title}</h3>
                <p className="text-brand-gray text-sm leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>

          {/* Why Choose Us */}
          <div>
            <h2 className="font-display font-bold text-2xl text-brand-slate mb-6 text-center">
              Why Clients Trust Us
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WHY_CHOOSE_US.map((item) => {
                const Icon = iconMap[item.icon] || MdVerified;
                return (
                  <div key={item.title} className="card p-5 flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-blueLight flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="text-brand-blue" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-slate text-sm mb-1">{item.title}</p>
                      <p className="text-brand-gray text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
