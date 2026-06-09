import { useState } from "react";
import { motion } from "framer-motion";
import { MdSend, MdCheckCircle, MdRequestQuote } from "react-icons/md";
import { submitQuote } from "../services/quoteService";
import { PROJECT_TYPES, BUDGET_RANGES, COMPANY } from "../constants";
import toast from "react-hot-toast";

export default function RequestQuote() {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", company: "",
    projectType: "", budget: "", description: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.projectType) {
      toast.error("Please fill all required fields");
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
    <div className="min-h-screen pt-28 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 text-center max-w-md"
      >
        <div className="w-16 h-16 rounded-full bg-lemon-500/20 flex items-center justify-center mx-auto mb-6">
          <MdCheckCircle className="text-lemon-400" size={32} />
        </div>
        <h2 className="font-display font-bold text-white text-2xl mb-3">Quote Request Sent!</h2>
        <p className="text-white/60 mb-6">
          Thank you, <strong>{form.fullName}</strong>! We've received your request and will contact you within <strong>24 hours</strong> with a detailed quote.
        </p>
        <div className="glass rounded-xl p-4 text-left mb-6">
          <p className="text-white/40 text-xs mb-1">Reference: {form.projectType}</p>
          <p className="text-white text-sm">{form.email}</p>
        </div>
        <button onClick={() => setSent(false)} className="btn-secondary w-full justify-center">
          Submit Another Request
        </button>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-sky-500 flex items-center justify-center mx-auto mb-5">
            <MdRequestQuote size={28} className="text-white" />
          </div>
          <p className="badge-lemon inline-block mb-4">Free Consultation</p>
          <h1 className="section-title mb-3">Request a <span className="gradient-text">Custom Quote</span></h1>
          <p className="section-subtitle mx-auto">
            Tell us about your project and we'll craft a tailored solution with competitive pricing.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="label-text">Full Name *</label>
                <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="John Okafor" className="input-field" />
              </div>
              <div>
                <label className="label-text">Email Address *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@company.ng" className="input-field" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="label-text">Phone Number *</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="080XXXXXXXX" className="input-field" />
              </div>
              <div>
                <label className="label-text">Company / Organization</label>
                <input name="company" value={form.company} onChange={handleChange} placeholder="ABC Ltd (optional)" className="input-field" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="label-text">Project Type *</label>
                <select name="projectType" value={form.projectType} onChange={handleChange} className="input-field">
                  <option value="" className="bg-[#1a1a2e]">Select project type...</option>
                  {PROJECT_TYPES.map(t => <option key={t} value={t} className="bg-[#1a1a2e]">{t}</option>)}
                </select>
              </div>
              <div>
                <label className="label-text">Budget Range</label>
                <select name="budget" value={form.budget} onChange={handleChange} className="input-field">
                  <option value="" className="bg-[#1a1a2e]">Select budget range...</option>
                  {BUDGET_RANGES.map(b => <option key={b} value={b} className="bg-[#1a1a2e]">{b}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="label-text">Project Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe your project: location, size, specific requirements, timeline, any existing systems..."
                className="input-field resize-none"
              />
            </div>

            {/* Trust message */}
            <div className="glass rounded-xl p-4 flex gap-3 items-start">
              <MdCheckCircle className="text-lemon-400 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-white/50 text-sm">
                Your information is secure and will only be used to prepare your custom quote. We typically respond within 24 hours during business days.
              </p>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base">
              {loading ? (
                <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</span>
              ) : (
                <><MdSend size={20} /> Submit Quote Request</>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
