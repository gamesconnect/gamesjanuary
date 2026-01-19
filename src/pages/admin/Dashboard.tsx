import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Calendar,
    Users,
    MessageSquare,
    Plane,
    TrendingUp,
    Eye,
    Plus,
    Settings,
    LogOut,
    Gamepad2
} from 'lucide-react';

// Mock stats
const stats = [
    { label: 'Total Events', value: '24', change: '+3 this month', icon: Calendar, color: 'text-brand-red', bg: 'bg-brand-red/20' },
    { label: 'Registrations', value: '1,247', change: '+156 this week', icon: Users, color: 'text-brand-blue', bg: 'bg-brand-blue/20' },
    { label: 'Messages', value: '89', change: '12 unread', icon: MessageSquare, color: 'text-brand-yellow', bg: 'bg-brand-yellow/20' },
    { label: 'Travel Bookings', value: '67', change: '8 pending', icon: Plane, color: 'text-brand-green', bg: 'bg-brand-green/20' },
];

// Mock recent registrations
const recentRegistrations = [
    { id: 1, name: 'Ama Mensah', event: 'Game Day: February Edition', team: 'red', date: '2026-01-17' },
    { id: 2, name: 'Kwame Asante', event: 'Akosombo Weekend Getaway', team: null, date: '2026-01-17' },
    { id: 3, name: 'Efua Osei', event: 'Game Day: February Edition', team: 'blue', date: '2026-01-16' },
    { id: 4, name: 'Kofi Darko', event: 'Cape Coast Heritage Tour', team: null, date: '2026-01-16' },
    { id: 5, name: 'Akosua Boateng', event: 'Game Day: February Edition', team: 'green', date: '2026-01-15' },
];

// Mock recent messages
const recentMessages = [
    { id: 1, name: 'Yaw Mensah', type: 'contact', preview: 'Hi, I wanted to ask about group discounts...', date: '2026-01-17' },
    { id: 2, name: 'Adwoa Sarpong', type: 'volunteer', preview: 'I would love to help with events...', date: '2026-01-16' },
    { id: 3, name: 'Kweku Appiah', type: 'contact', preview: 'Is there parking available at Nexus 9?', date: '2026-01-15' },
];

const teamColors: Record<string, string> = {
    red: 'bg-brand-red',
    yellow: 'bg-brand-yellow',
    blue: 'bg-brand-blue',
    green: 'bg-brand-green',
};

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple password check (in production, use Supabase Auth)
        if (password === 'admin123') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid password');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-off-white">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-8 max-w-md w-full"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-brand-red via-brand-yellow to-brand-green rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Gamepad2 className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                        <p className="text-gray-600 text-sm mt-2">Enter password to continue</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-raven placeholder-gray-400 focus:outline-none focus:border-raven transition-colors mb-4"
                        />
                        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                        <button type="submit" className="w-full btn-primary py-3">
                            Login
                        </button>
                    </form>

                    <p className="text-center text-gray-500 text-xs mt-6">
                        Demo password: admin123
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-off-white pt-20">
            <div className="container mx-auto px-6 md:px-12 py-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold font-heading text-raven">Dashboard</h1>
                        <p className="text-gray-600">Welcome back! Here's what's happening.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/admin/events" className="btn-primary">
                            <Plus size={18} />
                            Add Event
                        </Link>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="btn-secondary"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-6"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                                    <stat.icon className={stat.color} size={24} />
                                </div>
                                <TrendingUp className="text-brand-green" size={20} />
                            </div>
                            <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                            <p className="text-gray-600 text-sm">{stat.label}</p>
                            <p className="text-brand-green text-xs mt-2">{stat.change}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <Link to="/admin/events" className="glass-card p-4 text-center hover:border-brand-yellow/50 transition-colors">
                        <Calendar className="w-8 h-8 text-brand-red mx-auto mb-2" />
                        <span className="text-sm font-medium">Manage Events</span>
                    </Link>
                    <Link to="/admin/travel" className="glass-card p-4 text-center hover:border-brand-yellow/50 transition-colors">
                        <Plane className="w-8 h-8 text-brand-green mx-auto mb-2" />
                        <span className="text-sm font-medium">Manage Travel</span>
                    </Link>
                    <Link to="/gallery" className="glass-card p-4 text-center hover:border-brand-yellow/50 transition-colors">
                        <Eye className="w-8 h-8 text-brand-blue mx-auto mb-2" />
                        <span className="text-sm font-medium">View Site</span>
                    </Link>
                    <div className="glass-card p-4 text-center hover:border-brand-yellow/50 transition-colors cursor-pointer opacity-50">
                        <Settings className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <span className="text-sm font-medium text-gray-400">Settings</span>
                    </div>
                </div>

                {/* Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Registrations */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Recent Registrations</h2>
                            <Link to="/admin/events" className="text-brand-yellow text-sm hover:underline">
                                View All
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {recentRegistrations.map((reg) => (
                                <div key={reg.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        {reg.team && (
                                            <div className={`w-3 h-3 rounded-full ${teamColors[reg.team]}`} />
                                        )}
                                        <div>
                                            <p className="font-medium">{reg.name}</p>
                                            <p className="text-gray-600 text-sm">{reg.event}</p>
                                        </div>
                                    </div>
                                    <span className="text-gray-500 text-sm">{reg.date}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Messages */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Recent Messages</h2>
                            <span className="text-brand-yellow text-sm">12 unread</span>
                        </div>
                        <div className="space-y-4">
                            {recentMessages.map((msg) => (
                                <div key={msg.id} className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors border border-gray-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-medium">{msg.name}</p>
                                        <span className="text-gray-500 text-xs">{msg.date}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm truncate">{msg.preview}</p>
                                    <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${msg.type === 'volunteer' ? 'bg-brand-green/20 text-brand-green' : 'bg-brand-blue/20 text-brand-blue'
                                        }`}>
                                        {msg.type}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
