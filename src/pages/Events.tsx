import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Search, ArrowRight, Loader2, Clock, Sparkles } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';

const categories = [
    { value: 'all', label: 'All Events' },
    { value: 'game-day', label: 'Game Days' },
    { value: 'trivia', label: 'Trivia' },
    { value: 'travel', label: 'Travel' },
    { value: 'party', label: 'Parties' },
];

const categoryColors: Record<string, string> = {
    'game-day': 'from-purple to-pink',
    'party': 'from-pink to-orange',
    'trivia': 'from-blue to-cyan',
    'travel': 'from-cyan to-teal',
    'other': 'from-purple to-blue',
};

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
            <div className="min-h-screen flex items-center justify-center bg-bg-primary">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 text-purple animate-spin" />
                    <span className="text-gray-400">Loading events...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-bg-primary min-h-screen">
            {/* Hero */}
            <section className="pt-32 lg:pt-40 pb-16 bg-bg-primary relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="container mx-auto relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-light to-pink-light uppercase tracking-wider mb-4">
                            <Sparkles size={14} className="text-purple-light" />
                            Experiences
                        </span>
                        <h1 className="heading-xl text-white mb-6">
                            Find your perfect
                            <br />
                            <span className="text-gradient">experience</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                            From game days to travel adventures, discover your next unforgettable experience with Games & Connect.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters */}
            <section className="sticky top-20 lg:top-24 z-40 bg-bg-secondary/95 backdrop-blur-xl border-y border-white/5 py-5">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row gap-5 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full lg:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-bg-tertiary border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple transition-all"
                            />
                        </div>

                        {/* Category Pills */}
                        <div className="flex flex-wrap gap-2 justify-center">
                            {categories.map((cat) => (
                                <button
                                    key={cat.value}
                                    onClick={() => setFilter(cat.value)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${filter === cat.value
                                        ? 'bg-gradient-to-r from-purple to-pink text-white'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Toggle */}
                        <div className="flex items-center gap-1 bg-bg-tertiary rounded-xl p-1 border border-white/10">
                            <button
                                onClick={() => setShowPast(false)}
                                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${!showPast ? 'bg-gradient-to-r from-purple to-pink text-white' : 'text-gray-500'
                                    }`}
                            >
                                Upcoming
                            </button>
                            <button
                                onClick={() => setShowPast(true)}
                                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${showPast ? 'bg-gradient-to-r from-purple to-pink text-white' : 'text-gray-500'
                                    }`}
                            >
                                Past
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="section">
                <div className="container mx-auto">
                    {filteredEvents.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {filteredEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                >
                                    <Link to={`/events/${event.id}`} className="group block">
                                        <div className="bg-bg-secondary rounded-2xl overflow-hidden transition-all duration-500 border border-white/5 hover:border-purple/30 hover:shadow-xl hover:shadow-purple/10">
                                            {/* Image */}
                                            <div className="relative aspect-[4/3] overflow-hidden">
                                                <img
                                                    src={event.image_url || 'https://via.placeholder.com/400x300'}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                {/* Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent" />

                                                {/* Category Badge */}
                                                <div className="absolute top-4 left-4">
                                                    <span className={`px-4 py-2 bg-gradient-to-r ${categoryColors[event.category] || 'from-purple to-blue'} text-white text-xs font-semibold rounded-full shadow-lg capitalize`}>
                                                        {event.category.replace('-', ' ')}
                                                    </span>
                                                </div>
                                                {/* Featured Badge */}
                                                {event.is_featured && (
                                                    <div className="absolute top-4 right-4">
                                                        <span className="px-3 py-1.5 bg-gradient-to-r from-yellow to-orange text-white text-xs font-semibold rounded-full">
                                                            Featured
                                                        </span>
                                                    </div>
                                                )}
                                                {/* Price Badge */}
                                                <div className="absolute bottom-4 right-4">
                                                    <span className="px-4 py-2 bg-white/10 backdrop-blur-md text-white text-sm font-bold rounded-xl border border-white/20">
                                                        {event.price !== null && event.price > 0
                                                            ? `GH₵${event.early_bird_price || event.price}`
                                                            : 'Free'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <h3 className="font-heading text-xl font-semibold text-white mb-4 group-hover:text-purple-light transition-colors line-clamp-2">
                                                    {event.title}
                                                </h3>

                                                {/* Meta */}
                                                <div className="space-y-2 mb-5">
                                                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar size={14} className="text-purple-light" />
                                                            <span>{formatDate(event.date)}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Clock size={14} className="text-pink-light" />
                                                            <span>{formatTime(event.date)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                        <MapPin size={14} className="text-cyan" />
                                                        <span className="truncate">{event.location}</span>
                                                    </div>
                                                </div>

                                                {/* CTA */}
                                                <div className="flex items-center justify-between pt-5 border-t border-white/5">
                                                    <span className="text-sm font-medium text-gray-500">
                                                        View Details
                                                    </span>
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple to-pink flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
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
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20 bg-bg-secondary rounded-2xl border border-white/5"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-5">
                                <Search className="w-6 h-6 text-gray-500" />
                            </div>
                            <h3 className="font-heading text-xl font-semibold text-white mb-2">No events found</h3>
                            <p className="text-gray-400 mb-6">Try adjusting your filters or search terms.</p>
                            <button
                                onClick={() => { setFilter('all'); setSearch(''); }}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple to-pink text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple/30 transition-all"
                            >
                                Reset Filters
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}
