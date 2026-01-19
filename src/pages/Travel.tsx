import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    Users,
    Camera,
    Utensils,
    Bus,
    CheckCircle,
    Loader2,
    ChevronDown,
    ChevronUp,
    ArrowRight
} from 'lucide-react';
import { useTrips } from '../hooks/useTravel';
import type { Travel } from '../types';

const features = [
    { icon: Bus, title: 'Transportation', description: 'Comfortable AC bus to/from destination' },
    { icon: Utensils, title: 'Meals Included', description: 'Breakfast, lunch, and dinner covered' },
    { icon: Camera, title: 'Photo Sessions', description: 'Professional photos of your experience' },
    { icon: Users, title: 'Group Activities', description: 'Team games, tours, and adventures' },
];

export default function TravelPage() {
    const { trips, loading } = useTrips();
    const [selectedTrip, setSelectedTrip] = useState<Travel | null>(null);
    const [expandedItinerary, setExpandedItinerary] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        emergencyContact: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTrip) return;

        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Booking:', { tripId: selectedTrip.id, ...formData });
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
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
                        className="max-w-4xl"
                    >
                        <div className="divider-text mb-6">
                            <span>Adventures</span>
                        </div>
                        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-medium text-forest mb-8 leading-[1.05]">
                            Travel
                            <br />
                            Experiences
                        </h1>
                        <p className="text-xl text-forest/60 max-w-2xl leading-relaxed">
                            Explore Ghana together! Our curated trips combine adventure, relaxation, and community vibes.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* What's Included */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-6 rounded-2xl bg-cream border border-forest/5 hover:bg-forest hover:text-white transition-all duration-500 group cursor-pointer"
                            >
                                <div className="w-14 h-14 bg-forest/5 group-hover:bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
                                    <feature.icon className="w-7 h-7 text-forest group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-heading font-medium mb-2 text-forest group-hover:text-white transition-colors">{feature.title}</h3>
                                <p className="text-forest/60 group-hover:text-white/70 text-sm leading-relaxed transition-colors">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trips */}
            <section className="py-24 bg-cream">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="divider-text justify-center mb-6">
                            <span>Upcoming</span>
                        </div>
                        <h2 className="font-heading text-4xl md:text-5xl font-medium text-forest">
                            Upcoming Trips
                        </h2>
                    </motion.div>

                    <div className="space-y-8">
                        {trips.map((trip, index) => (
                            <motion.div
                                key={trip.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl overflow-hidden border border-forest/5 hover:shadow-xl transition-all duration-500"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-3">
                                    {/* Image */}
                                    <div className="relative h-64 lg:h-auto overflow-hidden">
                                        <img
                                            src={trip.image_url || ''}
                                            alt={trip.destination}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-medium text-forest">
                                                {trip.spots_left} spots left
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center">
                                        <h3 className="font-heading text-2xl md:text-3xl font-medium mb-3 text-forest">{trip.destination}</h3>
                                        <p className="text-forest/60 mb-6 leading-relaxed">{trip.description}</p>

                                        {/* Trip Info */}
                                        <div className="flex flex-wrap gap-6 mb-8">
                                            <div className="flex items-center gap-2 text-forest/70">
                                                <Calendar className="text-forest" size={18} />
                                                <span className="font-medium">{formatDate(trip.departure_date)} - {formatDate(trip.return_date)}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-forest/70">
                                                <Users className="text-forest" size={18} />
                                                <span className="font-medium">{trip.max_spots} total spots</span>
                                            </div>
                                        </div>

                                        {/* Itinerary Accordion */}
                                        <div className="mb-8">
                                            <button
                                                onClick={() => setExpandedItinerary(expandedItinerary === trip.id ? null : trip.id)}
                                                className="flex items-center gap-2 text-forest font-medium hover:text-forest-light transition-colors"
                                            >
                                                {expandedItinerary === trip.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                                <span>View Itinerary</span>
                                            </button>

                                            {expandedItinerary === trip.id && trip.itinerary && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    className="mt-4 space-y-4"
                                                >
                                                    {trip.itinerary.map((day) => (
                                                        <div key={day.day} className="bg-cream rounded-xl p-6 border border-forest/5">
                                                            <h4 className="font-heading font-medium text-forest mb-2">Day {day.day}: {day.title}</h4>
                                                            <ul className="text-sm text-forest/60 space-y-2">
                                                                {day.activities.map((activity, i) => (
                                                                    <li key={i} className="flex items-center gap-2">
                                                                        <span className="w-1.5 h-1.5 bg-forest rounded-full" />
                                                                        {activity}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </div>

                                        {/* Price & Book */}
                                        <div className="flex items-center justify-between pt-6 border-t border-forest/10 mt-auto">
                                            <div>
                                                <span className="font-heading text-3xl font-medium text-forest">GH₵{trip.price}</span>
                                                <span className="text-forest/50 ml-2 text-sm font-medium">per person</span>
                                            </div>
                                            <button
                                                onClick={() => setSelectedTrip(trip)}
                                                className="flex items-center gap-2 bg-forest text-white px-6 py-3 rounded-lg font-medium hover:bg-forest-light transition-all"
                                            >
                                                <span>Book Now</span>
                                                <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking Modal */}
            {selectedTrip && (
                <div className="fixed inset-0 bg-forest/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
                    >
                        <h2 className="font-heading text-2xl font-medium mb-2 text-forest">Book Your Trip</h2>
                        <p className="text-forest/60 font-medium mb-6">{selectedTrip.destination}</p>

                        {isSubmitted ? (
                            <div className="text-center py-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4"
                                >
                                    <CheckCircle className="w-8 h-8 text-forest" />
                                </motion.div>
                                <h3 className="font-heading text-xl font-medium mb-2 text-forest">Booking Confirmed!</h3>
                                <p className="text-forest/60 mb-6">Check your email for payment details.</p>
                                <button
                                    onClick={() => {
                                        setSelectedTrip(null);
                                        setIsSubmitted(false);
                                    }}
                                    className="w-full bg-cream text-forest py-3 rounded-lg font-medium hover:bg-warm-cream transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-forest mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className="w-full px-4 py-3 bg-cream border border-forest/10 rounded-lg text-forest placeholder-forest/40 focus:outline-none focus:border-forest transition-all"
                                        placeholder="As it appears on your ID"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-forest mb-2">Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-cream border border-forest/10 rounded-lg text-forest placeholder-forest/40 focus:outline-none focus:border-forest transition-all"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-forest mb-2">Phone *</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 bg-cream border border-forest/10 rounded-lg text-forest placeholder-forest/40 focus:outline-none focus:border-forest transition-all"
                                        placeholder="+233 00 000 0000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-forest mb-2">Emergency Contact</label>
                                    <input
                                        type="tel"
                                        value={formData.emergencyContact}
                                        onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                                        className="w-full px-4 py-3 bg-cream border border-forest/10 rounded-lg text-forest placeholder-forest/40 focus:outline-none focus:border-forest transition-all"
                                        placeholder="Emergency contact number"
                                    />
                                </div>

                                <div className="p-4 bg-cream rounded-xl border border-forest/5">
                                    <div className="flex justify-between mb-2 text-forest/70">
                                        <span>Trip Cost</span>
                                        <span>GH₵{selectedTrip.price}</span>
                                    </div>
                                    <div className="flex justify-between font-medium text-lg border-t border-forest/10 pt-2 text-forest">
                                        <span>Total</span>
                                        <span>GH₵{selectedTrip.price}</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedTrip(null)}
                                        className="flex-1 bg-cream text-forest py-3 rounded-lg font-medium hover:bg-warm-cream transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-forest text-white py-3 rounded-lg font-medium hover:bg-forest-light transition-colors flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin" size={20} />
                                                Booking...
                                            </>
                                        ) : (
                                            'Confirm'
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </div>
    );
}
