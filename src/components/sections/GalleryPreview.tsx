import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Trophy, Sparkles } from 'lucide-react';

const galleryImages = [
    {
        id: 1,
        src: 'https://res.cloudinary.com/drkjnrvtu/image/upload/v1742488676/_MG_1656_yoiklo.jpg',
        alt: 'Games and Connect event',
        category: 'Game Day',
    },
    {
        id: 2,
        src: 'https://res.cloudinary.com/drkjnrvtu/image/upload/v1742488676/_MG_1758_mj5kho.jpg',
        alt: 'Community gathering',
        category: 'Community',
    },
    {
        id: 3,
        src: 'https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915398/_MG_2403_hknyss.jpg',
        alt: 'Team Green champions',
        category: 'Champions',
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
        alt: 'Beach adventure',
        category: 'Travel',
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        alt: 'Travel views',
        category: 'Travel',
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800',
        alt: 'Team bonding',
        category: 'Community',
    },
];

export default function GalleryPreview() {
    return (
        <section className="py-20 lg:py-28 bg-bg-primary relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto relative px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-14 lg:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-light to-cyan uppercase tracking-wider mb-5">
                            <Sparkles size={14} className="text-cyan" />
                            Gallery
                        </span>
                        <h2 className="heading-lg text-white">
                            Real moments from
                            <br className="hidden md:block" />
                            our <span className="text-gradient-secondary">adventures</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Link
                            to="/gallery"
                            className="inline-flex items-center gap-3 px-7 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-gradient-to-r hover:from-blue hover:to-cyan hover:border-transparent transition-all duration-300 group"
                        >
                            <span>View Full Gallery</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.08 }}
                            className={`relative group overflow-hidden rounded-3xl border border-white/5 hover:border-purple/30 transition-all ${index === 0 || index === 5 ? 'row-span-2' : ''
                                }`}
                        >
                            <Link to="/gallery" className="block">
                                <div className={`${index === 0 || index === 5 ? 'aspect-[3/4]' : 'aspect-square'
                                    } overflow-hidden`}>
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-semibold">{image.category}</span>
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple to-pink flex items-center justify-center">
                                            <ArrowUpRight size={14} className="text-white" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Latest Champions Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 lg:mt-20 p-1 rounded-3xl bg-gradient-to-r from-purple via-pink to-orange"
                >
                    <div className="p-10 lg:p-16 bg-bg-secondary rounded-[22px]">
                        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                            <div>
                                <span className="inline-flex items-center gap-2 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow to-orange uppercase tracking-wider mb-5">
                                    <Trophy size={14} className="text-yellow" />
                                    Latest Champions
                                </span>
                                <h3 className="heading-md text-white mb-5">
                                    Team Green wins Akosombo Games Day
                                </h3>
                                <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                                    Congratulations to Team Green (Nature's Force) for winning the Outdoor Games Champion title at our recent Akosombo Games Day!
                                </p>
                                <Link
                                    to="/events"
                                    className="inline-flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-purple to-pink text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple/30 transition-all"
                                >
                                    <span>Join Next Event</span>
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                            <div className="rounded-2xl overflow-hidden border border-white/10">
                                <img
                                    src="https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915398/_MG_2403_hknyss.jpg"
                                    alt="Team Green Victory"
                                    className="w-full h-72 lg:h-80 object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
