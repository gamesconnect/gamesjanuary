import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Calendar, Clock } from 'lucide-react';
import type { Event } from '../../types';

// Mock data
const mockEvents: Event[] = [
    {
        id: '1',
        title: 'Game Day: February Edition',
        description: 'Monthly games day featuring team competitions, board games, and more!',
        date: '2026-02-01T10:00:00Z',
        end_date: '2026-02-01T18:00:00Z',
        location: 'Nexus 9, Accra',
        price: 50,
        early_bird_price: 40,
        image_url: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800',
        category: 'game-day',
        is_featured: true,
        max_capacity: 100,
        created_at: '2026-01-01T00:00:00Z',
    },
    {
        id: '2',
        title: 'Trivia Friday: Pop Culture',
        description: 'Test your knowledge on movies, music, and more!',
        date: '2026-01-24T19:00:00Z',
        end_date: null,
        location: 'Virtual (WhatsApp)',
        price: 0,
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

    return (
        <section className="py-24 md:py-32 bg-warm-cream relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="divider-text mb-6">
                            <span>Upcoming</span>
                        </div>
                        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-forest leading-[1.1]">
                            Our Signature
                            <br />
                            Experiences
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            to="/events"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-forest text-white font-medium rounded-lg hover:bg-forest-light transition-all group"
                        >
                            <span>View All Events</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-forest/60 text-lg max-w-2xl mb-12"
                >
                    Our most beloved experiences combine authentic community connections with thoughtfully curated activities. Limited spots available.
                </motion.p>

                {/* Events Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.slice(0, 3).map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to={`/events/${event.id}`} className="group block">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-forest/5">
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={event.image_url}
                                            alt={event.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-forest text-xs font-medium rounded-full">
                                                {categoryLabels[event.category] || 'Event'}
                                            </span>
                                        </div>
                                        {event.is_featured && (
                                            <div className="absolute top-4 right-4">
                                                <span className="px-3 py-1.5 bg-forest text-white text-xs font-medium rounded-full">
                                                    Featured
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="font-heading text-xl font-medium text-forest mb-3 group-hover:text-forest-light transition-colors">
                                            {event.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-4 text-forest/60 text-sm mb-4">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={14} />
                                                <span>{formatDate(event.date)}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={14} />
                                                <span>{formatTime(event.date)}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-forest/60 text-sm mb-5">
                                            <MapPin size={14} />
                                            <span>{event.location}</span>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-forest/5">
                                            <div>
                                                {event.price !== null && event.price > 0 ? (
                                                    <span className="text-xl font-heading font-semibold text-forest">
                                                        GH₵{event.early_bird_price || event.price}
                                                    </span>
                                                ) : (
                                                    <span className="text-xl font-heading font-semibold text-forest">Free</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-forest font-medium text-sm group-hover:gap-3 transition-all">
                                                <span>Book Now</span>
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
