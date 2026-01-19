import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    MapPin,
    Clock,
    Trophy,
    Gamepad2,
    Dices,
    Target,
    Loader2,
    CheckCircle
} from 'lucide-react';

const teams = [
    { name: 'Red', color: 'bg-brand-red', textColor: 'text-brand-red', bgLight: 'bg-brand-red/20', emoji: '🔴' },
    { name: 'Yellow', color: 'bg-brand-yellow', textColor: 'text-brand-yellow', bgLight: 'bg-brand-yellow/20', emoji: '🟡' },
    { name: 'Blue', color: 'bg-brand-blue', textColor: 'text-brand-blue', bgLight: 'bg-brand-blue/20', emoji: '🔵' },
    { name: 'Green', color: 'bg-brand-green', textColor: 'text-brand-green', bgLight: 'bg-brand-green/20', emoji: '🟢' },
];

const activities = [
    { icon: Gamepad2, title: 'Video Games', description: 'FIFA, Call of Duty, Mortal Kombat tournaments' },
    { icon: Dices, title: 'Board Games', description: 'Monopoly, Scrabble, Chess, Ludo championships' },
    { icon: Target, title: 'Team Challenges', description: 'Relay races, puzzles, and group competitions' },
    { icon: Trophy, title: 'Prizes', description: 'Amazing prizes for winning teams and individuals' },
];

const galleryImages = [
    'https://images.unsplash.com/photo-1511882150382-421056c89033?w=600',
    'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=600',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600',
    'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600',
];

export default function GameDay() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTeam) return;

        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Registration:', { ...formData, team: selectedTeam });
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="section relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-light to-gray-900" />
                <div className="absolute top-0 left-0 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-yellow/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-3xl" />

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
                            className="w-20 h-20 bg-gradient-to-br from-brand-red via-brand-yellow to-brand-green rounded-2xl flex items-center justify-center mx-auto mb-6"
                        >
                            <Gamepad2 className="w-10 h-10 text-white" />
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-black mb-6 font-heading">
                            Monthly <span className="gradient-text">Game Day</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8">
                            Every first Saturday of the month at Nexus 9. Join a team, compete, and win!
                        </p>

                        {/* Schedule Info */}
                        <div className="inline-flex flex-wrap justify-center gap-6 text-left">
                            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                                <Calendar className="text-brand-yellow" size={24} />
                                <div>
                                    <p className="text-sm text-gray-400">Schedule</p>
                                    <p className="font-bold">1st Saturday Monthly</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                                <Clock className="text-brand-blue" size={24} />
                                <div>
                                    <p className="text-sm text-gray-400">Time</p>
                                    <p className="font-bold">10:00 AM - 6:00 PM</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                                <MapPin className="text-brand-red" size={24} />
                                <div>
                                    <p className="text-sm text-gray-400">Venue</p>
                                    <p className="font-bold">Nexus 9, East Legon</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Teams Section */}
            <section className="section bg-dark-light">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="section-title">
                            Choose Your <span className="gradient-text">Team</span>
                        </h2>
                        <p className="section-subtitle">
                            Four teams compete for glory each month. Which side will you choose?
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {teams.map((team, index) => (
                            <motion.div
                                key={team.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`glass-card p-6 text-center hover:scale-105 transition-transform cursor-pointer ${team.bgLight} border-2 border-transparent hover:border-${team.name.toLowerCase()}`}
                            >
                                <div className={`w-16 h-16 ${team.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl`}>
                                    {team.emoji}
                                </div>
                                <h3 className={`text-2xl font-bold ${team.textColor}`}>Team {team.name}</h3>
                                <p className="text-gray-400 text-sm mt-2">Join the {team.name.toLowerCase()} squad!</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What to Expect */}
            <section className="section">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="section-title">
                            What to <span className="gradient-text">Expect</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {activities.map((activity, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-6 text-center"
                            >
                                <activity.icon className="w-12 h-12 text-brand-yellow mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                                <p className="text-gray-400 text-sm">{activity.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="section bg-dark-light">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="section-title">
                            Past Game <span className="gradient-text">Days</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {galleryImages.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="aspect-square rounded-xl overflow-hidden group"
                            >
                                <img
                                    src={image}
                                    alt={`Game Day ${index + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Registration */}
            <section className="section">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass-card p-8"
                        >
                            <h2 className="text-2xl font-bold mb-6 text-center">
                                Register for Next <span className="gradient-text">Game Day</span>
                            </h2>

                            {isSubmitted ? (
                                <div className="text-center py-8">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-4"
                                    >
                                        <CheckCircle className="w-8 h-8 text-brand-green" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold mb-2">You're In!</h3>
                                    <p className="text-gray-400">We'll send you all the details before the event.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-brand-yellow transition-colors"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-brand-yellow transition-colors"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-brand-yellow transition-colors"
                                            placeholder="+233 00 000 0000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-3">Choose Your Team *</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {teams.map((team) => (
                                                <button
                                                    type="button"
                                                    key={team.name}
                                                    onClick={() => setSelectedTeam(team.name.toLowerCase())}
                                                    className={`px-4 py-3 rounded-xl font-medium transition-all ${selectedTeam === team.name.toLowerCase()
                                                        ? `${team.color} ring-2 ring-white ${team.name === 'Yellow' ? 'text-dark' : 'text-white'}`
                                                        : 'bg-white/10 hover:bg-white/20'
                                                        }`}
                                                >
                                                    Team {team.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !selectedTeam}
                                        className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin" size={20} />
                                                Registering...
                                            </>
                                        ) : (
                                            'Register Now - GH₵50'
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
