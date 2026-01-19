import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Calendar,
    MapPin,
    Clock,
    Users,
    ArrowLeft,
    Share2,
    CheckCircle,
    Loader2,
    Smartphone
} from 'lucide-react';
import { useEvent } from '../hooks/useEvents';
import { createRegistration } from '../lib/services/registrations';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
    isEventFree,
    getEffectivePrice,
    MOBILE_NETWORKS,
    initiatePayment,
    updateRegistrationPaymentStatus,
    generatePaymentReference,
    type MobileNetwork,
} from '../lib/services/payments';

const teamOptions = [
    { value: 'red', label: 'Team Red', color: 'bg-brand-red' },
    { value: 'yellow', label: 'Team Yellow', color: 'bg-brand-yellow text-dark' },
    { value: 'blue', label: 'Team Blue', color: 'bg-brand-blue' },
    { value: 'green', label: 'Team Green', color: 'bg-brand-green' },
] as const;

// Combined status for the entire process
type RegistrationStatus = 'idle' | 'submitting_registration' | 'initiating_payment' | 'pending_confirmation' | 'success' | 'failed';

export default function EventDetail() {
    const { id } = useParams<{ id: string }>();
    const { event, loading } = useEvent(id || '1');

    // State
    const [status, setStatus] = useState<RegistrationStatus>('idle');
    const [error, setError] = useState<string | null>(null);
    const [registrationId, setRegistrationId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        team: '' as '' | 'red' | 'yellow' | 'blue' | 'green',
    });

    // Payment specific state
    const [selectedNetwork, setSelectedNetwork] = useState<MobileNetwork | ''>('');
    // We'll use formData.phone for payment by default, but user can change it if needed
    // For simplicity in this merged form, we can just use one phone number for both contact and payment
    // or allow a separate payment number check. Let's keep it simple: one phone number.

    // Subscribe to payment status changes via Supabase Realtime
    useEffect(() => {
        if (!registrationId || status !== 'pending_confirmation' || !isSupabaseConfigured) return;

        const channel = supabase
            .channel(`registration-${registrationId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'registrations',
                    filter: `id=eq.${registrationId}`,
                },
                (payload) => {
                    console.log('Payment status update:', payload);
                    const newStatus = payload.new?.payment_status;

                    if (newStatus === 'completed') {
                        setStatus('success');
                    } else if (newStatus === 'failed') {
                        setStatus('failed');
                        setError('Payment failed. You can try again.');
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [registrationId, status]);


    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!event) return;

        const isFree = isEventFree(event.price, event.early_bird_price);

        // Validation for paid events
        if (!isFree) {
            if (!selectedNetwork) {
                setError('Please select a mobile network for payment.');
                return;
            }
            if (!formData.phone) {
                setError('Phone number is required for payment.');
                return;
            }
        }

        setStatus('submitting_registration');
        setError(null);

        try {
            // 1. Create Registration
            const registration = await createRegistration({
                event_id: event.id,
                full_name: formData.fullName,
                email: formData.email,
                phone: formData.phone || undefined,
                team: formData.team || undefined,
                payment_status: isFree ? 'free' : 'pending',
            });

            if (!registration) {
                throw new Error('Failed to create registration');
            }

            setRegistrationId(registration.id);

            if (isFree) {
                setStatus('success');
                return;
            }

            // 2. Initiate Payment (if paid event)
            setStatus('initiating_payment');

            const effectivePrice = getEffectivePrice(event.price, event.early_bird_price);
            const paymentRef = generatePaymentReference();
            const narration = `Ticket: ${event.title} - ${formData.fullName}`;

            const result = await initiatePayment(
                formData.phone, // Use contact phone for payment
                effectivePrice,
                selectedNetwork as MobileNetwork,
                narration
            );

            if (result.success) {
                await updateRegistrationPaymentStatus(registration.id, 'pending', paymentRef);
                setStatus('pending_confirmation');
            } else {
                setError(result.error || 'Payment initiation failed. Please try again.');
                setStatus('failed');
            }

        } catch (err) {
            console.error('Process error:', err);
            setError('An error occurred. Please try again.');
            setStatus('failed');
        }
    };

    const resetForm = () => {
        setStatus('idle');
        setFormData({ fullName: '', email: '', phone: '', team: '' });
        setSelectedNetwork('');
        setRegistrationId(null);
        setError(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-brand-yellow animate-spin" />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
                <Link to="/events" className="btn-primary">Back to Events</Link>
            </div>
        );
    }

    const isFree = isEventFree(event.price, event.early_bird_price);
    const effectivePrice = getEffectivePrice(event.price, event.early_bird_price);

    return (
        <div className="bg-off-white min-h-screen">
            {/* Hero Image */}
            <section className="relative h-[60vh] min-h-[500px]">
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                <img
                    src={event.image_url || 'https://via.placeholder.com/1200x600'}
                    alt={event.title}
                    className="relative z-10 w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

                <div className="absolute top-0 left-0 w-full z-20 p-6 md:p-12">
                    <div className="container mx-auto flex justify-between items-start">
                        <Link
                            to="/events"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white font-bold hover:bg-white/20 transition-colors border border-white/10"
                        >
                            <ArrowLeft size={18} />
                            <span>Back</span>
                        </Link>

                        <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors border border-white/10">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full z-20 pb-32">
                    <div className="container mx-auto px-6 md:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl"
                        >
                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-white text-charcoal uppercase tracking-wider shadow-lg">
                                    {event.category.replace('-', ' ')}
                                </span>
                                {event.is_featured && (
                                    <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-charcoal text-white uppercase tracking-wider shadow-lg border border-white/20">
                                        Featured
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black mb-6 font-heading text-white leading-tight drop-shadow-sm">
                                {event.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="relative -mt-20 z-30 pb-20">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:col-span-2"
                        >
                            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100">
                                {/* Info Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-charcoal shrink-0">
                                            <Calendar size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Date</p>
                                            <p className="font-bold text-charcoal text-lg">{formatDate(event.date)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-charcoal shrink-0">
                                            <Clock size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Time</p>
                                            <p className="font-bold text-charcoal text-lg">
                                                {formatTime(event.date)}
                                                {event.end_date && ` - ${formatTime(event.end_date)}`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-charcoal shrink-0">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Location</p>
                                            <p className="font-bold text-charcoal text-lg">{event.location}</p>
                                        </div>
                                    </div>
                                    {event.max_capacity && (
                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50">
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-charcoal shrink-0">
                                                <Users size={24} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Capacity</p>
                                                <p className="font-bold text-charcoal text-lg">{event.max_capacity} spots</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold mb-6 text-charcoal">About This Event</h2>
                                    <div className="text-gray-600 whitespace-pre-line text-lg leading-relaxed">
                                        {event.description}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Registration Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-28">
                                {/* Price */}
                                <div className="mb-8 p-6 bg-charcoal rounded-2xl text-white text-center">
                                    <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Ticket Price</p>
                                    {!isFree ? (
                                        <div className="flex items-center justify-center gap-3">
                                            {event.early_bird_price && (
                                                <span className="text-xl text-gray-500 line-through font-bold">
                                                    GH₵{event.price}
                                                </span>
                                            )}
                                            <span className="text-5xl font-black">
                                                GH₵{effectivePrice}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-5xl font-black">Free</span>
                                    )}
                                    {event.early_bird_price && (
                                        <div className="inline-block mt-3 px-3 py-1 bg-white/10 rounded-full text-xs font-bold">
                                            Early Bird Offer
                                        </div>
                                    )}
                                </div>

                                {/* Success State */}
                                {status === 'success' && (
                                    <div className="text-center py-8">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                                        >
                                            <CheckCircle className="w-10 h-10 text-green-600" />
                                        </motion.div>
                                        <h3 className="text-2xl font-bold mb-3 text-charcoal">You're Going!</h3>
                                        <p className="text-gray-500 mb-6 font-medium">
                                            Registration successful. Check your email for details.
                                        </p>
                                        <button
                                            onClick={resetForm}
                                            className="text-charcoal font-bold underline hover:text-black transition-colors"
                                        >
                                            Register someone else
                                        </button>
                                    </div>
                                )}

                                {/* Pending Payment State */}
                                {status === 'pending_confirmation' && (
                                    <div className="text-center py-8">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6"
                                        >
                                            <Smartphone className="w-10 h-10 text-yellow-600 animate-pulse" />
                                        </motion.div>
                                        <h3 className="text-2xl font-bold mb-3 text-charcoal">Check Your Phone</h3>
                                        <p className="text-gray-500 mb-6 font-medium">
                                            A payment prompt has been sent to <br />
                                            <span className="text-charcoal font-bold text-lg">{formData.phone}</span>
                                        </p>
                                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                                            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                                            Waiting for confirmation...
                                        </div>
                                    </div>
                                )}

                                {/* Unified Form (only show if not success/pending) */}
                                {(status === 'idle' || status === 'submitting_registration' || status === 'initiating_payment' || status === 'failed') && (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <h2 className="text-xl font-bold mb-2">Register Now</h2>

                                        {error && (
                                            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
                                                {error}
                                            </div>
                                        )}

                                        {/* Personal Details Section */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-charcoal placeholder-gray-400 focus:outline-none focus:border-charcoal focus:bg-white transition-all font-medium"
                                                    placeholder="Enter your name"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-charcoal placeholder-gray-400 focus:outline-none focus:border-charcoal focus:bg-white transition-all font-medium"
                                                    placeholder="your@email.com"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                                    Phone Number {!isFree && '(for Payment)'}
                                                </label>
                                                <input
                                                    type="tel"
                                                    required={!isFree}
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-charcoal placeholder-gray-400 focus:outline-none focus:border-charcoal focus:bg-white transition-all font-medium"
                                                    placeholder="05X XXX XXXX"
                                                />
                                            </div>

                                            {event.category === 'game-day' && (
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Choose Your Team</label>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {teamOptions.map((team) => (
                                                            <button
                                                                type="button"
                                                                key={team.value}
                                                                onClick={() => setFormData({ ...formData, team: team.value })}
                                                                className={`px-4 py-3 rounded-xl font-bold transition-all border-2 ${formData.team === team.value
                                                                    ? `${team.color} border-transparent text-white shadow-md`
                                                                    : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                                                                    }`}
                                                            >
                                                                {team.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Payment Section (only for paid events) */}
                                        {!isFree && (
                                            <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                                                <h3 className="text-lg font-bold flex items-center gap-2 text-charcoal">
                                                    <Smartphone size={20} className="text-gray-400" />
                                                    Payment Method
                                                </h3>

                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Select Network</label>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {(Object.entries(MOBILE_NETWORKS) as [MobileNetwork, typeof MOBILE_NETWORKS[MobileNetwork]][]).map(([key, network]) => (
                                                            <button
                                                                key={key}
                                                                type="button"
                                                                onClick={() => setSelectedNetwork(key)}
                                                                className={`p-3 rounded-xl border-2 transition-all text-center ${selectedNetwork === key
                                                                    ? 'border-charcoal bg-charcoal text-white shadow-md'
                                                                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                                                                    }`}
                                                            >
                                                                <span className="font-bold text-sm block">{network.shortName}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === 'submitting_registration' || status === 'initiating_payment' || (event.category === 'game-day' && !formData.team)}
                                            className="w-full bg-charcoal text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 hover:bg-black hover:shadow-lg transition-all"
                                        >
                                            {status === 'submitting_registration' ? (
                                                <>
                                                    <Loader2 className="animate-spin" size={20} />
                                                    Registering...
                                                </>
                                            ) : status === 'initiating_payment' ? (
                                                <>
                                                    <Loader2 className="animate-spin" size={20} />
                                                    Processing...
                                                </>
                                            ) : isFree ? (
                                                'Complete Registration'
                                            ) : (
                                                <>
                                                    <Smartphone size={20} />
                                                    Pay GH₵{effectivePrice.toFixed(2)}
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}

