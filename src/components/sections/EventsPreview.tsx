import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import type { Event } from '../../types';

// Mock data
const mockEvents: Event[] = [
    {
        id: '1',
        title: 'Game Day: February Edition',
        description: 'Monthly games day featuring team competitions, board games, and more!',
        date: '2026-02-01T10:00:00Z',
        end_date: null,
        location: 'The Fun Factory, Accra',
        price: 50,
        early_bird_price: 35,
        image_url: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800',
        category: 'game-day',
        is_featured: true,
        max_capacity: 60,
        created_at: '2026-01-01T00:00:00Z',
    },
    {
        id: '2',
        title: 'Trivia Friday: Pop Culture',
        description: 'Test your knowledge of movies, music, and everything pop culture!',
        date: '2026-02-07T19:00:00Z',
        end_date: null,
        location: 'Virtual Event',
        price: 15,
        early_bird_price: null,
        image_url: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800',
        category: 'trivia',
        is_featured: false,
        max_capacity: null,
        created_at: '2026-01-01T00:00:00Z',
    },
    {
        id: '3',
        title: 'Akosombo Weekend Retreat',
        description: 'Escape to Akosombo for a weekend of fun, boat rides, and relaxation!',
        date: '2026-02-14T06:00:00Z',
        end_date: '2026-02-16T20:00:00Z',
        location: 'Akosombo, Ghana',
        price: 500,
        early_bird_price: 450,
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        category: 'travel',
        is_featured: true,
        max_capacity: 30,
        created_at: '2026-01-01T00:00:00Z',
    },
];

const categoryLabels: Record<string, string> = {
    'game-day': 'Game Day',
    'party': 'Party',
    'trivia': 'Trivia',
    'travel': 'Travel',
    'other': 'Event',
};

const categoryColors: Record<string, string> = {
    'game-day': 'from-purple to-pink',
    'party': 'from-pink to-orange',
    'trivia': 'from-blue to-cyan',
    'travel': 'from-cyan to-teal',
    'other': 'from-purple to-blue',
};

interface Props {
    events?: Event[];
}

export default function EventsPreview({ events = mockEvents }: Props) {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    const displayEvents = events.slice(0, 3);

    return (
        <section className="py-20 lg:py-28 bg-bg-secondary relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto relative px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 lg:mb-20"
                >
                    <div>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-light to-pink-light uppercase tracking-wider mb-5">
                            <Sparkles size={14} className="text-purple-light" />
                            Upcoming Events
                        </span>
                        <h2 className="heading-lg text-white">
                            Find your perfect <span className="text-gradient">experience</span>
                        </h2>
                    </div>
                    <Link
                        to="/events"
                        className="inline-flex items-center gap-3 text-gray-400 font-medium hover:text-white transition-colors group"
                    >
                        <span>See All Events</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Events Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {displayEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link to={`/events/${event.id}`} className="group block h-full">
                                <div className="bg-bg-tertiary rounded-3xl overflow-hidden transition-all duration-500 border border-white/5 hover:border-purple/30 hover:shadow-xl hover:shadow-purple/10 h-full flex flex-col">
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={event.image_url || 'https://via.placeholder.com/400x300'}
                                            alt={event.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-bg-tertiary via-transparent to-transparent" />

                                        {/* Category Badge */}
                                        <div className="absolute top-5 left-5">
                                            <span className={`px-4 py-2.5 bg-gradient-to-r ${categoryColors[event.category] || 'from-purple to-blue'} text-white text-xs font-semibold rounded-full shadow-lg capitalize`}>
                                                {categoryLabels[event.category] || event.category.replace('-', ' ')}
                                            </span>
                                        </div>
                                        {/* Price Badge */}
                                        <div className="absolute top-5 right-5">
                                            <span className="px-4 py-2.5 bg-white/10 backdrop-blur-md text-white text-sm font-bold rounded-full border border-white/20">
                                                {event.price !== null && event.price > 0
                                                    ? `GH₵${event.early_bird_price || event.price}`
                                                    : 'Free'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 lg:p-10 flex-1 flex flex-col">
                                        <h3 className="font-heading text-xl font-semibold text-white mb-5 group-hover:text-purple-light transition-colors line-clamp-2">
                                            {event.title}
                                        </h3>

                                        {/* Meta Info */}
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-5 text-gray-400 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={15} className="text-purple-light" />
                                                    <span>{formatDate(event.date)}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock size={15} className="text-pink-light" />
                                                    <span>{formatTime(event.date)}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                <MapPin size={15} className="text-cyan" />
                                                <span className="truncate">{event.location}</span>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                                            <span className="text-sm font-medium text-gray-500">
                                                View Details
                                            </span>
                                            <div className="w-11 h-11 rounded-full bg-gradient-to-r from-purple to-pink flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                                <ArrowRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
