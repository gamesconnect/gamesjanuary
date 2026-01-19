import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, MessageCircle, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const footerLinks = {
    explore: [
        { name: 'Events', path: '/events' },
        { name: 'Travel', path: '/travel' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'About Us', path: '/about' },
    ],
    support: [
        { name: 'Contact', path: '/contact' },
        { name: 'FAQs', path: '/faq' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
    ],
    social: [
        { name: 'Instagram', icon: Instagram, url: '#' },
        { name: 'Twitter', icon: Twitter, url: '#' },
        { name: 'Facebook', icon: Facebook, url: '#' },
        { name: 'WhatsApp', icon: MessageCircle, url: '#' },
    ]
};

export default function Footer() {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle subscription
        setEmail('');
    };

    return (
        <footer className="bg-white border-t border-forest/5">
            {/* Newsletter Section */}
            <div className="bg-forest">
                <div className="container mx-auto px-6 md:px-12 py-16 md:py-20">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                        <div className="max-w-lg">
                            <h3 className="font-heading text-2xl md:text-3xl font-medium text-white mb-3">
                                Don't Miss a Departure
                            </h3>
                            <p className="text-white/70">
                                Join 2,000+ community members. Get event updates and exclusive offers, 1-2 times a month.
                            </p>
                        </div>

                        <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-1 lg:w-72 px-5 py-3.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
                                required
                            />
                            <button
                                type="submit"
                                className="px-6 py-3.5 bg-white text-forest font-medium rounded-lg hover:bg-cream transition-colors flex items-center justify-center gap-2"
                            >
                                <span>Subscribe</span>
                                <ArrowRight size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="container mx-auto px-6 md:px-12 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-forest rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">G</span>
                            </div>
                            <span className="text-xl font-heading font-semibold text-forest">
                                Games & Connect
                            </span>
                        </Link>
                        <p className="text-forest/60 text-sm leading-relaxed mb-6">
                            Bespoke experiences crafted with care—small groups, authentic connections, stories that stay with you.
                        </p>
                        <div className="space-y-2 text-sm text-forest/60">
                            <a href="tel:+233123456789" className="flex items-center gap-2 hover:text-forest transition-colors">
                                <Phone size={14} />
                                <span>+233 123 456 789</span>
                            </a>
                            <a href="mailto:hello@gamesconnect.com" className="flex items-center gap-2 hover:text-forest transition-colors">
                                <Mail size={14} />
                                <span>hello@gamesconnect.com</span>
                            </a>
                            <div className="flex items-center gap-2">
                                <MapPin size={14} />
                                <span>Accra, Ghana</span>
                            </div>
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h4 className="font-heading font-medium text-forest mb-5">Explore</h4>
                        <ul className="space-y-3">
                            {footerLinks.explore.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-forest/60 hover:text-forest transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-heading font-medium text-forest mb-5">Support</h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-forest/60 hover:text-forest transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h4 className="font-heading font-medium text-forest mb-5">Follow Us</h4>
                        <div className="flex flex-wrap gap-3">
                            {footerLinks.social.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-forest/5 hover:bg-forest hover:text-white text-forest transition-all"
                                    aria-label={social.name}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-forest/10 text-sm text-forest/50">
                    <p>© {new Date().getFullYear()} Games & Connect. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-forest transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-forest transition-colors">Terms</Link>
                        <a href="#" className="hover:text-forest transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
