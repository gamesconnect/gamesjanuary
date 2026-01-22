import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Mail, ArrowRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
    {
        question: 'What should I bring for events?',
        answer: 'For game days, just bring yourself and your enthusiasm! For travel experiences, we\'ll send you a detailed packing list—typically comfortable clothes, water, sunscreen, and a camera. We provide everything else needed for the activities.',
    },
    {
        question: 'Is transportation included?',
        answer: 'For travel packages, yes! Pickup and drop-off are included from designated meeting points in Accra. For local events, the venue address will be shared upon registration.',
    },
    {
        question: 'Are events suitable for beginners?',
        answer: 'Absolutely! Our events are designed for all experience levels. Whether you\'re a first-timer or a seasoned gamer/traveler, you\'ll find something that matches your comfort level.',
    },
    {
        question: 'What happens in case of bad weather?',
        answer: 'For outdoor travel experiences, we monitor weather conditions closely. If conditions are unsafe, we\'ll reschedule or offer a full refund. Indoor events proceed as planned.',
    },
    {
        question: 'How can I book or cancel my registration?',
        answer: 'Book directly through our website by selecting an event and completing payment. Cancellations made 48+ hours before receive a full refund. Contact us for any changes.',
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 lg:py-28 bg-bg-secondary relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto relative px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="lg:sticky lg:top-32"
                    >
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan to-blue uppercase tracking-wider mb-5">
                            <HelpCircle size={14} className="text-cyan" />
                            FAQ
                        </span>
                        <h2 className="heading-lg text-white mb-6">
                            Everything you need to <span className="text-gradient-secondary">know</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                            From booking to what to pack for your adventure — we've got the answers.
                        </p>

                        {/* Contact CTA */}
                        <div className="p-1 rounded-3xl bg-gradient-to-r from-purple via-pink to-orange">
                            <div className="bg-bg-secondary rounded-[22px] p-10">
                                <div className="flex items-start gap-5 mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple/20 to-pink/20 flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6 text-purple-light" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white text-lg mb-2">Didn't find your answer?</h4>
                                        <p className="text-gray-500">Our team is here to help — just reach out.</p>
                                    </div>
                                </div>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-purple to-pink text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple/30 transition-all group"
                                >
                                    <span>Contact Us</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - FAQ List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-bg-tertiary rounded-3xl p-8 md:p-12 border border-white/5"
                    >
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`${index !== faqs.length - 1 ? 'border-b border-white/5' : ''}`}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex items-center justify-between gap-6 py-7 text-left group"
                                >
                                    <h3 className="font-semibold text-white text-lg group-hover:text-purple-light transition-colors pr-4">
                                        {faq.question}
                                    </h3>
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index
                                        ? 'bg-gradient-to-r from-purple to-pink text-white'
                                        : 'bg-white/5 text-gray-400 border border-white/10'
                                        }`}>
                                        {openIndex === index ? (
                                            <Minus size={18} />
                                        ) : (
                                            <Plus size={18} />
                                        )}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-8 text-gray-400 leading-relaxed text-base">
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
