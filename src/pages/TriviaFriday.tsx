import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    MessageCircle,
    Calendar,
    Clock,
    Trophy,
    Brain,
    Zap,
    CheckCircle,
    Loader2
} from 'lucide-react';

const upcomingTrivia = {
    date: '2026-01-24T19:00:00Z',
    theme: 'Pop Culture Showdown',
    description: 'Movies, music, celebrities, and trending topics!',
};

const howItWorks = [
    { icon: MessageCircle, title: 'Join WhatsApp', description: 'Get added to our trivia group on WhatsApp' },
    { icon: Calendar, title: 'Every Friday', description: 'Trivia happens every Friday at 7 PM GMT' },
    { icon: Brain, title: 'Answer Questions', description: 'Quick-fire questions across various categories' },
    { icon: Trophy, title: 'Win Prizes', description: 'Top scorers win amazing prizes!' },
];

const pastThemes = [
    '🎬 90s Movies Night',
    '🎵 African Music Legends',
    '⚽ Sports Mania',
    '🌍 World Geography',
    '📺 TV Series Showdown',
    '🎮 Video Game Classics',
];

export default function TriviaFriday() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
    });

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
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
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Trivia Registration:', formData);
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="section relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-light to-gray-900" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-yellow/20 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-20 h-20 bg-gradient-to-br from-brand-blue to-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-6"
                        >
                            <Brain className="w-10 h-10 text-white" />
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-black mb-6 font-heading">
                            Trivia <span className="gradient-text">Friday</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8">
                            Test your knowledge every Friday night via WhatsApp! Quick, fun, and free.
                        </p>

                        {/* Next Trivia Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="inline-block glass-card p-8 text-left border-2 border-brand-blue/50"
                        >
                            <div className="flex items-center gap-2 text-brand-blue mb-4">
                                <Zap size={20} />
                                <span className="font-bold uppercase text-sm">Next Trivia</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">{upcomingTrivia.theme}</h2>
                            <p className="text-gray-400 mb-6">{upcomingTrivia.description}</p>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="text-brand-yellow" size={18} />
                                    <span>{formatDate(upcomingTrivia.date)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="text-brand-green" size={18} />
                                    <span>{formatTime(upcomingTrivia.date)} GMT</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section bg-dark-light">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="section-title">
                            How It <span className="gradient-text">Works</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {howItWorks.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-6 text-center relative"
                            >
                                <div className="absolute -top-4 -right-4 w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center text-dark font-bold">
                                    {index + 1}
                                </div>
                                <step.icon className="w-12 h-12 text-brand-blue mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-gray-400 text-sm">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Past Themes */}
            <section className="section">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="section-title">
                            Past <span className="gradient-text">Themes</span>
                        </h2>
                        <p className="section-subtitle">
                            We've covered a wide range of topics. Here are some fan favorites!
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {pastThemes.map((theme, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="px-6 py-3 bg-white/10 rounded-full text-lg font-medium hover:bg-white/20 transition-colors"
                            >
                                {theme}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Registration */}
            <section className="section bg-dark-light">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass-card p-8"
                        >
                            <div className="text-center mb-6">
                                <MessageCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold">
                                    Join the <span className="gradient-text">Trivia Group</span>
                                </h2>
                                <p className="text-gray-400 text-sm mt-2">
                                    Get added to our WhatsApp group and never miss a trivia night!
                                </p>
                            </div>

                            {isSubmitted ? (
                                <div className="text-center py-8">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-4"
                                    >
                                        <CheckCircle className="w-8 h-8 text-brand-green" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold mb-2">You're On The List!</h3>
                                    <p className="text-gray-400">We'll add you to the group shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-brand-yellow transition-colors"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">WhatsApp Number *</label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-brand-yellow transition-colors"
                                            placeholder="+233 00 000 0000"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin" size={20} />
                                                Joining...
                                            </>
                                        ) : (
                                            <>
                                                <MessageCircle size={20} />
                                                Join WhatsApp Group
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
