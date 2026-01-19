import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    CheckCircle,
    XCircle,
    Loader2,
    ArrowLeft,
    Calendar,
    MapPin,
    Phone,
    Shield,
    Smartphone
} from 'lucide-react';
import { useEvent } from '../hooks/useEvents';
import {
    MOBILE_NETWORKS,
    initiatePayment,
    updateRegistrationPaymentStatus,
    getEffectivePrice,
    generatePaymentReference,
    type MobileNetwork,
} from '../lib/services/payments';

interface CheckoutState {
    registrationId: string;
    fullName: string;
    email: string;
    phone: string;
    eventId: string;
}

export default function Checkout() {
    const { registrationId } = useParams<{ registrationId: string }>();
    const navigate = useNavigate();

    // Get checkout state from sessionStorage
    const [checkoutState, setCheckoutState] = useState<CheckoutState | null>(null);
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'pending' | 'success' | 'failed'>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [selectedNetwork, setSelectedNetwork] = useState<MobileNetwork | ''>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    // Load checkout data from sessionStorage
    useEffect(() => {
        const storedData = sessionStorage.getItem('checkoutData');
        if (storedData) {
            const parsed = JSON.parse(storedData);
            if (parsed.registrationId === registrationId) {
                setCheckoutState(parsed);
                if (parsed.phone) {
                    setPhoneNumber(parsed.phone);
                }
            }
        }

        if (!storedData && !registrationId) {
            navigate('/events');
        }
    }, [registrationId, navigate]);

    const { event, loading: eventLoading } = useEvent(checkoutState?.eventId || '');

    const handlePayNow = async () => {
        if (!selectedNetwork || !phoneNumber || !event || !checkoutState) {
            setErrorMessage('Please select a payment network and enter your phone number.');
            return;
        }

        setPaymentStatus('processing');
        setErrorMessage('');

        const effectivePrice = getEffectivePrice(event.price, event.early_bird_price);
        const paymentRef = generatePaymentReference();
        const narration = `Ticket: ${event.title} - ${checkoutState.fullName}`;

        try {
            const result = await initiatePayment(
                phoneNumber,
                effectivePrice,
                selectedNetwork,
                narration
            );

            if (result.success) {
                // Payment prompt was sent - update registration as pending
                // The user still needs to authorize on their phone
                await updateRegistrationPaymentStatus(
                    checkoutState.registrationId,
                    'pending',  // Keep as pending until confirmed
                    paymentRef
                );
                setPaymentStatus('pending');
                sessionStorage.removeItem('checkoutData');
            } else {
                setPaymentStatus('failed');
                setErrorMessage(result.error || 'Payment failed. Please try again.');
            }
        } catch (error) {
            console.error('Payment error:', error);
            setPaymentStatus('failed');
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    if (eventLoading || !checkoutState) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-brand-yellow animate-spin" />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
                <Link to="/events" className="btn-primary">Back to Events</Link>
            </div>
        );
    }

    const effectivePrice = getEffectivePrice(event.price, event.early_bird_price);

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-2xl">
                {/* Back Button */}
                <Link
                    to={`/events/${event.id}`}
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Event</span>
                </Link>

                {/* Pending Authorization State */}
                {paymentStatus === 'pending' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-8 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-20 h-20 bg-brand-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <Smartphone className="w-10 h-10 text-brand-yellow animate-pulse" />
                        </motion.div>
                        <h1 className="text-3xl font-black mb-4 font-heading">Check Your Phone!</h1>
                        <p className="text-gray-300 mb-2">
                            A payment prompt has been sent to <span className="font-semibold text-white">{phoneNumber}</span>
                        </p>
                        <p className="text-gray-400 mb-6">
                            Please authorize the payment on your phone to complete your registration for{' '}
                            <span className="text-brand-yellow">{event.title}</span>.
                        </p>
                        <div className="p-4 bg-white/5 rounded-xl mb-6">
                            <p className="text-sm text-gray-400">
                                📱 Enter your Mobile Money PIN when prompted to confirm the payment.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/events" className="btn-primary">
                                Browse More Events
                            </Link>
                            <Link to="/" className="btn-secondary">
                                Back to Home
                            </Link>
                        </div>
                    </motion.div>
                )}

                {/* Success State */}
                {paymentStatus === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-8 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <CheckCircle className="w-10 h-10 text-brand-green" />
                        </motion.div>
                        <h1 className="text-3xl font-black mb-4 font-heading">Payment Successful!</h1>
                        <p className="text-gray-300 mb-2">
                            Thank you, <span className="font-semibold text-white">{checkoutState.fullName}</span>!
                        </p>
                        <p className="text-gray-400 mb-6">
                            Your registration for <span className="text-brand-yellow">{event.title}</span> is confirmed.
                            A confirmation will be sent to {checkoutState.email}.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/events" className="btn-primary">
                                Browse More Events
                            </Link>
                            <Link to="/" className="btn-secondary">
                                Back to Home
                            </Link>
                        </div>
                    </motion.div>
                )}

                {/* Failed State */}
                {paymentStatus === 'failed' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-8 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-20 h-20 bg-brand-red/20 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <XCircle className="w-10 h-10 text-brand-red" />
                        </motion.div>
                        <h1 className="text-3xl font-black mb-4 font-heading">Payment Failed</h1>
                        <p className="text-gray-400 mb-6">{errorMessage}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => {
                                    setPaymentStatus('idle');
                                    setErrorMessage('');
                                }}
                                className="btn-primary"
                            >
                                Try Again
                            </button>
                            <Link to="/events" className="btn-secondary">
                                Back to Events
                            </Link>
                        </div>
                    </motion.div>
                )}

                {/* Checkout Form */}
                {(paymentStatus === 'idle' || paymentStatus === 'processing') && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl font-black mb-8 font-heading">Complete Your Purchase</h1>

                        {/* Order Summary */}
                        <div className="glass-card p-6 mb-6">
                            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                            <div className="flex gap-4 mb-6">
                                {event.image_url && (
                                    <img
                                        src={event.image_url}
                                        alt={event.title}
                                        className="w-24 h-24 object-cover rounded-xl"
                                    />
                                )}
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                                        <Calendar size={14} />
                                        <span>{formatDate(event.date)}</span>
                                    </div>
                                    {event.location && (
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <MapPin size={14} />
                                            <span>{event.location}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Attendee Info */}
                            <div className="border-t border-white/10 pt-4 mb-4">
                                <p className="text-sm text-gray-400 mb-1">Attendee</p>
                                <p className="font-medium">{checkoutState.fullName}</p>
                                <p className="text-sm text-gray-400">{checkoutState.email}</p>
                            </div>

                            {/* Price */}
                            <div className="border-t border-white/10 pt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-400">Ticket Price</span>
                                    <span className="font-medium">GH₵{effectivePrice.toFixed(2)}</span>
                                </div>
                                {event.early_bird_price && event.early_bird_price !== event.price && (
                                    <div className="flex justify-between items-center mb-2 text-brand-yellow">
                                        <span className="flex items-center gap-2">
                                            <span className="text-xs bg-brand-yellow/20 px-2 py-0.5 rounded-full">Early Bird</span>
                                        </span>
                                        <span className="text-sm line-through text-gray-500">GH₵{event.price?.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-white/10 mt-2">
                                    <span>Total</span>
                                    <span className="text-brand-green">GH₵{effectivePrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method Selection */}
                        <div className="glass-card p-6 mb-6">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Smartphone size={20} />
                                Select Payment Method
                            </h2>

                            <div className="grid grid-cols-3 gap-3 mb-6">
                                {(Object.entries(MOBILE_NETWORKS) as [MobileNetwork, typeof MOBILE_NETWORKS[MobileNetwork]][]).map(([key, network]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setSelectedNetwork(key)}
                                        className={`p-4 rounded-xl border-2 transition-all text-center ${selectedNetwork === key
                                            ? 'border-brand-yellow bg-brand-yellow/10'
                                            : 'border-white/10 hover:border-white/30'
                                            }`}
                                    >
                                        <span className="font-bold block">{network.shortName}</span>
                                        <span className="text-xs text-gray-400">Mobile Money</span>
                                    </button>
                                ))}
                            </div>

                            {/* Phone Number Input */}
                            <div>
                                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                                    <Phone size={16} />
                                    Mobile Money Number
                                </label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="0XX XXX XXXX"
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-brand-yellow transition-colors"
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    Enter the phone number linked to your mobile money account
                                </p>
                            </div>

                            {errorMessage && (
                                <p className="text-brand-red text-sm mt-4">{errorMessage}</p>
                            )}
                        </div>

                        {/* Security Badge */}
                        <div className="flex items-center gap-3 mb-6 p-4 bg-white/5 rounded-xl">
                            <Shield className="text-brand-green" size={24} />
                            <div>
                                <p className="font-medium text-sm">Secure Payment</p>
                                <p className="text-xs text-gray-400">Your payment is processed securely via mobile money</p>
                            </div>
                        </div>

                        {/* Pay Button */}
                        <button
                            onClick={handlePayNow}
                            disabled={paymentStatus === 'processing' || !selectedNetwork || !phoneNumber}
                            className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {paymentStatus === 'processing' ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Processing Payment...
                                </>
                            ) : (
                                <>
                                    <Smartphone size={20} />
                                    Pay GH₵{effectivePrice.toFixed(2)}
                                </>
                            )}
                        </button>

                        <p className="text-center text-xs text-gray-500 mt-4">
                            You will receive a prompt on your phone to authorize the payment.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
