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
    MapPin,
    Star,
    Loader2,
    CheckCircle,
    X
} from 'lucide-react';
import type { Event } from '../../types';
import { useEvents } from '../../hooks/useEvents';
import { createEvent, updateEvent, deleteEvent } from '../../lib/services/events';

const categoryColors: Record<string, string> = {
    'game-day': 'bg-brand-red',
    'party': 'bg-brand-yellow text-dark',
    'trivia': 'bg-brand-blue',
    'travel': 'bg-brand-green',
    'other': 'bg-gray-600',
};

export default function EventsManager() {
    const { events, loading, refetch } = useEvents();
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        end_date: '',
        location: '',
        price: '',
        early_bird_price: '',
        image_url: '',
        category: 'game-day' as Event['category'],
        is_featured: false,
        max_capacity: '',
    });

    const filteredEvents = events.filter(e =>
        e.title.toLowerCase().includes(search.toLowerCase())
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
        setEditingEvent(null);
        setFormData({
            title: '',
            description: '',
            date: '',
            end_date: '',
            location: '',
            price: '',
            early_bird_price: '',
            image_url: '',
            category: 'game-day',
            is_featured: false,
            max_capacity: '',
        });
        setShowForm(true);
    };

    const openEditForm = (event: Event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description || '',
            date: event.date.slice(0, 16),
            end_date: event.end_date?.slice(0, 16) || '',
            location: event.location || '',
            price: event.price?.toString() || '',
            early_bird_price: event.early_bird_price?.toString() || '',
            image_url: event.image_url || '',
            category: event.category,
            is_featured: event.is_featured,
            max_capacity: event.max_capacity?.toString() || '',
        });
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const eventData = {
            title: formData.title,
            description: formData.description || null,
            date: new Date(formData.date).toISOString(),
            end_date: formData.end_date ? new Date(formData.end_date).toISOString() : null,
            location: formData.location || null,
            price: formData.price ? parseFloat(formData.price) : null,
            early_bird_price: formData.early_bird_price ? parseFloat(formData.early_bird_price) : null,
            image_url: formData.image_url || null,
            category: formData.category,
            is_featured: formData.is_featured,
            max_capacity: formData.max_capacity ? parseInt(formData.max_capacity) : null,
        };

        try {
            if (editingEvent) {
                await updateEvent(editingEvent.id, eventData);
            } else {
                await createEvent(eventData);
            }
            await refetch();
            setShowForm(false);
        } catch (err) {
            console.error('Error saving event:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this event?')) {
            try {
                await deleteEvent(id);
                await refetch();
            } catch (err) {
                console.error('Error deleting event:', err);
            }
        }
    };

    const toggleFeatured = async (id: string, currentValue: boolean) => {
        try {
            await updateEvent(id, { is_featured: !currentValue });
            await refetch();
        } catch (err) {
            console.error('Error toggling featured:', err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-brand-yellow animate-spin" />
            </div>
        );
    }

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
                            <h1 className="text-3xl font-bold font-heading text-raven">Manage Events</h1>
                            <p className="text-gray-600">{events.length} total events</p>
                        </div>
                    </div>
                    <button onClick={openCreateForm} className="btn-primary">
                        <Plus size={18} />
                        Add Event
                    </button>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-80 pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-raven placeholder-gray-400 focus:outline-none focus:border-raven transition-colors"
                    />
                </div>

                {/* Events Table */}
                <div className="glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left px-6 py-4 font-medium text-gray-600">Event</th>
                                    <th className="text-left px-6 py-4 font-medium text-gray-600 hidden md:table-cell">Date</th>
                                    <th className="text-left px-6 py-4 font-medium text-gray-600 hidden lg:table-cell">Location</th>
                                    <th className="text-left px-6 py-4 font-medium text-gray-600">Price</th>
                                    <th className="text-left px-6 py-4 font-medium text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredEvents.map((event) => (
                                    <tr key={event.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={event.image_url || 'https://via.placeholder.com/60'}
                                                    alt={event.title}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-medium">{event.title}</p>
                                                        {event.is_featured && (
                                                            <Star className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
                                                        )}
                                                    </div>
                                                    <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${categoryColors[event.category]}`}>
                                                        {event.category.replace('-', ' ')}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Calendar size={14} />
                                                <span>{formatDate(event.date)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden lg:table-cell">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <MapPin size={14} />
                                                <span className="truncate max-w-[200px]">{event.location}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {event.price ? (
                                                <span className="text-brand-green font-medium">GH₵{event.price}</span>
                                            ) : (
                                                <span className="text-gray-400">Free</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => toggleFeatured(event.id, event.is_featured)}
                                                    className={`p-2 rounded-lg transition-colors border ${event.is_featured ? 'bg-brand-yellow/20 text-brand-yellow border-brand-yellow/30' : 'bg-white text-gray-600 hover:text-raven border-gray-200 hover:bg-gray-50'
                                                        }`}
                                                    title="Toggle featured"
                                                >
                                                    <Star size={16} />
                                                </button>
                                                <button
                                                    onClick={() => openEditForm(event)}
                                                    className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 text-raven"
                                                    title="Edit"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(event.id)}
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold">
                                    {editingEvent ? 'Edit Event' : 'Create Event'}
                                </h2>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 text-raven"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-2 text-gray-700">Title *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-raven placeholder-gray-400 focus:outline-none focus:border-raven transition-colors"
                                            placeholder="Event title"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                                        <textarea
                                            rows={3}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-raven placeholder-gray-400 focus:outline-none focus:border-raven transition-colors resize-none"
                                            placeholder="Event description"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">Start Date & Time *</label>
                                        <input
                                            type="datetime-local"
                                            required
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-raven focus:outline-none focus:border-raven transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">End Date & Time</label>
                                        <input
                                            type="datetime-local"
                                            value={formData.end_date}
                                            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-raven focus:outline-none focus:border-raven transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">Location</label>
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-raven placeholder-gray-400 focus:outline-none focus:border-raven transition-colors"
                                            placeholder="Event venue"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">Category *</label>
                                        <select
                                            required
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value as Event['category'] })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-raven focus:outline-none focus:border-raven transition-colors"
                                        >
                                            <option value="game-day">Game Day</option>
                                            <option value="trivia">Trivia</option>
                                            <option value="party">Party</option>
                                            <option value="travel">Travel</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">Price (GH₵)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-raven placeholder-gray-400 focus:outline-none focus:border-raven transition-colors"
                                            placeholder="0 for free"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">Early Bird Price</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={formData.early_bird_price}
                                            onChange={(e) => setFormData({ ...formData, early_bird_price: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-raven placeholder-gray-400 focus:outline-none focus:border-raven transition-colors"
                                            placeholder="Optional"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">Max Capacity</label>
                                        <input
                                            type="number"
                                            value={formData.max_capacity}
                                            onChange={(e) => setFormData({ ...formData, max_capacity: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-raven placeholder-gray-400 focus:outline-none focus:border-raven transition-colors"
                                            placeholder="Leave empty for unlimited"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-2 text-gray-700">Image URL</label>
                                        <input
                                            type="url"
                                            value={formData.image_url}
                                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-raven placeholder-gray-400 focus:outline-none focus:border-raven transition-colors"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.is_featured}
                                                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                                className="w-5 h-5 rounded border-gray-300 bg-white text-brand-yellow focus:ring-brand-yellow"
                                            />
                                            <span>Feature this event on homepage</span>
                                        </label>
                                    </div>
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
                                                {editingEvent ? 'Update Event' : 'Create Event'}
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
