import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Phone,
    MapPin,
    MessageCircle,
    Send,
    Heart,
    CheckCircle,
    Loader2,
    Instagram,
    Twitter,
    Facebook
} from 'lucide-react';
import { createMessage } from '../lib/services/messages';

const socialLinks = [
    { name: 'Instagram', icon: Instagram, url: '#', color: 'hover:text-pink-500' },
    { name: 'Twitter', icon: Twitter, url: '#', color: 'hover:text-blue-400' },
    { name: 'Facebook', icon: Facebook, url: '#', color: 'hover:text-blue-600' },
];

export default function Contact() {
    const [activeTab, setActiveTab] = useState<'contact' | 'volunteer' | 'newsletter'>('contact');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        skills: '',
        availability: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await createMessage({
                name: formData.name,
                email: formData.email,
                message: formData.message || `${activeTab} submission`,
                type: activeTab,
                phone: formData.phone || undefined,
                skills: formData.skills || undefined,
                availability: formData.availability || undefined,
            });
            setIsSubmitted(true);
        } catch (err) {
            console.error('Message submission error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', phone: '', message: '', skills: '', availability: '' });
        setIsSubmitted(false);
    };

    return (
        <div className="pt-20 bg-cream min-h-screen">
            {/* Hero */}
            <section className="pt-32 pb-16 bg-cream">
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="h-px w-12 bg-forest/30" />
                            <span className="text-xs font-medium tracking-wider uppercase text-forest/60">Contact</span>
                        </div>
                        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-medium text-forest mb-6 leading-[1.05]">
                            Get In Touch
                        </h1>
                        <p className="text-xl text-forest/60">
                            Have a question? Want to volunteer? Or just want to say hi? We'd love to hear from you!
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h2 className="font-heading text-2xl font-medium mb-6 text-forest">Contact Information</h2>

                            <div className="space-y-6 mb-10">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-forest/5 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MapPin className="text-forest" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-1 text-forest">Location</h3>
                                        <p className="text-forest/60">Accra, Ghana</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-forest/5 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Mail className="text-forest" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-1 text-forest">Email</h3>
                                        <a href="mailto:hello@gamesandconnect.com" className="text-forest/60 hover:text-forest transition-colors">
                                            hello@gamesandconnect.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-forest/5 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Phone className="text-forest" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-1 text-forest">Phone</h3>
                                        <a href="tel:+233000000000" className="text-forest/60 hover:text-forest transition-colors">
                                            +233 00 000 0000
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp Community */}
                            <div className="bg-white p-6 rounded-2xl border border-forest/5 mb-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 bg-forest/5 rounded-xl flex items-center justify-center">
                                        <MessageCircle className="text-forest" size={28} />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-medium text-lg text-forest">Join Our WhatsApp Community</h3>
                                        <p className="text-forest/50 text-sm">2,000+ members and growing!</p>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-forest hover:bg-forest-light text-white rounded-xl font-medium transition-colors"
                                >
                                    <MessageCircle size={20} />
                                    Join Community
                                </a>
                            </div>

                            {/* Social Links */}
                            <div>
                                <h3 className="font-heading font-medium mb-4 text-forest">Follow Us</h3>
                                <div className="flex gap-3">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 bg-forest/5 rounded-xl flex items-center justify-center text-forest hover:bg-forest hover:text-white transition-all"
                                            aria-label={social.name}
                                        >
                                            <social.icon size={22} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Forms */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            {/* Tabs */}
                            <div className="flex gap-2 mb-6">
                                <button
                                    onClick={() => { setActiveTab('contact'); resetForm(); }}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${activeTab === 'contact' ? 'bg-charcoal text-white shadow-lg' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    <Send size={18} />
                                    Contact
                                </button>
                                <button
                                    onClick={() => { setActiveTab('volunteer'); resetForm(); }}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${activeTab === 'volunteer' ? 'bg-charcoal text-white shadow-lg' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    <Heart size={18} />
                                    Volunteer
                                </button>
                                <button
                                    onClick={() => { setActiveTab('newsletter'); resetForm(); }}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${activeTab === 'newsletter' ? 'bg-charcoal text-white shadow-lg' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    <Mail size={18} />
                                    Newsletter
                                </button>
                            </div>

                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
                                {isSubmitted ? (
                                    <div className="text-center py-8">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                        >
                                            <CheckCircle className="w-8 h-8 text-green-600" />
                                        </motion.div>
                                        <h3 className="text-xl font-bold mb-2 text-charcoal">
                                            {activeTab === 'contact' && 'Message Sent!'}
                                            {activeTab === 'volunteer' && 'Application Received!'}
                                            {activeTab === 'newsletter' && 'Subscribed!'}
                                        </h3>
                                        <p className="text-gray-500 mb-4">
                                            {activeTab === 'contact' && "We'll get back to you soon."}
                                            {activeTab === 'volunteer' && "We'll reach out with opportunities."}
                                            {activeTab === 'newsletter' && "You're now on our mailing list."}
                                        </p>
                                        <button onClick={resetForm} className="text-green-600 font-bold hover:underline">
                                            Send another
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* Contact Form */}
                                        {activeTab === 'contact' && (
                                            <>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Name *</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-charcoal placeholder-gray-400 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-all"
                                                        placeholder="Your name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                                                    <input
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-charcoal placeholder-gray-400 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-all"
                                                        placeholder="your@email.com"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Message *</label>
                                                    <textarea
                                                        required
                                                        rows={4}
                                                        value={formData.message}
                                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-charcoal placeholder-gray-400 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-all resize-none"
                                                        placeholder="Your message..."
                                                    />
                                                </div>
                                            </>
                                        )}

                                        {/* Volunteer Form */}
                                        {activeTab === 'volunteer' && (
                                            <>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Name *</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-charcoal placeholder-gray-400 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-all"
                                                        placeholder="Your name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                                                    <input
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-charcoal placeholder-gray-400 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-all"
                                                        placeholder="your@email.com"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone *</label>
                                                    <input
                                                        type="tel"
                                                        required
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-charcoal placeholder-gray-400 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-all"
                                                        placeholder="+233 00 000 0000"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Skills & Experience</label>
                                                    <textarea
                                                        rows={3}
                                                        value={formData.skills}
                                                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-charcoal placeholder-gray-400 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-all resize-none"
                                                        placeholder="Event planning, photography, social media..."
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Availability</label>
                                                    <input
                                                        type="text"
                                                        value={formData.availability}
                                                        onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-charcoal placeholder-gray-400 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-all"
                                                        placeholder="Weekends, monthly events, etc."
                                                    />
                                                </div>
                                            </>
                                        )}

                                        {/* Newsletter Form */}
                                        {activeTab === 'newsletter' && (
                                            <>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                                                    <input
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-charcoal placeholder-gray-400 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-all"
                                                        placeholder="Your name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                                                    <input
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-charcoal placeholder-gray-400 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-all"
                                                        placeholder="your@email.com"
                                                    />
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Get updates on upcoming events, travel experiences, and community news. We won't spam you!
                                                </p>
                                            </>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-charcoal text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="animate-spin" size={20} />
                                                    {activeTab === 'contact' && 'Sending...'}
                                                    {activeTab === 'volunteer' && 'Submitting...'}
                                                    {activeTab === 'newsletter' && 'Subscribing...'}
                                                </>
                                            ) : (
                                                <>
                                                    {activeTab === 'contact' && 'Send Message'}
                                                    {activeTab === 'volunteer' && 'Submit Application'}
                                                    {activeTab === 'newsletter' && 'Subscribe'}
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
