import { useState } from "react";
import { motion } from "framer-motion";
import {
  MdLocationOn, MdPhone, MdEmail, MdWhatsapp,
  MdAccessTime, MdSend,
} from "react-icons/md";
import { sendMessage } from "../services/messageService";
import { COMPANY } from "../constants";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }
    setSending(true);
    try {
      await sendMessage(form);
      toast.success("Message sent! We'll get back to you within 24 hours.", {
        style: { background: "#1a1a2e", color: "#fff", border: "1px solid rgba(132,204,22,0.3)" },
      });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send. Please call us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="badge-sky inline-block mb-4">Get In Touch</p>
          <h1 className="section-title mb-4">Contact <span className="gradient-text">Us</span></h1>
          <p className="section-subtitle mx-auto">
            Visit our Ikeja showroom, call, or send a message. We're here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <div className="space-y-4">
            {[
              { icon: MdLocationOn, label: "Address", value: COMPANY.address, color: "purple", href: null },
              { icon: MdPhone, label: "Phone", value: COMPANY.phones.join("\n"), color: "sky", href: `tel:${COMPANY.phones[0]}` },
              { icon: MdEmail, label: "Email", value: COMPANY.email, color: "lemon", href: `mailto:${COMPANY.email}` },
              { icon: MdAccessTime, label: "Business Hours", value: `${COMPANY.hours.weekdays}\n${COMPANY.hours.saturday}\n${COMPANY.hours.sunday}`, color: "purple", href: null },
            ].map(({ icon: Icon, label, value, color, href }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-5"
              >
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-${color}-500/15 flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`text-${color}-400`} size={20} />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wide mb-1">{label}</p>
                    {href ? (
                      <a href={href} className="text-white text-sm hover:text-purple-300 transition-colors whitespace-pre-line">{value}</a>
                    ) : (
                      <p className="text-white text-sm whitespace-pre-line">{value}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 w-full px-5 py-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 font-semibold hover:bg-green-500/20 transition-all"
            >
              <MdWhatsapp size={22} />
              <div>
                <p className="font-semibold">WhatsApp Us</p>
                <p className="text-xs opacity-70">Typically reply within 1 hour</p>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 glass-card p-8">
            <h2 className="font-display font-bold text-white text-xl mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-text">Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="input-field" />
                </div>
                <div>
                  <label className="label-text">Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@company.com" className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-text">Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="080XXXXXXXX" className="input-field" />
                </div>
                <div>
                  <label className="label-text">Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="Product inquiry" className="input-field" />
                </div>
              </div>
              <div>
                <label className="label-text">Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us how we can help you..." className="input-field resize-none" />
              </div>
              <button type="submit" disabled={sending} className="btn-primary w-full justify-center">
                {sending ? (
                  <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</span>
                ) : (
                  <><MdSend size={18} /> Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Map Embed */}
        <div className="glass-card overflow-hidden rounded-2xl h-80">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4028!2d3.3515!3d6.6018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzYnMDYuNSJOIDPCsDIxJzA1LjQiRQ!5e0!3m2!1sen!2sng!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
            allowFullScreen
            loading="lazy"
            title="Bethstream Solutions Location"
          />
        </div>
      </div>
    </div>
  );
}
