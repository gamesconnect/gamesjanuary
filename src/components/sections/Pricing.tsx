import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
    {
        id: 1,
        icon: '✦',
        title: 'Small Groups',
        description: 'Experience events with intimate groups, allowing deeper connections and genuine bonds.',
    },
    {
        id: 2,
        icon: '★',
        title: 'Expert Organizers',
        description: 'Our team shares their passion and expertise, making each moment memorable.',
    },
    {
        id: 3,
        icon: '◆',
        title: 'Flexible Booking',
        description: 'Adjust your plans when needed with simple changes and patient support.',
    },
    {
        id: 4,
        icon: '●',
        title: 'Quality Assured',
        description: 'Each experience is crafted with care, reviewed for quality and aligned with high standards.',
    },
];

const pricingPlans = [
    {
        name: 'Game Day',
        price: '50',
        description: 'Perfect for monthly gaming sessions',
        features: [
            'Access to all games',
            'Light refreshments',
            'Team competitions',
            'Prizes to win',
            'Networking opportunities',
        ],
        popular: false,
    },
    {
        name: 'Travel Experience',
        price: '450',
        description: 'Weekend trips and adventures',
        features: [
            'Transportation included',
            'Accommodation covered',
            'Meals provided',
            'Guided tours',
            'Group activities',
            'Photo documentation',
        ],
        popular: true,
    },
    {
        name: 'VIP Membership',
        price: '200',
        period: '/year',
        description: 'Exclusive benefits all year',
        features: [
            'Priority registration',
            'Discounts on all events',
            'Exclusive member events',
            'Early access to trips',
            'Community WhatsApp group',
        ],
        popular: false,
    },
];

export default function Pricing() {
    return (
        <section className="py-24 md:py-32 bg-cream">
            <div className="container mx-auto px-6 md:px-12">
                {/* Features Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="divider-text justify-center mb-6">
                        <span>Why Choose Us</span>
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl font-medium text-forest mb-6">
                        The Details That Make
                        <br />
                        Experiences Exceptional
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl p-6 border border-forest/5 hover:shadow-lg transition-all"
                        >
                            <div className="w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center text-2xl mb-5">
                                {feature.icon}
                            </div>
                            <h3 className="font-heading text-lg font-medium text-forest mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-forest/60 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Pricing Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="divider-text justify-center mb-6">
                        <span>Pricing</span>
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl font-medium text-forest mb-6">
                        Seasonal Savings for
                        <br />
                        Curious Souls
                    </h2>
                    <p className="text-forest/60 text-lg max-w-xl mx-auto">
                        Choose the experience that fits your vibe. All prices in Ghana Cedis.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative rounded-2xl p-8 ${plan.popular
                                    ? 'bg-forest text-white'
                                    : 'bg-white border border-forest/5'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="px-4 py-1 bg-sand text-forest text-xs font-medium rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className={`font-heading text-xl font-medium mb-2 ${plan.popular ? 'text-white' : 'text-forest'
                                    }`}>
                                    {plan.name}
                                </h3>
                                <p className={`text-sm ${plan.popular ? 'text-white/70' : 'text-forest/60'}`}>
                                    {plan.description}
                                </p>
                            </div>

                            <div className="mb-6">
                                <span className={`font-heading text-4xl font-medium ${plan.popular ? 'text-white' : 'text-forest'
                                    }`}>
                                    GH₵{plan.price}
                                </span>
                                {plan.period && (
                                    <span className={plan.popular ? 'text-white/70' : 'text-forest/60'}>
                                        {plan.period}
                                    </span>
                                )}
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-sand' : 'text-forest'
                                            }`} />
                                        <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-forest/70'
                                            }`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to="/events"
                                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-medium transition-all ${plan.popular
                                        ? 'bg-white text-forest hover:bg-cream'
                                        : 'bg-forest text-white hover:bg-forest-light'
                                    }`}
                            >
                                <span>Get Started</span>
                                <ArrowRight size={16} />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
