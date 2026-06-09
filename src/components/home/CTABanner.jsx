import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdArrowForward, MdWhatsapp, MdPhone } from "react-icons/md";
import { COMPANY } from "../../constants";

export default function CTABanner() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/60 via-[#1a0a2e] to-navy-950/60 border border-purple-500/20 p-10 md:p-16 text-center"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-sky-500/15 rounded-full blur-3xl" />

          <div className="relative z-10">
            <p className="badge-lemon inline-block mb-4">Ready to Get Started?</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Secure Your Business{" "}
              <span className="gradient-text">Today</span>
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
              Get a free consultation and custom quote for your security and networking project. Our team is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/request-quote" className="btn-primary text-base px-8 py-4">
                Request Free Quote <MdArrowForward size={20} />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 font-semibold hover:bg-green-500/25 transition-all"
              >
                <MdWhatsapp size={20} /> WhatsApp Us
              </a>
              <a
                href={`tel:${COMPANY.phones[0]}`}
                className="flex items-center gap-2 px-8 py-4 rounded-xl glass border border-white/15 text-white/80 font-semibold hover:bg-white/5 transition-all"
              >
                <MdPhone size={20} /> Call Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
