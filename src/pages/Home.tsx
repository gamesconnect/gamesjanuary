import Hero from '../components/sections/Hero';
import EventsPreview from '../components/sections/EventsPreview';
import GalleryPreview from '../components/sections/GalleryPreview';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Sparkles, Target, Cpu, BarChart3, Users } from 'lucide-react';

const questCategories = [
    {
        icon: Target,
        title: 'Team Quest',
        description: 'Join team competitions, build camaraderie, and compete for glory with your squad.',
        gradient: 'from-purple to-pink',
        bgGlow: 'bg-purple/10',
    },
    {
        icon: Users,
        title: 'Social Quest',
        description: 'Connect with like-minded adventurers through networking events and social gatherings.',
        gradient: 'from-pink to-orange',
        bgGlow: 'bg-pink/10',
    },
    {
        icon: Cpu,
        title: 'Tech Quest',
        description: 'Explore cutting-edge tech experiences, gaming tournaments, and digital adventures.',
        gradient: 'from-blue to-cyan',
        bgGlow: 'bg-blue/10',
    },
    {
        icon: BarChart3,
        title: 'Data Quest',
        description: 'Track your achievements, earn badges, and climb the leaderboards with every adventure.',
        gradient: 'from-cyan to-teal',
        bgGlow: 'bg-cyan/10',
    },
];

const teams = [
    { name: 'Team Red', color: 'from-red-500 to-red-600', bgColor: 'bg-red-500/20', borderColor: 'border-red-500/30', motto: 'Fire & Passion' },
    { name: 'Team Yellow', color: 'from-yellow-400 to-yellow-500', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500/30', motto: 'Lightning Speed' },
    { name: 'Team Green', color: 'from-green-500 to-green-600', bgColor: 'bg-green-500/20', borderColor: 'border-green-500/30', motto: 'Nature\'s Force' },
    { name: 'Team Blue', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500/30', motto: 'Ocean Deep' },
];

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <Hero />

            {/* Category Quest Cards Section */}
            <section className="py-20 lg:py-28 bg-bg-secondary relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple/5 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto relative px-6 lg:px-8">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
                    >
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-light to-pink-light uppercase tracking-wider mb-6">
                            <Sparkles size={14} className="text-purple-light" />
                            Choose Your Path
                        </span>
                        <h2 className="heading-lg text-white mb-6">
                            Discover Your <span className="text-gradient">Quest</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Whether you're seeking team adventures, social connections, tech experiences,
                            or personal growth — we have the perfect quest waiting for you.
                        </p>
                    </motion.div>

                    {/* Quest Cards Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {questCategories.map((quest, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className={`relative p-8 lg:p-10 rounded-3xl bg-bg-tertiary border border-white/5 hover:border-purple/30 transition-all duration-500 h-full ${quest.bgGlow}`}>
                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${quest.gradient} flex items-center justify-center mb-6 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}>
                                        <quest.icon className="w-6 h-6 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="font-heading text-xl font-semibold text-white mb-4">
                                        {quest.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                        {quest.description}
                                    </p>

                                    {/* Arrow indicator */}
                                    <div className="flex items-center gap-2 text-sm font-medium text-purple-light opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span>Explore</span>
                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Learn More Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-12 lg:mt-16"
                    >
                        <Link
                            to="/about"
                            className="inline-flex items-center gap-3 text-white font-medium hover:text-purple-light transition-colors group"
                        >
                            <span>Learn more about our experiences</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Teams Section */}
            <section className="py-20 lg:py-28 bg-bg-primary relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto relative px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-14 lg:mb-16"
                    >
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange to-yellow uppercase tracking-wider mb-4">
                            <Sparkles size={14} className="text-orange" />
                            Our Teams
                        </span>
                        <h2 className="heading-md text-white">
                            Pick Your <span className="text-gradient">Team</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-8">
                        {teams.map((team, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`${team.bgColor} rounded-2xl p-8 lg:p-10 text-center border ${team.borderColor} hover:scale-105 transition-all cursor-pointer`}
                            >
                                <div className={`w-14 h-14 bg-gradient-to-br ${team.color} rounded-xl mx-auto mb-5`} />
                                <h4 className="font-heading font-semibold text-white mb-2">{team.name}</h4>
                                <p className="text-sm text-gray-400">{team.motto}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Events Preview */}
            <EventsPreview />

            {/* Gallery Preview */}
            <GalleryPreview />

            {/* Testimonials */}
            <Testimonials />

            {/* FAQ Section */}
            <FAQ />

            {/* Final CTA Section */}
            <section className="py-24 lg:py-32 relative overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple/20 via-bg-primary to-pink/20" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="container mx-auto relative z-10 px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full mb-10 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4 text-purple-light" />
                            <span className="text-sm font-medium text-white">Join the Community</span>
                        </div>

                        <h2 className="heading-lg text-white mb-8">
                            Ready to
                            <br />
                            <span className="text-gradient">Play, Travel, Connect?</span>
                        </h2>
                        <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed">
                            Join 200+ members making unforgettable memories. Get event updates and
                            become part of Ghana's most vibrant community.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <a
                                href="https://wa.me/233505891665"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-green-500/30 hover:scale-[1.02]"
                            >
                                <MessageCircle size={18} />
                                <span>Join WhatsApp</span>
                            </a>
                            <Link
                                to="/events"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple via-pink to-orange text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-purple/30 hover:scale-[1.02]"
                            >
                                <span>Browse Events</span>
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
