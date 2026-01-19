import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        quote: "Every event felt unhurried yet full—great games, golden-hour conversations, and organizers who knew every detail. The small group size meant we could ask questions, linger at activities, and truly connect with the community. It wasn't just an event; it was a transformation.",
        author: 'Ama Serwaa',
        location: 'Accra, Ghana',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        event: 'Game Day: December Edition',
    },
    {
        id: 2,
        quote: "The Akosombo trip was absolutely breathtaking. The boat rides, the sunset views, and the amazing company made it an unforgettable weekend. Games & Connect really knows how to curate experiences.",
        author: 'Kwame Mensah',
        location: 'Tema, Ghana',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        event: 'Akosombo Weekend Retreat',
    },
    {
        id: 3,
        quote: "Trivia Fridays have become my favorite part of the week. The questions are challenging, the community is supportive, and it's a great way to learn new things while having fun.",
        author: 'Efua Donkor',
        location: 'Kumasi, Ghana',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        event: 'Trivia Friday',
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
        <section className="py-24 md:py-32 bg-forest text-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <span className="h-px w-12 bg-white/30" />
                        <span className="text-xs font-medium tracking-wider uppercase text-white/60">Testimonials</span>
                        <span className="h-px w-12 bg-white/30" />
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1]">
                        What Travelers Say
                    </h2>
                    <p className="text-white/60 text-lg mt-4 max-w-xl mx-auto">
                        Real experiences from our small-group events across Ghana.
                    </p>
                </motion.div>

                {/* Testimonial Carousel */}
                <div className="max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="text-center"
                        >
                            {/* Quote Icon */}
                            <div className="flex justify-center mb-8">
                                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                                    <Quote className="w-6 h-6 text-white/60" />
                                </div>
                            </div>

                            {/* Quote */}
                            <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl font-normal text-white leading-relaxed mb-10">
                                "{testimonials[currentIndex].quote}"
                            </blockquote>

                            {/* Author */}
                            <div className="flex items-center justify-center gap-4">
                                <img
                                    src={testimonials[currentIndex].avatar}
                                    alt={testimonials[currentIndex].author}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-white/20"
                                />
                                <div className="text-left">
                                    <div className="font-medium text-white">
                                        {testimonials[currentIndex].author}
                                    </div>
                                    <div className="text-sm text-white/60">
                                        {testimonials[currentIndex].location}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-6 mt-12">
                        <button
                            onClick={prev}
                            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                            ? 'w-8 bg-white'
                                            : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
