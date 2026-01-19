import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: 'What is Games & Connect?',
        answer: 'Games & Connect is Ghana\'s premier youth community bringing together gamers, travelers, and fun-seekers for unforgettable experiences. We organize monthly game days, weekly trivia nights, travel adventures, and community events.',
    },
    {
        question: 'How do I register for an event?',
        answer: 'Simply browse our events page, select the event you\'re interested in, and complete the registration form. Payment can be made via mobile money. You\'ll receive a confirmation email with all the details.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept mobile money payments through MTN, Vodafone Cash, and AirtelTigo. Bank transfers are also available for some events. All payments are secure and you\'ll receive instant confirmation.',
    },
    {
        question: 'Can I cancel my registration?',
        answer: 'Yes, cancellations made 48 hours before the event are eligible for a full refund. Cancellations made within 48 hours may receive 50% refund depending on the event. Please contact us for more details.',
    },
    {
        question: 'Are your travel experiences all-inclusive?',
        answer: 'Most of our travel packages include transportation, accommodation, meals, and activities. Specific inclusions are listed on each trip\'s page. We aim to make your experience as seamless as possible.',
    },
    {
        question: 'How can I stay updated on new events?',
        answer: 'Join our WhatsApp community for real-time updates, or subscribe to our newsletter. You can also follow us on Instagram and Twitter for the latest announcements and behind-the-scenes content.',
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 md:py-32 bg-warm-cream">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:sticky lg:top-32"
                    >
                        <div className="divider-text mb-6">
                            <span>Support</span>
                        </div>
                        <h2 className="font-heading text-4xl md:text-5xl font-medium text-forest mb-6 leading-[1.1]">
                            Frequently Asked
                            <br />
                            Questions
                        </h2>
                        <p className="text-forest/60 text-lg mb-8 leading-relaxed">
                            Can't find what you're looking for? Feel free to reach out to us directly
                            and we'll get back to you as soon as possible.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 text-forest font-medium hover:gap-3 transition-all"
                        >
                            <span>Contact Support</span>
                            <span>→</span>
                        </a>
                    </motion.div>

                    {/* Right Column - FAQ List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl p-8 md:p-10"
                    >
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`${index !== faqs.length - 1 ? 'border-b border-forest/10' : ''}`}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                                >
                                    <h3 className="font-heading text-lg font-medium text-forest pr-4">
                                        {faq.question}
                                    </h3>
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? 'bg-forest text-white' : 'bg-forest/5 text-forest'
                                        }`}>
                                        {openIndex === index ? (
                                            <Minus size={16} />
                                        ) : (
                                            <Plus size={16} />
                                        )}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-5 text-forest/60 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
