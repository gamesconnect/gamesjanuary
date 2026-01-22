import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        quote: "Every event felt unhurried yet full—great games, golden-hour conversations, and organizers who knew every detail. The small group size meant we could truly connect with the community.",
        author: 'Ama Serwaa',
        location: 'Accra, Ghana',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        event: 'Game Day: December Edition',
        rating: 5,
    },
    {
        id: 2,
        quote: "The Akosombo trip was absolutely breathtaking. The boat rides, the sunset views, and the amazing company made it an unforgettable weekend. Games & Connect really knows how to curate experiences.",
        author: 'Kwame Mensah',
        location: 'Tema, Ghana',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        event: 'Akosombo Weekend Retreat',
        rating: 5,
    },
    {
        id: 3,
        quote: "Trivia Fridays have become my favorite part of the week. The questions are challenging, the community is supportive, and it's a great way to learn new things while having fun.",
        author: 'Efua Donkor',
        location: 'Kumasi, Ghana',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        event: 'Trivia Friday',
        rating: 5,
    },
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-20 lg:py-28 bg-bg-tertiary overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto relative px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14 lg:mb-20"
                >
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-light to-orange uppercase tracking-wider mb-5">
                        <Sparkles size={14} className="text-pink-light" />
                        Testimonials
                    </span>
                    <h2 className="heading-lg text-white mb-6">
                        What our <span className="text-gradient">community</span> says
                    </h2>
                    <div className="flex items-center justify-center gap-3">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-yellow fill-yellow" />
                            ))}
                        </div>
                        <span className="text-2xl font-heading font-bold text-white ml-2">4.9</span>
                        <span className="text-gray-500">/ 5</span>
                    </div>
                    <p className="text-gray-400 mt-5 max-w-lg mx-auto">
                        Every journey we organize is built on trust, safety, and unforgettable views.
                    </p>
                </motion.div>

                {/* Testimonial Cards - 3 Column Grid */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-bg-secondary rounded-3xl p-10 border border-white/5 hover:border-purple/30 transition-all group"
                        >
                            {/* Quote Icon */}
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple/20 to-pink/20 flex items-center justify-center mb-8">
                                <Quote className="w-5 h-5 text-purple-light" />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1.5 mb-8">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow fill-yellow" />
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="text-gray-300 leading-relaxed mb-10 text-base">
                                "{testimonial.quote}"
                            </blockquote>

                            {/* Author */}
                            <div className="flex items-center gap-5 pt-8 border-t border-white/5">
                                <div className="relative">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.author}
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple to-pink rounded-full flex items-center justify-center">
                                        <span className="text-white text-[9px]">✓</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="font-semibold text-white text-lg">{testimonial.author}</div>
                                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Carousel */}
                <div className="lg:hidden">
                    <div className="max-w-xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-bg-secondary rounded-3xl p-10 border border-white/5"
                            >
                                {/* Quote Icon */}
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple/20 to-pink/20 flex items-center justify-center mb-8">
                                    <Quote className="w-5 h-5 text-purple-light" />
                                </div>

                                {/* Stars */}
                                <div className="flex gap-1.5 mb-8">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow fill-yellow" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <blockquote className="text-gray-300 leading-relaxed mb-10">
                                    "{testimonials[currentIndex].quote}"
                                </blockquote>

                                {/* Author */}
                                <div className="flex items-center gap-5 pt-8 border-t border-white/5">
                                    <img
                                        src={testimonials[currentIndex].avatar}
                                        alt={testimonials[currentIndex].author}
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <div className="font-semibold text-white">{testimonials[currentIndex].author}</div>
                                        <div className="text-sm text-gray-500">{testimonials[currentIndex].location}</div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex items-center justify-center gap-8 mt-10">
                            <button
                                onClick={prev}
                                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-gradient-to-r hover:from-purple hover:to-pink hover:border-transparent text-white transition-all"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {/* Dots */}
                            <div className="flex gap-3">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-2.5 rounded-full transition-all ${index === currentIndex
                                            ? 'w-10 bg-gradient-to-r from-purple to-pink'
                                            : 'w-2.5 bg-white/20 hover:bg-white/40'
                                            }`}
                                        aria-label={`Go to testimonial ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={next}
                                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-gradient-to-r hover:from-purple hover:to-pink hover:border-transparent text-white transition-all"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
