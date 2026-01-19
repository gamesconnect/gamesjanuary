import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Users, Calendar, MapPin } from 'lucide-react';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-screen bg-cream overflow-hidden">
            {/* Background Elements */}
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-warm-cream to-transparent" />
            </motion.div>

            {/* Content */}
            <motion.div style={{ opacity }} className="container mx-auto px-6 md:px-12 relative z-10 pt-16 md:pt-24 pb-16">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-7">
                        {/* Decorative Divider */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="divider-text mb-8"
                        >
                            <span>Since 2024</span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-heading text-forest text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight mb-8"
                        >
                            Curated Experiences
                            <br />
                            for the Curious Soul
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-forest/60 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
                        >
                            Discover bespoke gaming events, travel experiences, and community
                            gatherings that blend authenticity with elegance, where every moment
                            is thoughtfully composed.
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <Link
                                to="/events"
                                className="inline-flex items-center gap-3 px-7 py-4 bg-forest text-white font-medium rounded-lg hover:bg-forest-light transition-all group"
                            >
                                <span>Start Planning</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        {/* Stats Row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-forest/10"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-forest/5 flex items-center justify-center">
                                    <Star className="w-5 h-5 text-forest" />
                                </div>
                                <div>
                                    <span className="block text-2xl font-heading font-semibold text-forest">4.9</span>
                                    <span className="text-sm text-forest/50">Rating</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-forest/5 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-forest" />
                                </div>
                                <div>
                                    <span className="block text-2xl font-heading font-semibold text-forest">2K+</span>
                                    <span className="text-sm text-forest/50">Members</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-forest/5 flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-forest" />
                                </div>
                                <div>
                                    <span className="block text-2xl font-heading font-semibold text-forest">50+</span>
                                    <span className="text-sm text-forest/50">Events</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Booking Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="lg:col-span-5"
                    >
                        <div className="bg-white rounded-2xl p-8 shadow-xl shadow-forest/5 border border-forest/5">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-2 h-2 rounded-full bg-forest" />
                                <span className="text-xs font-medium tracking-wider uppercase text-forest">Plan Your Experience</span>
                            </div>

                            <div className="space-y-5">
                                {/* Event Type */}
                                <div>
                                    <label className="block text-sm font-medium text-forest mb-2">Event Type</label>
                                    <select className="w-full px-4 py-3 bg-cream border border-forest/10 rounded-lg text-forest focus:outline-none focus:border-forest transition-colors">
                                        <option>Game Day</option>
                                        <option>Trivia Night</option>
                                        <option>Travel Experience</option>
                                        <option>Community Event</option>
                                    </select>
                                </div>

                                {/* Date */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-forest mb-2">Date</label>
                                        <input
                                            type="text"
                                            placeholder="Choose date"
                                            className="w-full px-4 py-3 bg-cream border border-forest/10 rounded-lg text-forest placeholder:text-forest/40 focus:outline-none focus:border-forest transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-forest mb-2">Guests</label>
                                        <input
                                            type="number"
                                            placeholder="1"
                                            min="1"
                                            className="w-full px-4 py-3 bg-cream border border-forest/10 rounded-lg text-forest placeholder:text-forest/40 focus:outline-none focus:border-forest transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Link
                                    to="/events"
                                    className="w-full flex items-center justify-center gap-2 py-4 bg-forest text-white font-medium rounded-lg hover:bg-forest-light transition-all mt-2"
                                >
                                    <span>Browse Events</span>
                                    <ArrowRight size={18} />
                                </Link>
                            </div>

                            <p className="text-center text-sm text-forest/50 mt-6">
                                Trusted by 2,000+ members across Ghana
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Image Gallery */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mt-20"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {
                                image: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600",
                                title: "Game Days",
                                location: "Accra"
                            },
                            {
                                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
                                title: "Travel Experiences",
                                location: "Akosombo"
                            },
                            {
                                image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600",
                                title: "Community Events",
                                location: "Tema"
                            },
                            {
                                image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600",
                                title: "Trivia Nights",
                                location: "Virtual"
                            }
                        ].map((item, index) => (
                            <Link
                                key={index}
                                to="/events"
                                className="group relative rounded-xl overflow-hidden aspect-[4/5]"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <h3 className="text-white font-heading text-lg font-medium mb-1">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-1 text-white/70 text-sm">
                                        <MapPin size={14} />
                                        <span>{item.location}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
