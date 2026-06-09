import { motion } from "framer-motion";
import { MdVerified, MdPeople, MdBusiness, MdEmojiEvents } from "react-icons/md";
import { STATS, WHY_CHOOSE_US } from "../constants";
import CTABanner from "../components/home/CTABanner";
import { staggerContainer, staggerItem } from "../animations/variants";

export default function About() {
  return (
    <div className="min-h-screen pt-28">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
              <p className="badge-purple inline-block mb-4">About Bethstream Solutions</p>
              <h1 className="section-title mb-6">
                Lagos's Trusted <span className="gradient-text">Technology Partner</span>
              </h1>
              <p className="text-white/60 leading-relaxed mb-6">
                Founded in the heart of Ikeja, Lagos, Bethstream Solutions has been at the forefront of delivering world-class networking and security solutions to Nigerian businesses since our inception.
              </p>
              <p className="text-white/60 leading-relaxed">
                We combine technical expertise, genuine products, and an intimate understanding of the Nigerian market to provide solutions that actually work in our environment — accounting for power challenges, bandwidth realities, and budget considerations unique to Africa.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((s, i) => (
                  <div key={s.label} className={`glass-card p-6 text-center ${i === 1 || i === 2 ? "mt-8" : ""}`}>
                    <p className="gradient-text font-display font-bold text-4xl mb-1">{s.value}</p>
                    <p className="text-white/50 text-sm">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 px-4 bg-white/2">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: MdVerified, title: "Our Mission", text: "To provide every Nigerian business — large or small — with enterprise-grade security and networking infrastructure that protects and empowers.", color: "purple" },
              { icon: MdPeople, title: "Our Vision", text: "To become West Africa's most trusted technology solutions provider, connecting businesses to the infrastructure they need to thrive.", color: "sky" },
              { icon: MdEmojiEvents, title: "Our Values", text: "Integrity, excellence, and genuine service. We only recommend what you truly need and stand behind every product and installation we deliver.", color: "lemon" },
            ].map(({ icon: Icon, title, text, color }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-8 text-center"
              >
                <div className={`w-14 h-14 rounded-2xl bg-${color}-500/15 flex items-center justify-center mx-auto mb-5`}>
                  <Icon className={`text-${color}-400`} size={28} />
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-3">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
