import { useState, useEffect, useCallback } from 'react';
import { getTrips, getTripById, getUpcomingTrips } from '../lib/services/travel';
import type { Travel } from '../types';

interface UseTripsResult {
    trips: Travel[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useTrips(): UseTripsResult {
    const [trips, setTrips] = useState<Travel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchTrips = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getTrips();
            setTrips(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch trips'));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTrips();
    }, [fetchTrips]);

    return { trips, loading, error, refetch: fetchTrips };
}

interface UseTripResult {
    trip: Travel | null;
    loading: boolean;
    error: Error | null;
}

export function useTrip(id: string): UseTripResult {
    const [trip, setTrip] = useState<Travel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchTrip = async () => {
            setLoading(true);
            try {
                const data = await getTripById(id);
                setTrip(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch trip'));
            } finally {
                setLoading(false);
            }
        };
        fetchTrip();
    }, [id]);

    return { trip, loading, error };
}

export function useUpcomingTrips(limit: number = 3): UseTripsResult {
    const [trips, setTrips] = useState<Travel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchTrips = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getUpcomingTrips(limit);
            setTrips(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch upcoming trips'));
        } finally {
            setLoading(false);
        }
    }, [limit]);

    useEffect(() => {
        fetchTrips();
    }, [fetchTrips]);

    return { trips, loading, error, refetch: fetchTrips };
}
