import { useState, useEffect, useCallback } from 'react';
import { getGalleryImages, getImagesByCategory } from '../lib/services/gallery';
import type { GalleryImage } from '../types';

interface UseGalleryResult {
    images: GalleryImage[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useGallery(): UseGalleryResult {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchImages = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getGalleryImages();
            setImages(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch gallery images'));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    return { images, loading, error, refetch: fetchImages };
}

export function useGalleryByCategory(category: GalleryImage['category'] | null): UseGalleryResult {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchImages = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            if (category) {
                const data = await getImagesByCategory(category);
                setImages(data);
            } else {
                const data = await getGalleryImages();
                setImages(data);
            }
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch gallery images'));
        } finally {
            setLoading(false);
        }
    }, [category]);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    return { images, loading, error, refetch: fetchImages };
}
