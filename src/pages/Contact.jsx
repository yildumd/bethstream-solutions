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
  const [form,    setForm]    = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSending(true);
    try {
      await sendMessage(form);
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send. Please call us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg">

      {/* Page Header */}
      <div className="bg-white border-b border-brand-border py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-blue inline-block mb-4">Get In Touch</span>
            <h1 className="font-display font-bold text-4xl text-brand-slate mb-4">Contact Us</h1>
            <p className="text-brand-gray text-lg">
              Visit our Ikeja showroom, call, WhatsApp, or send a message below.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Info Cards */}
          <div className="space-y-4">
            {[
              {
                icon: MdLocationOn, label: "Address", color: "text-brand-blue",
                value: COMPANY.address, href: null,
              },
              {
                icon: MdPhone, label: "Phone", color: "text-brand-blue",
                value: COMPANY.phones.join("\n"), href: `tel:${COMPANY.phones[0]}`,
              },
              {
                icon: MdEmail, label: "Email", color: "text-brand-blue",
                value: COMPANY.email, href: `mailto:${COMPANY.email}`,
              },
              {
                icon: MdAccessTime, label: "Business Hours", color: "text-brand-blue",
                value: `Mon – Fri: 8:00 AM – 6:00 PM\nSaturday: 9:00 AM – 4:00 PM\nSunday: Closed`, href: null,
              },
            ].map(({ icon: Icon, label, color, value, href }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                className="card p-5">
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-blueLight flex items-center justify-center flex-shrink-0">
                    <Icon className={color} size={18} />
                  </div>
                  <div>
                    <p className="text-brand-gray text-xs uppercase tracking-wide font-medium mb-1">
                      {label}
                    </p>
                    {href ? (
                      <a href={href}
                        className="text-brand-slate text-sm hover:text-brand-blue transition-colors whitespace-pre-line font-medium">
                        {value}
                      </a>
                    ) : (
                      <p className="text-brand-slate text-sm whitespace-pre-line">{value}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank" rel="noreferrer"
              className="flex items-center gap-3 w-full px-5 py-4 rounded-xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                <MdWhatsapp className="text-white" size={22} />
              </div>
              <div>
                <p className="font-semibold text-green-800 text-sm">Chat on WhatsApp</p>
                <p className="text-green-600 text-xs">Typically reply within 1 hour</p>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 card p-8">
            <h2 className="font-display font-bold text-brand-slate text-xl mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-text">Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange}
                    placeholder="John Okafor" className="input-field" />
                </div>
                <div>
                  <label className="label-text">Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="john@company.com" className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-text">Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange}
                    placeholder="080XXXXXXXX" className="input-field" />
                </div>
                <div>
                  <label className="label-text">Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange}
                    placeholder="Product enquiry" className="input-field" />
                </div>
              </div>
              <div>
                <label className="label-text">Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  rows={5} placeholder="How can we help you?"
                  className="input-field resize-none" />
              </div>
              <button type="submit" disabled={sending} className="btn-primary px-8 py-3">
                {sending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <><MdSend size={17} /> Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="card overflow-hidden rounded-xl mt-8 h-72">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4!2d3.3515!3d6.6018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzYnMDYuNSJOIDPCsDIxJzA1LjQiRQ!5e0!3m2!1sen!2sng!4v1234567890"
            width="100%" height="100%"
            style={{ border: 0 }}
            allowFullScreen loading="lazy"
            title="Bethstream Solutions Location"
          />
        </div>
      </div>
    </div>
  );
}
