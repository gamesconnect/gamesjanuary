import { useState, useEffect, useCallback } from 'react';
import { getEvents, getUpcomingEvents, getFeaturedEvents, getEventById } from '../lib/services/events';
import type { Event } from '../types';

interface UseEventsResult {
    events: Event[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useEvents(): UseEventsResult {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getEvents();
            setEvents(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch events'));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    return { events, loading, error, refetch: fetchEvents };
}

interface UseUpcomingEventsResult {
    events: Event[];
    loading: boolean;
    error: Error | null;
}

export function useUpcomingEvents(limit: number = 6): UseUpcomingEventsResult {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const data = await getUpcomingEvents(limit);
                setEvents(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch events'));
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, [limit]);

    return { events, loading, error };
}

export function useFeaturedEvents(): UseUpcomingEventsResult {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const data = await getFeaturedEvents();
                setEvents(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch featured events'));
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return { events, loading, error };
}

interface UseEventResult {
    event: Event | null;
    loading: boolean;
    error: Error | null;
}

export function useEvent(id: string): UseEventResult {
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Skip fetching if id is empty
        if (!id) {
            setLoading(true);
            return;
        }

        const fetchEvent = async () => {
            setLoading(true);
            try {
                const data = await getEventById(id);
                setEvent(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch event'));
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    return { event, loading, error };
}
