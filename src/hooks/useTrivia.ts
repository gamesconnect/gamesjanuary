import { useState, useEffect } from 'react';
import { getActiveTrivia } from '../lib/services/trivia';
import type { Trivia } from '../types';

interface UseTriviaResult {
    trivia: Trivia | null;
    loading: boolean;
    error: Error | null;
}

export function useActiveTrivia(): UseTriviaResult {
    const [trivia, setTrivia] = useState<Trivia | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchTrivia = async () => {
            setLoading(true);
            try {
                const data = await getActiveTrivia();
                setTrivia(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch trivia'));
            } finally {
                setLoading(false);
            }
        };
        fetchTrivia();
    }, []);

    return { trivia, loading, error };
}
