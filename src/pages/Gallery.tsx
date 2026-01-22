import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Search } from 'lucide-react';

interface GalleryImage {
    id: number;
    url: string;
    category: string;
    caption: string;
}

const galleryImages: GalleryImage[] = [
    { id: 1, url: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800', category: 'game-day', caption: 'Game Day competition' },
    { id: 2, url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800', category: 'game-day', caption: 'Friends enjoying board games' },
    { id: 3, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', category: 'travel', caption: 'Akosombo sunset' },
    { id: 4, url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800', category: 'party', caption: 'Dance floor vibes' },
    { id: 5, url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800', category: 'game-day', caption: 'Team celebration' },
    { id: 6, url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800', category: 'game-day', caption: 'Epic moments' },
    { id: 7, url: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800', category: 'travel', caption: 'Beach day' },
    { id: 8, url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800', category: 'party', caption: 'Valentine\'s party' },
    { id: 9, url: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800', category: 'game-day', caption: 'Video game tournament' },
    { id: 10, url: 'https://images.unsplash.com/photo-1580746738099-78d6833b3bb7?w=800', category: 'travel', caption: 'Cape Coast Castle' },
    { id: 11, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', category: 'travel', caption: 'Mountain views' },
    { id: 12, url: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800', category: 'trivia', caption: 'Trivia night winners' },
];

const categories = [
    { value: 'all', label: 'All' },
    { value: 'game-day', label: 'Game Days' },
    { value: 'travel', label: 'Travel' },
    { value: 'party', label: 'Parties' },
    { value: 'trivia', label: 'Trivia' },
];

export default function Gallery() {
    const [filter, setFilter] = useState('all');
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    const filteredImages = filter === 'all'
        ? galleryImages
        : galleryImages.filter(img => img.category === filter);

    const currentIndex = selectedImage
        ? filteredImages.findIndex(img => img.id === selectedImage.id)
        : -1;

    const goToPrev = () => {
        if (currentIndex > 0) {
            setSelectedImage(filteredImages[currentIndex - 1]);
        }
    };

    const goToNext = () => {
        if (currentIndex < filteredImages.length - 1) {
            setSelectedImage(filteredImages[currentIndex + 1]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') goToPrev();
        if (e.key === 'ArrowRight') goToNext();
        if (e.key === 'Escape') setSelectedImage(null);
    };

    return (
        <div className="bg-cream min-h-screen">
            {/* Hero */}
            <section className="pt-36 lg:pt-44 pb-16 bg-cream">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <div className="divider-text mb-6">
                            <span>Memories</span>
                        </div>
                        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-medium text-forest mb-6 leading-[1.05]">
                            Our Gallery
                        </h1>
                        <p className="text-xl text-forest/60">
                            Memories from game days, travel adventures, and community vibes.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter */}
            <section className="py-5 border-y border-forest/5 bg-white/80 backdrop-blur-md sticky top-0 z-40">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setFilter(cat.value)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${filter === cat.value
                                    ? 'bg-forest text-white'
                                    : 'bg-cream text-forest/70 hover:bg-forest/5'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-20">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
                        <AnimatePresence>
                            {filteredImages.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative"
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <img
                                        src={image.url}
                                        alt={image.caption}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Caption */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        <p className="text-sm font-medium text-white">{image.caption}</p>
                                        <p className="text-xs text-white/70 capitalize mt-0.5">{image.category.replace('-', ' ')}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredImages.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-2xl border border-forest/10">
                            <Search className="w-12 h-12 text-forest/20 mx-auto mb-4" />
                            <h3 className="font-heading text-xl font-medium text-forest mb-2">No images found</h3>
                            <p className="text-forest/60">Try selecting a different category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-forest/95 backdrop-blur-xl z-50 flex items-center justify-center"
                        onClick={() => setSelectedImage(null)}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-20"
                        >
                            <X size={24} />
                        </button>

                        {/* Navigation */}
                        {currentIndex > 0 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                                className="absolute left-6 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-20"
                            >
                                <ChevronLeft size={24} />
                            </button>
                        )}
                        {currentIndex < filteredImages.length - 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                                className="absolute right-6 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-20"
                            >
                                <ChevronRight size={24} />
                            </button>
                        )}

                        {/* Image */}
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="max-w-6xl max-h-[85vh] relative p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative rounded-2xl overflow-hidden">
                                <img
                                    src={selectedImage.url}
                                    alt={selectedImage.caption}
                                    className="max-w-full max-h-[80vh] object-contain"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-forest/90 to-transparent text-white">
                                    <h3 className="font-heading text-xl font-medium text-center">{selectedImage.caption}</h3>
                                    <p className="text-center text-white/70 text-sm capitalize mt-1">{selectedImage.category.replace('-', ' ')}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Counter */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium text-white/70 bg-white/10 px-4 py-2 rounded-full">
                            {currentIndex + 1} / {filteredImages.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
