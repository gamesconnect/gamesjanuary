import { motion } from 'framer-motion';
import { Target, Eye, Heart, Sparkles, Users, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const team = [
    {
        name: 'Emmanuel Adjei',
        role: 'Founder & CEO',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        bio: 'Passionate about building community and creating memorable experiences.',
    },
    {
        name: 'Abena Agyemang',
        role: 'Events Director',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        bio: 'Expert at crafting unforgettable game days and community events.',
    },
    {
        name: 'Kwesi Mensah',
        role: 'Travel Coordinator',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        bio: 'Adventure enthusiast who plans our epic travel experiences.',
    },
    {
        name: 'Esi Owusu',
        role: 'Community Manager',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        bio: 'The glue that holds our vibrant community together.',
    },
];

const values = [
    {
        icon: Heart,
        title: 'Community First',
        description: 'We prioritize building genuine connections and lasting friendships within our community.',
    },
    {
        icon: Sparkles,
        title: 'Pure Vibes',
        description: 'Creating an atmosphere of fun, positivity, and good energy at every gathering.',
    },
    {
        icon: Users,
        title: 'Inclusivity',
        description: 'Everyone is welcome. We celebrate diversity and foster unity among all members.',
    },
    {
        icon: Compass,
        title: 'Adventure',
        description: 'Encouraging exploration, new experiences, and stepping out of comfort zones.',
    },
];

export default function About() {
    return (
        <div className="bg-cream min-h-screen">
            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-cream">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <div className="divider-text mb-6">
                            <span>About Us</span>
                        </div>
                        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-medium text-forest mb-8 leading-[1.05]">
                            Where Ideas Grow Into
                            <br />
                            Meaningful Connections
                        </h1>
                        <p className="text-xl text-forest/60 max-w-2xl leading-relaxed">
                            We design story-rich experiences led by passionate organizers—small groups,
                            authentic pacing, and moments worth remembering. Every event is crafted to
                            spark curiosity and create meaningful connections.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="divider-text mb-6">
                                <span>Our Story</span>
                            </div>
                            <h2 className="font-heading text-4xl md:text-5xl font-medium text-forest mb-8 leading-[1.1]">
                                Journeys, Thoughtfully
                                <br />
                                Arranged Since 2024
                            </h2>
                            <div className="space-y-5 text-forest/60 text-lg leading-relaxed">
                                <p>
                                    Games & Connect started with a simple idea: bring young
                                    Ghanaians together through the universal language of games and shared experiences.
                                </p>
                                <p>
                                    What began as small game nights with friends quickly grew into a
                                    movement. Today, we're a thriving community of over 2,000 members
                                    who come together monthly for game days, travel adventures, and
                                    virtual trivia sessions.
                                </p>
                                <p>
                                    Our mission is to create a space where young people can disconnect
                                    from their screens, connect with each other, and create memories
                                    that last a lifetime.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-forest/10">
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

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="rounded-2xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800"
                                    alt="Games and Connect community"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 bg-cream">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 rounded-2xl"
                        >
                            <div className="w-14 h-14 bg-forest/5 rounded-xl flex items-center justify-center mb-6">
                                <Target className="w-7 h-7 text-forest" />
                            </div>
                            <h3 className="font-heading text-2xl font-medium text-forest mb-4">Our Mission</h3>
                            <p className="text-forest/60 leading-relaxed">
                                To build Ghana's most vibrant youth community by creating spaces
                                and experiences that foster genuine connections, personal growth,
                                and endless fun.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-10 rounded-2xl"
                        >
                            <div className="w-14 h-14 bg-forest/5 rounded-xl flex items-center justify-center mb-6">
                                <Eye className="w-7 h-7 text-forest" />
                            </div>
                            <h3 className="font-heading text-2xl font-medium text-forest mb-4">Our Vision</h3>
                            <p className="text-forest/60 leading-relaxed">
                                To become Africa's leading youth community platform, inspiring
                                young people across the continent to connect, play, explore,
                                and grow together.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="divider-text justify-center mb-6">
                            <span>Values</span>
                        </div>
                        <h2 className="font-heading text-4xl md:text-5xl font-medium text-forest mb-4">
                            The Details That Make
                            <br />
                            Experiences Exceptional
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-cream p-8 rounded-2xl text-center hover:bg-forest hover:text-white transition-all duration-500 group cursor-pointer"
                            >
                                <div className="w-14 h-14 bg-forest/5 group-hover:bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-5 transition-colors">
                                    <value.icon className="w-7 h-7 text-forest group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-heading text-xl font-medium text-forest group-hover:text-white mb-3 transition-colors">
                                    {value.title}
                                </h3>
                                <p className="text-forest/60 group-hover:text-white/70 text-sm leading-relaxed transition-colors">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 bg-cream">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="divider-text justify-center mb-6">
                            <span>Team</span>
                        </div>
                        <h2 className="font-heading text-4xl md:text-5xl font-medium text-forest">
                            Meet the Team
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl overflow-hidden group"
                            >
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-heading text-lg font-medium text-forest mb-1">{member.name}</h3>
                                    <p className="text-forest/50 text-sm font-medium mb-3">{member.role}</p>
                                    <p className="text-forest/60 text-sm leading-relaxed">{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-forest text-white">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <h2 className="font-heading text-4xl md:text-5xl font-medium text-white mb-6">
                            Ready to Join Us?
                        </h2>
                        <p className="text-white/70 text-lg mb-10">
                            Be part of Ghana's most vibrant youth community. Experience the vibes for yourself.
                        </p>
                        <Link
                            to="/events"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-forest font-medium rounded-lg hover:bg-cream transition-all"
                        >
                            <span>Browse Upcoming Events</span>
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
