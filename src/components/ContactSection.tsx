import React, { useState } from 'react';
import { DESIGNER_INFO } from '../data/portfolioData';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Check, 
  Copy, 
  ArrowUpRight, 
  FileText, 
  Download, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface ContactSectionProps {
  onOpenPdf: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenPdf }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    serviceType: 'Brand Identity',
    budget: '$1,500 – $3,500',
    timeline: 'Standard (1 month)',
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DESIGNER_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      organization: '',
      serviceType: 'Brand Identity',
      budget: '$1,500 – $3,500',
      timeline: 'Standard (1 month)',
      message: '',
    });
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 border-t border-slate-800/80 bg-[#0a0c10] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
              Inquiries & Commissions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
              Let's create something enduring.
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md mt-4 md:mt-0 leading-relaxed">
            Currently accepting new brand identity, editorial print, packaging, and UX systems commissions for late 2026 and 2027.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info & Research Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0f141f] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Direct Coordinates</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Have an urgent project or want to chat directly? Reach out anytime.
                </p>
              </div>

              {/* Email Card with Copy button */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Primary Email</div>
                <div className="flex items-center justify-between">
                  <a 
                    href={`mailto:${DESIGNER_INFO.email}`}
                    className="text-sm font-medium text-amber-400 hover:underline break-all"
                  >
                    {DESIGNER_INFO.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-md transition-colors"
                    title="Copy email to clipboard"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Geographic Info */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>Location</span>
                  </div>
                  <div className="text-white font-medium">{DESIGNER_INFO.location}</div>
                </div>

                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Timezone</span>
                  </div>
                  <div className="text-white font-medium">ICT · UTC+7</div>
                </div>
              </div>

              {/* Social Channels */}
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase mb-3">Professional Profiles</div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Behance', 'Dribbble', 'LinkedIn', 'Instagram', 'GitHub'].map((net) => (
                    <a
                      key={net}
                      href={DESIGNER_INFO.socials[net.toLowerCase() as keyof typeof DESIGNER_INFO.socials] || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <span>{net}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-500" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Academic Publication Card */}
            <div className="bg-gradient-to-br from-[#121927] to-[#0d121c] border border-amber-500/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                    Published Research Attachment
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5 leading-snug">
                    KhmerTutorial Online Operational Analysis (22p)
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Read the complete empirical mixed-methods study and platform technical blueprint.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-800">
                <button
                  onClick={onOpenPdf}
                  className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors text-center shadow-sm"
                >
                  View In-App Reader
                </button>
                <a
                  href={DESIGNER_INFO.pdfDocument.url}
                  download="KTO_Research_Publication.pdf"
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
                  title="Direct Download"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0f141f] border border-slate-800 rounded-2xl p-6 sm:p-8">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Inquiry Received</h3>
                  <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-medium">{formData.name}</span>! Your project brief has been recorded. I review all inquiries and respond within 24 business hours to <span className="text-amber-400">{formData.email}</span>.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors border border-slate-700"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Initiate a Project Brief</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Fill out the form below with your requirements for a prompt proposal.
                    </p>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Organization */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Studio Acorn or Independent"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  {/* Project Scope Selector */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">
                      Primary Service Discipline
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        'Brand Identity',
                        'Editorial & Print',
                        'Packaging System',
                        'UI/UX & Systems',
                      ].map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => setFormData({ ...formData, serviceType: service })}
                          className={`px-3 py-2 text-xs font-medium rounded-lg border text-center transition-all ${
                            formData.serviceType === service
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget & Timeline Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Estimated Budget (USD)
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        <option value="<$1,500">&lt; $1,500 (Small sprint)</option>
                        <option value="$1,500 – $3,500">$1,500 – $3,500 (Core identity/packaging)</option>
                        <option value="$3,500 – $7,000">$3,500 – $7,000 (Complete brand + system)</option>
                        <option value="$7,000+">$7,000+ (Comprehensive enterprise scope)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Target Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        <option value="Urgent (< 2 weeks)">Urgent (&lt; 2 weeks)</option>
                        <option value="Standard (1 month)">Standard (1 month)</option>
                        <option value="Flexible (2+ months)">Flexible (2+ months)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Project Goals & Context *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your brand, objectives, target audience, and any key deliverables you envision..."
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Processing Brief...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Project Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
