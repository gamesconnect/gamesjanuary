import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Plus,
    Pencil,
    Trash2,
    Search,
    Calendar,
    Users,
    Loader2,
    CheckCircle,
    X
} from 'lucide-react';
import type { Travel } from '../../types';

const initialTrips: Travel[] = [
    {
        id: '1',
        destination: 'Akosombo Weekend Getaway',
        description: 'Weekend trip to Akosombo with boat rides and relaxation',
        departure_date: '2026-02-14',
        return_date: '2026-02-16',
        price: 500,
        itinerary: null,
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        max_spots: 30,
        spots_left: 12,
        created_at: '2026-01-01T00:00:00Z',
    },
    {
        id: '2',
        destination: 'Cape Coast Heritage Tour',
        description: 'Explore history and nature in Cape Coast',
        departure_date: '2026-03-21',
        return_date: '2026-03-23',
        price: 750,
        itinerary: null,
        image_url: 'https://images.unsplash.com/photo-1580746738099-78d6833b3bb7?w=800',
        max_spots: 40,
        spots_left: 25,
        created_at: '2026-01-01T00:00:00Z',
    },
];

export default function TravelManager() {
    const [trips, setTrips] = useState(initialTrips);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingTrip, setEditingTrip] = useState<Travel | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        destination: '',
        description: '',
        departure_date: '',
        return_date: '',
        price: '',
        image_url: '',
        max_spots: '',
    });

    const filteredTrips = trips.filter(t =>
        t.destination.toLowerCase().includes(search.toLowerCase())
    );

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const openCreateForm = () => {
        setEditingTrip(null);
        setFormData({
            destination: '',
            description: '',
            departure_date: '',
            return_date: '',
            price: '',
            image_url: '',
            max_spots: '',
        });
        setShowForm(true);
    };

    const openEditForm = (trip: Travel) => {
        setEditingTrip(trip);
        setFormData({
            destination: trip.destination,
            description: trip.description || '',
            departure_date: trip.departure_date,
            return_date: trip.return_date,
            price: trip.price?.toString() || '',
            image_url: trip.image_url || '',
            max_spots: trip.max_spots?.toString() || '',
        });
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const tripData: Travel = {
            id: editingTrip?.id || Date.now().toString(),
            destination: formData.destination,
            description: formData.description,
            departure_date: formData.departure_date,
            return_date: formData.return_date,
            price: formData.price ? parseFloat(formData.price) : null,
            itinerary: editingTrip?.itinerary || null,
            image_url: formData.image_url,
            max_spots: formData.max_spots ? parseInt(formData.max_spots) : null,
            spots_left: editingTrip?.spots_left || (formData.max_spots ? parseInt(formData.max_spots) : null),
            created_at: editingTrip?.created_at || new Date().toISOString(),
        };

        if (editingTrip) {
            setTrips(trips.map(t => t.id === editingTrip.id ? tripData : t));
        } else {
            setTrips([tripData, ...trips]);
        }

        setIsSubmitting(false);
        setShowForm(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this trip?')) {
            setTrips(trips.filter(t => t.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-off-white pt-20">
            <div className="container mx-auto px-6 md:px-12 py-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <Link to="/admin" className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 text-raven">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold font-heading text-raven">Manage Travel</h1>
                            <p className="text-gray-600">{trips.length} total trips</p>
                        </div>
                    </div>
                    <button onClick={openCreateForm} className="btn-primary">
                        <Plus size={18} />
                        Add Trip
                    </button>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search trips..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-80 pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-raven placeholder-gray-400 focus:outline-none focus:border-raven transition-colors"
                    />
                </div>

                {/* Trips Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTrips.map((trip) => (
                        <motion.div
                            key={trip.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card overflow-hidden"
                        >
                            <div className="relative h-40">
                                <img
                                    src={trip.image_url || 'https://via.placeholder.com/400x200'}
                                    alt={trip.destination}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <span className="px-2 py-1 bg-brand-green rounded text-xs font-bold">
                                        {trip.spots_left} spots left
                                    </span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-2">{trip.destination}</h3>
                                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{trip.description}</p>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar size={14} />
                                        <span>{formatDate(trip.departure_date)} - {formatDate(trip.return_date)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Users size={14} />
                                        <span>{trip.max_spots} total spots</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="text-brand-green font-bold">GH₵{trip.price}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEditForm(trip)}
                                            className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 text-raven"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(trip.id)}
                                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold">
                                    {editingTrip ? 'Edit Trip' : 'Create Trip'}
                                </h2>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 text-raven"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700">Destination *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.destination}
                                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-raven placeholder-gray-400 focus:outline-none focus:border-raven transition-colors"
                                        placeholder="e.g., Akosombo Weekend Getaway"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                                    <textarea
                                        rows={3}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-raven placeholder-gray-400 focus:outline-none focus:border-raven transition-colors resize-none"
                                        placeholder="Trip description"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">Departure Date *</label>
                                        <input
                                            type="date"
                                            required
                                            value={formData.departure_date}
                                            onChange={(e) => setFormData({ ...formData, departure_date: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-raven focus:outline-none focus:border-raven transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">Return Date *</label>
                                        <input
                                            type="date"
                                            required
                                            value={formData.return_date}
                                            onChange={(e) => setFormData({ ...formData, return_date: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-raven focus:outline-none focus:border-raven transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">Price (GH₵) *</label>
                                        <input
                                            type="number"
                                            required
                                            step="0.01"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-raven placeholder-gray-400 focus:outline-none focus:border-raven transition-colors"
                                            placeholder="500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">Max Spots</label>
                                        <input
                                            type="number"
                                            value={formData.max_spots}
                                            onChange={(e) => setFormData({ ...formData, max_spots: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-raven placeholder-gray-400 focus:outline-none focus:border-raven transition-colors"
                                            placeholder="30"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700">Image URL</label>
                                    <input
                                        type="url"
                                        value={formData.image_url}
                                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-raven placeholder-gray-400 focus:outline-none focus:border-raven transition-colors"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="flex-1 btn-secondary"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 btn-primary"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin" size={18} />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle size={18} />
                                                {editingTrip ? 'Update Trip' : 'Create Trip'}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}
