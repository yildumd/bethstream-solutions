import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MdArrowForward, MdPlayArrow, MdShield, MdRouter, MdVideocam,
} from "react-icons/md";
import { fadeUp, staggerContainer, staggerItem } from "../../animations/variants";

const FloatingCard = ({ icon: Icon, title, value, color, delay, className }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className={`absolute glass-card p-3 min-w-[140px] ${className}`}
    style={{ animation: `float ${4 + delay}s ease-in-out infinite` }}
  >
    <div className={`w-8 h-8 rounded-lg bg-${color}-500/20 flex items-center justify-center mb-2`}>
      <Icon className={`text-${color}-400`} size={16} />
    </div>
    <p className="text-white/50 text-xs">{title}</p>
    <p className="text-white font-semibold text-sm">{value}</p>
  </motion.div>
);

const NetworkNode = ({ x, y, size = 4, delay = 0 }) => (
  <motion.div
    className="absolute rounded-full bg-purple-400"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
    animate={{
      opacity: [0.2, 0.8, 0.2],
      scale: [1, 1.5, 1],
    }}
    transition={{ duration: 2 + delay, repeat: Infinity, delay }}
  />
);

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const nodes = [
    { x: 10, y: 20 }, { x: 80, y: 15 }, { x: 25, y: 70 },
    { x: 65, y: 60 }, { x: 45, y: 30 }, { x: 90, y: 75 },
    { x: 55, y: 85 }, { x: 15, y: 50 }, { x: 70, y: 40 },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
    >
      {/* Network Grid Background */}
      <div className="absolute inset-0 network-grid opacity-60" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse_slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-600/15 rounded-full blur-3xl animate-pulse_slow" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-lemon-500/8 rounded-full blur-3xl animate-pulse_slow" style={{ animationDelay: "2s" }} />

      {/* Network nodes */}
      {nodes.map((n, i) => (
        <NetworkNode key={i} {...n} delay={i * 0.3} size={3 + (i % 3)} />
      ))}

      {/* Floating cards */}
      <div className="hidden xl:block">
        <FloatingCard icon={MdShield} title="Security Projects" value="500+ Done" color="purple" delay={0.8} className="top-1/4 left-8" />
        <FloatingCard icon={MdRouter} title="Network Uptime" value="99.9%" color="sky" delay={1.2} className="top-1/3 right-10" />
        <FloatingCard icon={MdVideocam} title="Cameras Installed" value="2,000+" color="lemon" delay={1.6} className="bottom-1/3 left-12" />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-400/30 text-purple-300 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-lemon-400 animate-pulse" />
          Nigeria's #1 Security & Networking Solutions Provider
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6"
        >
          Smart{" "}
          <span className="gradient-text">Networking & Surveillance</span>
          {" "}Solutions For{" "}
          <span className="text-lemon-400">Modern Businesses</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Trusted networking, CCTV, surveillance, storage and security solutions for homes, businesses and enterprises.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link to="/shop" className="btn-primary text-base px-8 py-4 shadow-glow">
            <MdArrowForward size={20} />
            Shop Products
          </Link>
          <Link to="/request-quote" className="btn-secondary text-base px-8 py-4">
            Request Quote
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
        >
          {[
            { v: "500+", l: "Projects" },
            { v: "200+", l: "Clients" },
            { v: "10+", l: "Years" },
            { v: "24/7", l: "Support" },
          ].map(({ v, l }) => (
            <div key={l} className="text-center">
              <p className="gradient-text-purple font-display font-bold text-2xl md:text-3xl">{v}</p>
              <p className="text-white/40 text-sm">{l}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
