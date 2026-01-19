import Hero from '../components/sections/Hero';
import EventsPreview from '../components/sections/EventsPreview';
import GalleryPreview from '../components/sections/GalleryPreview';
import Testimonials from '../components/sections/Testimonials';
import Pricing from '../components/sections/Pricing';
import FAQ from '../components/sections/FAQ';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gamepad2, Users, Compass, MessageCircle, ArrowRight } from 'lucide-react';

const experiences = [
    {
        icon: Gamepad2,
        number: '01',
        title: 'Game Days',
        description: 'Monthly competitions featuring board games, video games, and team challenges. Limited to 100 players for intimate experiences.',
    },
    {
        icon: MessageCircle,
        number: '02',
        title: 'Trivia Nights',
        description: 'Weekly virtual trivia on WhatsApp. Test your knowledge on pop culture, sports, history, and win exciting prizes!',
    },
    {
        icon: Compass,
        number: '03',
        title: 'Travel Experiences',
        description: 'Explore Ghana together! From Akosombo to Cape Coast, experience thoughtfully curated weekend getaways.',
    },
    {
        icon: Users,
        number: '04',
        title: 'Community Events',
        description: 'Connect with like-minded young people and build lasting friendships at our exclusive gatherings.',
    },
];

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <Hero />

            {/* Discover by Passion Section */}
            <section className="py-28 md:py-40 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 items-start">
                        {/* Left Column - Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:sticky lg:top-32"
                        >
                            <div className="divider-text mb-6">
                                <span>Discover</span>
                            </div>
                            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-forest mb-8 leading-[1.1]">
                                Discover by
                                <br />
                                Passion
                            </h2>
                            <p className="text-forest/60 text-lg max-w-md leading-relaxed mb-8">
                                We design story-rich experiences led by passionate organizers.
                                Small groups, authentic pacing, and moments worth remembering.
                            </p>

                            <div className="flex flex-wrap gap-8 pt-8 border-t border-forest/10">
                                <div className="flex flex-col gap-1">
                                    <span className="font-heading text-3xl font-medium text-forest">50+</span>
                                    <span className="text-sm text-forest/50">Events Hosted</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-heading text-3xl font-medium text-forest">2K+</span>
                                    <span className="text-sm text-forest/50">Community Members</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-heading text-3xl font-medium text-forest">4.9</span>
                                    <span className="text-sm text-forest/50">Average Rating</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - Features */}
                        <div className="space-y-8">
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group p-8 md:p-10 rounded-2xl bg-cream border border-forest/5 hover:bg-forest hover:text-white transition-all duration-500 cursor-pointer"
                                >
                                    <div className="flex gap-6 items-start">
                                        <span className="text-sm font-medium text-forest/30 group-hover:text-white/50 transition-colors">
                                            {exp.number}
                                        </span>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-heading text-xl font-medium text-forest group-hover:text-white transition-colors">
                                                    {exp.title}
                                                </h3>
                                                <exp.icon className="w-5 h-5 text-forest/40 group-hover:text-white/70 transition-colors" />
                                            </div>
                                            <p className="text-forest/60 text-sm leading-relaxed group-hover:text-white/70 transition-colors">
                                                {exp.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="pt-8"
                            >
                                <Link
                                    to="/about"
                                    className="inline-flex items-center gap-3 text-forest font-medium hover:gap-4 transition-all"
                                >
                                    <span>Learn more about us</span>
                                    <ArrowRight size={18} />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Preview */}
            <EventsPreview />

            {/* Pricing & Features */}
            <Pricing />

            {/* Gallery Preview */}
            <GalleryPreview />

            {/* Testimonials */}
            <Testimonials />

            {/* FAQ Section */}
            <FAQ />

            {/* Final CTA Section */}
            <section className="py-28 md:py-40 bg-forest text-white relative overflow-hidden">
                <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <span className="h-px w-12 bg-white/30" />
                            <span className="text-xs font-medium tracking-wider uppercase text-white/60">Join Us</span>
                            <span className="h-px w-12 bg-white/30" />
                        </div>
                        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 leading-[1.1]">
                            Ready to Begin
                            <br />
                            Your Journey?
                        </h2>
                        <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
                            Don't miss out on the experiences! Join our WhatsApp community to stay updated
                            on events, travel, and exclusive offers.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="#"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-forest rounded-lg font-medium transition-all hover:bg-cream"
                            >
                                <MessageCircle size={20} />
                                Join WhatsApp Community
                            </a>
                            <Link
                                to="/events"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white rounded-lg font-medium transition-all hover:bg-white/10"
                            >
                                Browse Events
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
