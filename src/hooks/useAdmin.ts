import { useState, useEffect, useCallback } from 'react';
import { getEventsCount } from '../lib/services/events';
import { getRegistrationsCount, getRecentRegistrations } from '../lib/services/registrations';
import { getMessagesCount, getUnreadCount, getRecentMessages } from '../lib/services/messages';
import { getTravelBookingsCount } from '../lib/services/travel';
import type { Registration, Message } from '../types';

interface AdminStats {
    totalEvents: number;
    totalRegistrations: number;
    totalMessages: number;
    unreadMessages: number;
    travelBookings: number;
}

interface UseAdminStatsResult {
    stats: AdminStats;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useAdminStats(): UseAdminStatsResult {
    const [stats, setStats] = useState<AdminStats>({
        totalEvents: 0,
        totalRegistrations: 0,
        totalMessages: 0,
        unreadMessages: 0,
        travelBookings: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchStats = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [events, registrations, messages, unread, bookings] = await Promise.all([
                getEventsCount(),
                getRegistrationsCount(),
                getMessagesCount(),
                getUnreadCount(),
                getTravelBookingsCount(),
            ]);
            setStats({
                totalEvents: events,
                totalRegistrations: registrations,
                totalMessages: messages,
                unreadMessages: unread,
                travelBookings: bookings,
            });
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch admin stats'));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return { stats, loading, error, refetch: fetchStats };
}

interface UseRecentRegistrationsResult {
    registrations: (Registration & { event_title?: string })[];
    loading: boolean;
    error: Error | null;
}

export function useRecentRegistrations(limit: number = 5): UseRecentRegistrationsResult {
    const [registrations, setRegistrations] = useState<(Registration & { event_title?: string })[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchRegistrations = async () => {
            setLoading(true);
            try {
                const data = await getRecentRegistrations(limit);
                setRegistrations(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch registrations'));
            } finally {
                setLoading(false);
            }
        };
        fetchRegistrations();
    }, [limit]);

    return { registrations, loading, error };
}

interface UseRecentMessagesResult {
    messages: Message[];
    loading: boolean;
    error: Error | null;
}

export function useRecentMessages(limit: number = 5): UseRecentMessagesResult {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const data = await getRecentMessages(limit);
                setMessages(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch messages'));
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, [limit]);

    return { messages, loading, error };
}
