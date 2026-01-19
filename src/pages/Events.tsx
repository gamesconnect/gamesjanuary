import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Search, ArrowRight, Loader2, Clock } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';

const categories = [
    { value: 'all', label: 'All Events' },
    { value: 'game-day', label: 'Game Days' },
    { value: 'trivia', label: 'Trivia' },
    { value: 'travel', label: 'Travel' },
    { value: 'party', label: 'Parties' },
];

export default function Events() {
    const { events, loading } = useEvents();
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [showPast, setShowPast] = useState(false);

    const now = new Date();

    const filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        const isPast = eventDate < now;

        if (!showPast && isPast) return false;
        if (showPast && !isPast) return false;

        if (filter !== 'all' && event.category !== filter) return false;
        if (search && !event.title.toLowerCase().includes(search.toLowerCase())) return false;

        return true;
    });

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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream">
                <Loader2 className="w-8 h-8 text-forest animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-cream min-h-screen">
            {/* Hero */}
            <section className="pt-32 pb-16 bg-cream">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <div className="divider-text mb-6">
                            <span>Experiences</span>
                        </div>
                        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-medium text-forest mb-6 leading-[1.05]">
                            Upcoming
                            <br />
                            Events
                        </h1>
                        <p className="text-xl text-forest/60 max-w-xl leading-relaxed">
                            From game days to travel adventures, find your next unforgettable experience with Games & Connect.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters */}
            <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-y border-forest/5 py-5">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full lg:w-96">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-forest/40" size={18} />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-14 pr-5 py-3.5 bg-cream border border-forest/10 rounded-xl text-forest placeholder-forest/40 focus:outline-none focus:border-forest transition-all"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-3 justify-center">
                            {categories.map((cat) => (
                                <button
                                    key={cat.value}
                                    onClick={() => setFilter(cat.value)}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${filter === cat.value
                                        ? 'bg-forest text-white'
                                        : 'bg-cream text-forest/70 hover:bg-forest/5'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Past/Upcoming Toggle */}
                        <div className="flex items-center gap-1.5 bg-cream rounded-xl p-1.5">
                            <button
                                onClick={() => setShowPast(false)}
                                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${!showPast ? 'bg-white text-forest shadow-sm' : 'text-forest/50'
                                    }`}
                            >
                                Upcoming
                            </button>
                            <button
                                onClick={() => setShowPast(true)}
                                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${showPast ? 'bg-white text-forest shadow-sm' : 'text-forest/50'
                                    }`}
                            >
                                Past
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-20">
                <div className="container mx-auto px-6 md:px-12">
                    {filteredEvents.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link to={`/events/${event.id}`} className="group block">
                                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-forest/5">
                                            {/* Image */}
                                            <div className="relative aspect-[4/3] overflow-hidden">
                                                <img
                                                    src={event.image_url || 'https://via.placeholder.com/400x300'}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute top-5 left-5">
                                                    <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-forest text-xs font-medium rounded-full capitalize">
                                                        {event.category.replace('-', ' ')}
                                                    </span>
                                                </div>
                                                {event.is_featured && (
                                                    <div className="absolute top-5 right-5">
                                                        <span className="px-4 py-2 bg-forest text-white text-xs font-medium rounded-full">
                                                            Featured
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-7">
                                                <h3 className="font-heading text-xl font-medium text-forest mb-4 group-hover:text-forest-light transition-colors">
                                                    {event.title}
                                                </h3>

                                                <div className="flex flex-wrap gap-5 text-forest/60 text-sm mb-5">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar size={15} />
                                                        <span>{formatDate(event.date)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock size={15} />
                                                        <span>{formatTime(event.date)}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 text-forest/60 text-sm mb-6">
                                                    <MapPin size={15} />
                                                    <span>{event.location}</span>
                                                </div>

                                                <div className="flex items-center justify-between pt-5 border-t border-forest/5">
                                                    <div>
                                                        {event.price !== null && event.price > 0 ? (
                                                            <span className="text-xl font-heading font-semibold text-forest">
                                                                GH₵{event.early_bird_price || event.price}
                                                            </span>
                                                        ) : (
                                                            <span className="text-xl font-heading font-semibold text-forest">Free</span>
                                                        )}
                                                    </div>
                                                    <div className="w-11 h-11 rounded-full border border-forest/20 flex items-center justify-center group-hover:bg-forest group-hover:border-forest group-hover:text-white text-forest transition-all">
                                                        <ArrowRight size={16} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-2xl border border-forest/10">
                            <Search className="w-12 h-12 text-forest/20 mx-auto mb-4" />
                            <h3 className="font-heading text-xl font-medium text-forest mb-2">No events found</h3>
                            <p className="text-forest/60">Try adjusting your filters or search terms.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
