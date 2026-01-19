import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Travel', path: '/travel' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <>
            {/* Top Utility Bar */}
            <div className="hidden lg:block bg-forest text-white/80 text-sm py-2">
                <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                    <span className="text-xs tracking-wider">Available 24/7</span>
                    <div className="flex items-center gap-6">
                        <a href="tel:+233123456789" className="flex items-center gap-2 hover:text-white transition-colors">
                            <Phone size={14} />
                            <span>+233 123 456 789</span>
                        </a>
                        <a href="mailto:hello@gamesconnect.com" className="flex items-center gap-2 hover:text-white transition-colors">
                            <Mail size={14} />
                            <span>hello@gamesconnect.com</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                        ? 'py-3 bg-white/95 backdrop-blur-md shadow-sm border-b border-forest/5'
                        : 'py-5 bg-cream'
                    }`}
            >
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="relative z-50 group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-forest rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">G</span>
                                </div>
                                <span className="text-xl font-heading font-semibold text-forest">
                                    Games & Connect
                                </span>
                            </div>
                        </Link>

                        {/* Center Navigation - Desktop */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-sm font-medium transition-colors relative ${location.pathname === link.path
                                            ? 'text-forest'
                                            : 'text-forest/60 hover:text-forest'
                                        }`}
                                >
                                    {link.name}
                                    {location.pathname === link.path && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-forest rounded-full"
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-4">
                            {/* CTA Button */}
                            <Link
                                to="/events"
                                className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-white text-sm font-medium rounded-lg hover:bg-forest-light transition-all group"
                            >
                                <span>Begin Your Journey</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            {/* Mobile Toggle */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden p-2 rounded-lg transition-colors z-50 text-forest hover:bg-forest/5"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-forest/20 backdrop-blur-sm z-40 lg:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 bottom-0 w-full md:w-[400px] bg-cream z-50 lg:hidden shadow-2xl"
                    >
                        {/* Close Button */}
                        <div className="absolute top-5 right-6">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-forest hover:bg-forest/5 rounded-lg transition-colors"
                                aria-label="Close menu"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col h-full p-8 pt-20">
                            {/* Logo */}
                            <div className="mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-forest rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">G</span>
                                    </div>
                                    <span className="text-xl font-heading font-semibold text-forest">
                                        Games & Connect
                                    </span>
                                </div>
                            </div>

                            {/* Navigation Links */}
                            <div className="flex-1 flex flex-col gap-1">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.path}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                    >
                                        <Link
                                            to={link.path}
                                            className={`block py-4 text-xl font-heading border-b border-forest/10 transition-colors ${location.pathname === link.path
                                                    ? 'text-forest'
                                                    : 'text-forest/50 hover:text-forest'
                                                }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Bottom CTA */}
                            <div className="mt-auto pt-8 border-t border-forest/10">
                                <Link
                                    to="/events"
                                    className="w-full flex items-center justify-center gap-2 py-4 bg-forest text-white font-medium rounded-lg hover:bg-forest-light transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span>Begin Your Journey</span>
                                    <ArrowRight size={18} />
                                </Link>

                                {/* Contact Info */}
                                <div className="mt-6 space-y-3 text-sm text-forest/60">
                                    <a href="tel:+233123456789" className="flex items-center gap-2 hover:text-forest">
                                        <Phone size={14} />
                                        <span>+233 123 456 789</span>
                                    </a>
                                    <a href="mailto:hello@gamesconnect.com" className="flex items-center gap-2 hover:text-forest">
                                        <Mail size={14} />
                                        <span>hello@gamesconnect.com</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
