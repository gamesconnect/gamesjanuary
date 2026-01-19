import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const galleryImages = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800',
        alt: 'Game Day competition',
        category: 'Game Day',
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800',
        alt: 'Community gathering',
        category: 'Community',
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        alt: 'Akosombo trip',
        category: 'Travel',
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
        alt: 'Party night',
        category: 'Party',
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800',
        alt: 'Trivia night',
        category: 'Trivia',
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800',
        alt: 'Celebration',
        category: 'Events',
    },
];

export default function GalleryPreview() {
    return (
        <section className="py-24 md:py-32 bg-cream">
            <div className="container mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="divider-text mb-6">
                            <span>Memories</span>
                        </div>
                        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-forest leading-[1.1]">
                            Fresh Stories &
                            <br />
                            Captured Moments
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            to="/gallery"
                            className="inline-flex items-center gap-2 text-forest font-medium hover:gap-3 transition-all"
                        >
                            <span>View Full Gallery</span>
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative group overflow-hidden rounded-xl ${index === 0 || index === 5 ? 'row-span-2' : ''
                                }`}
                        >
                            <div className={`aspect-square ${index === 0 || index === 5 ? 'aspect-[3/4]' : ''} overflow-hidden`}>
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <span className="text-white font-medium">{image.category}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
