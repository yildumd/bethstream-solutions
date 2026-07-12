import { useState } from "react";
import { motion } from "framer-motion";
import { MdSend, MdCheckCircle, MdRequestQuote, MdPhone, MdWhatsapp } from "react-icons/md";
import { submitQuote } from "../services/quoteService";
import { PROJECT_TYPES, BUDGET_RANGES, COMPANY } from "../constants";
import toast from "react-hot-toast";

export default function RequestQuote() {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", company: "",
    projectType: "", budget: "", description: "",
  });
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.projectType) {
      toast.error("Please fill in your name, phone and project type");
      return;
    }
    setLoading(true);
    try {
      await submitQuote(form);
      setSent(true);
    } catch {
      toast.error("Failed to submit. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
          <MdCheckCircle className="text-green-500" size={32} />
        </div>
        <h2 className="font-display font-bold text-brand-slate text-2xl mb-3">
          Quote Request Received!
        </h2>
        <p className="text-brand-gray text-sm mb-2">
          Thank you, <strong className="text-brand-slate">{form.fullName}</strong>!
        </p>
        <p className="text-brand-gray text-sm mb-6">
          We've received your request for <strong className="text-brand-slate">{form.projectType}</strong>.
          Our team will contact you within <strong className="text-brand-slate">24 hours</strong> with a detailed quote.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left space-y-1">
          <p className="text-xs text-brand-gray">Contact us directly:</p>
          <a href={`tel:${COMPANY.phones[0]}`}
            className="flex items-center gap-2 text-brand-blue font-medium text-sm hover:underline">
            <MdPhone size={14} /> {COMPANY.phones[0]}
          </a>
          <a href={`https://wa.me/${COMPANY.whatsapp}`}
            target="_blank" rel="noreferrer"
            className="flex items-center gap-2 text-green-600 font-medium text-sm hover:underline">
            <MdWhatsapp size={14} /> WhatsApp Us
          </a>
        </div>
        <button onClick={() => setSent(false)} className="btn-secondary w-full justify-center text-sm">
          Submit Another Request
        </button>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-bg">

      {/* Page Header */}
      <div className="bg-white border-b border-brand-border py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center mx-auto mb-4">
              <MdRequestQuote className="text-white" size={24} />
            </div>
            <span className="badge-green inline-block mb-3">Free Consultation</span>
            <h1 className="font-display font-bold text-4xl text-brand-slate mb-4">
              Request a Custom Quote
            </h1>
            <p className="text-brand-gray text-lg">
              Tell us about your project and we'll prepare a tailored quote within 24 hours.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-8 md:p-10">

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="label-text">Full Name *</label>
                <input name="fullName" value={form.fullName} onChange={handleChange}
                  placeholder="John Okafor" className="input-field" />
              </div>
              <div>
                <label className="label-text">Phone Number *</label>
                <input name="phone" value={form.phone} onChange={handleChange}
                  placeholder="080XXXXXXXX" className="input-field" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="label-text">Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="john@company.ng (optional)" className="input-field" />
              </div>
              <div>
                <label className="label-text">Company / Organisation</label>
                <input name="company" value={form.company} onChange={handleChange}
                  placeholder="ABC Ltd (optional)" className="input-field" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="label-text">Project Type *</label>
                <select name="projectType" value={form.projectType} onChange={handleChange}
                  className="input-field">
                  <option value="">Select project type...</option>
                  {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="label-text">Budget Range</label>
                <select name="budget" value={form.budget} onChange={handleChange}
                  className="input-field">
                  <option value="">Select budget range...</option>
                  {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="label-text">Project Description</label>
              <textarea name="description" value={form.description} onChange={handleChange}
                rows={5}
                placeholder="Describe your project — location, size, number of cameras needed, existing systems, timeline..."
                className="input-field resize-none" />
            </div>

            {/* Trust note */}
            <div className="bg-slate-50 rounded-xl p-4 flex gap-3">
              <MdCheckCircle className="text-brand-accent flex-shrink-0 mt-0.5" size={17} />
              <p className="text-brand-gray text-sm">
                Your information is safe and will only be used to prepare your quote.
                We respond within <strong className="text-brand-slate">24 hours</strong> on business days.
              </p>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 text-base">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                <><MdSend size={18} /> Submit Quote Request</>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
