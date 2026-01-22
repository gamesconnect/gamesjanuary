import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Users, MapPin, Sparkles, Globe } from 'lucide-react';

const stats = [
    { value: '400+', label: 'Experiences', icon: Sparkles },
    { value: '200+', label: 'Destinations', icon: MapPin },
    { value: '10K+', label: 'Happy Travelers', icon: Users },
    { value: '50+', label: 'Countries', icon: Globe },
];

const galleryImages = [
    {
        image: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1742488676/_MG_1656_yoiklo.jpg",
        title: "Game Days",
        subtitle: "Play Together"
    },
    {
        image: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1742488676/_MG_1758_mj5kho.jpg",
        title: "Travel",
        subtitle: "Explore Ghana"
    },
    {
        image: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915398/_MG_2403_hknyss.jpg",
        title: "Community",
        subtitle: "Connect"
    },
    {
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
        title: "Adventures",
        subtitle: "Make Memories"
    }
];

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-screen bg-bg-primary overflow-hidden">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-purple/30 rounded-full blur-[120px] animate-float" />
                <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-pink/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-20 left-1/3 w-[300px] h-[300px] bg-blue/20 rounded-full blur-[80px] animate-float" style={{ animationDelay: '4s' }} />

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            {/* Content */}
            <motion.div style={{ opacity }} className="container mx-auto relative z-10 pt-40 lg:pt-52 pb-32">
                {/* Top Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-10"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                        <Star className="w-4 h-4 text-yellow fill-yellow" />
                        <span className="text-sm font-medium text-white">Ghana's Premier Experience Platform</span>
                    </div>
                </motion.div>

                {/* Main Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-center max-w-5xl mx-auto mb-8"
                >
                    <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1] tracking-tight">
                        Play. Travel.
                        <br />
                        <span className="text-gradient">Connect.</span>
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed px-6"
                >
                    Join a growing community of young Ghanaians making memories through fun,
                    adventure, and connection. Experience our exciting events, travel adventures,
                    and build lasting friendships.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20"
                >
                    <Link
                        to="/events"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple via-pink to-orange text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple/30 hover:scale-[1.02]"
                    >
                        <Sparkles size={18} className="opacity-80" />
                        <span>Explore Events</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        to="/gallery"
                        className="inline-flex items-center gap-3 px-8 py-4 text-white font-medium border border-white/20 rounded-xl hover:bg-white/5 hover:border-white/40 transition-all group"
                    >
                        <span>See Our Gallery</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="max-w-4xl mx-auto mb-24"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center p-6 lg:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple/30 transition-all"
                            >
                                <stat.icon className="w-6 h-6 text-purple-light mx-auto mb-4" />
                                <span className="block font-heading text-3xl lg:text-4xl font-bold text-white mb-2">{stat.value}</span>
                                <span className="text-sm text-gray-500">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Image Gallery Grid */}
                <motion.div
                    style={{ y }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-8"
                >
                    {galleryImages.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                        >
                            <Link
                                to="/events"
                                className="group relative block rounded-2xl overflow-hidden aspect-[3/4] border border-white/10 hover:border-purple/50 transition-all"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                                    <p className="text-purple-light text-xs uppercase tracking-wider mb-2 font-semibold">{item.subtitle}</p>
                                    <h3 className="text-white font-heading text-lg md:text-xl font-semibold">
                                        {item.title}
                                    </h3>
                                </div>
                                <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-white/20">
                                    <ArrowRight size={16} className="text-white" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
