import { Link } from 'react-router-dom';
import { Instagram, Facebook, ArrowRight, ArrowUpRight, MessageCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const footerLinks = {
    navigation: [
        { name: 'Home', path: '/' },
        { name: 'Events', path: '/events' },
        { name: 'Travel', path: '/travel' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'About', path: '/about' },
    ],
    social: [
        { name: 'WhatsApp', icon: MessageCircle, url: 'https://wa.me/233505891665' },
        { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/gamesandconnectgh' },
        { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/gamesandconnectgh' },
    ]
};

export default function Footer() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setEmail('');
        setIsSubmitting(false);
    };

    return (
        <footer className="bg-bg-secondary relative overflow-hidden">
            {/* Gradient Decoration */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Main Footer Content */}
            <div className="container mx-auto py-20 lg:py-24 relative">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Left Column - Brand & Newsletter */}
                    <div className="lg:col-span-6">
                        {/* Brand */}
                        <Link to="/" className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple to-pink rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">G</span>
                            </div>
                            <span className="text-xl font-heading font-semibold text-white">
                                Games & Connect
                            </span>
                        </Link>

                        <p className="text-gray-400 max-w-md mb-10 leading-relaxed">
                            Ghana's most vibrant community where adventure meets connection.
                            Play, travel, and build meaningful relationships that last a lifetime.
                        </p>

                        {/* Newsletter */}
                        <div className="mb-10">
                            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase flex items-center gap-2">
                                <Sparkles size={14} className="text-purple-light" />
                                Stay Updated
                            </h4>
                            <form onSubmit={handleSubscribe} className="flex gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 px-5 py-3.5 bg-bg-tertiary border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple transition-colors"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-3.5 bg-gradient-to-r from-purple to-pink text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple/30 transition-all flex items-center gap-2 disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <span>...</span>
                                    ) : (
                                        <>
                                            <span className="hidden sm:inline">Subscribe</span>
                                            <ArrowRight size={16} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {footerLinks.social.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3 }}
                                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-gradient-to-br hover:from-purple/20 hover:to-pink/20 hover:border-purple/50 transition-all"
                                    aria-label={social.name}
                                >
                                    <social.icon size={18} className="text-gray-400" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Navigation */}
                    <div className="lg:col-span-6">
                        <div className="grid sm:grid-cols-2 gap-12">
                            {/* Navigation Links */}
                            <div>
                                <h4 className="text-sm font-semibold text-white mb-6 tracking-wide uppercase">
                                    Navigation
                                </h4>
                                <ul className="space-y-4">
                                    {footerLinks.navigation.map((link) => (
                                        <li key={link.path}>
                                            <Link
                                                to={link.path}
                                                className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                                            >
                                                {link.name}
                                                <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-purple-light" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h4 className="text-sm font-semibold text-white mb-6 tracking-wide uppercase">
                                    Contact
                                </h4>
                                <ul className="space-y-4 text-gray-400">
                                    <li>
                                        <a href="mailto:events@gamesandconnect.com" className="hover:text-white transition-colors">
                                            events@gamesandconnect.com
                                        </a>
                                    </li>
                                    <li>
                                        <a href="tel:+233505891665" className="hover:text-white transition-colors">
                                            +233 50 589 1665
                                        </a>
                                    </li>
                                    <li>Accra, Ghana</li>
                                </ul>

                                {/* CTA */}
                                <a
                                    href="https://wa.me/233505891665"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-8 px-5 py-3 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl text-green-400 hover:bg-green-500/30 transition-all group"
                                >
                                    <MessageCircle size={16} />
                                    <span>Chat on WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5">
                <div className="container mx-auto py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                        <p>© {new Date().getFullYear()} Games & Connect Ghana. All rights reserved.</p>
                        <div className="flex gap-8">
                            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
