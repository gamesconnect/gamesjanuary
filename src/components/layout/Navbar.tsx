import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
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
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'bg-bg-secondary/90 backdrop-blur-xl border-b border-white/5'
                    : 'bg-transparent'
                    }`}
            >
                <div className="container mx-auto">
                    <nav className="flex items-center justify-between h-20 lg:h-24">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple to-pink rounded-xl flex items-center justify-center transition-all group-hover:shadow-lg group-hover:shadow-purple/30">
                                <span className="text-white font-bold text-lg">G</span>
                            </div>
                            <div className="hidden sm:block">
                                <span className="text-lg font-heading font-semibold text-white">
                                    Games & Connect
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative text-sm font-medium transition-colors duration-300 ${location.pathname === link.path
                                        ? 'text-white'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                    {location.pathname === link.path && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-purple via-pink to-orange rounded-full"
                                            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center gap-4">
                            <Link
                                to="/events"
                                className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple via-pink to-orange text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple/30 hover:scale-[1.02]"
                            >
                                <Sparkles size={16} className="opacity-80" />
                                <span>Get Tickets</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <X size={20} className="text-white" />
                            ) : (
                                <Menu size={20} className="text-white" />
                            )}
                        </button>
                    </nav>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-bg-secondary border-l border-white/5 z-50 lg:hidden"
                        >
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b border-white/5">
                                    <span className="font-heading font-semibold text-white">Menu</span>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                                    >
                                        <X size={18} className="text-white" />
                                    </button>
                                </div>

                                {/* Links */}
                                <div className="flex-1 overflow-y-auto py-6">
                                    <div className="space-y-1 px-4">
                                        {navLinks.map((link, index) => (
                                            <motion.div
                                                key={link.path}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <Link
                                                    to={link.path}
                                                    className={`flex items-center justify-between px-4 py-4 rounded-xl transition-all ${location.pathname === link.path
                                                        ? 'bg-gradient-to-r from-purple/20 to-pink/20 text-white border border-purple/30'
                                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                                        }`}
                                                >
                                                    <span className="font-medium">{link.name}</span>
                                                    <ArrowRight size={16} className="opacity-50" />
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="p-6 border-t border-white/5">
                                    <Link
                                        to="/events"
                                        className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-purple via-pink to-orange text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-purple/30"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Sparkles size={16} />
                                        <span>Get Tickets</span>
                                        <ArrowRight size={16} />
                                    </Link>
                                    <p className="text-center text-sm text-gray-500 mt-4">
                                        Join 2,000+ members
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
