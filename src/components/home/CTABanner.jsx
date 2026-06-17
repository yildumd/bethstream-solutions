import { Link } from "react-router-dom";
import { MdArrowForward, MdWhatsapp, MdPhone } from "react-icons/md";
import { COMPANY } from "../../constants";
import { motion } from "framer-motion";

export default function CTABanner() {
  return (
    <section className="section-padding bg-brand-blue">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Ready to Secure Your Business?
          </h2>
          <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
            Get a free consultation and custom quote. Our team responds within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/request-quote"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-blue font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              Request Free Quote <MdArrowForward size={18} />
            </Link>
            <a href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors">
              <MdWhatsapp size={20} /> WhatsApp Us
            </a>
            <a href={`tel:${COMPANY.phones[0]}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors">
              <MdPhone size={18} /> Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
