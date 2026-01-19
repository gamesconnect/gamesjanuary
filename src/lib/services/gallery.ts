import { supabase, isSupabaseConfigured } from '../supabase';
import type { GalleryImage } from '../../types';

// Mock data for fallback
const mockImages: GalleryImage[] = [
    { id: '1', image_url: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=600', caption: 'Game Day Competition', category: 'game-day', event_id: null, created_at: '2026-01-01T00:00:00Z' },
    { id: '2', image_url: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600', caption: 'Trivia Night Fun', category: 'trivia', event_id: null, created_at: '2026-01-01T00:00:00Z' },
    { id: '3', image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600', caption: 'Akosombo Trip', category: 'travel', event_id: null, created_at: '2026-01-01T00:00:00Z' },
    { id: '4', image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600', caption: 'Party Night', category: 'party', event_id: null, created_at: '2026-01-01T00:00:00Z' },
    { id: '5', image_url: 'https://images.unsplash.com/photo-1493711662062-fa541f7f0525?w=600', caption: 'Team Red Victory', category: 'game-day', event_id: null, created_at: '2026-01-01T00:00:00Z' },
    { id: '6', image_url: 'https://images.unsplash.com/photo-1580746738099-78d6833b3bb7?w=600', caption: 'Cape Coast Adventure', category: 'travel', event_id: null, created_at: '2026-01-01T00:00:00Z' },
];

export async function getGalleryImages(): Promise<GalleryImage[]> {
    if (!isSupabaseConfigured) {
        return mockImages;
    }

    const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching gallery images:', error);
        return mockImages;
    }

    return data || [];
}

export async function getImagesByCategory(category: GalleryImage['category']): Promise<GalleryImage[]> {
    if (!isSupabaseConfigured) {
        return mockImages.filter(img => img.category === category);
    }

    const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching gallery images by category:', error);
        return mockImages.filter(img => img.category === category);
    }

    return data || [];
}

export async function getImagesByEvent(eventId: string): Promise<GalleryImage[]> {
    if (!isSupabaseConfigured) {
        return mockImages.filter(img => img.event_id === eventId);
    }

    const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching gallery images by event:', error);
        return [];
    }

    return data || [];
}

export async function uploadGalleryImage(image: Omit<GalleryImage, 'id' | 'created_at'>): Promise<GalleryImage | null> {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Cannot upload image.');
        return null;
    }

    const { data, error } = await supabase
        .from('gallery')
        .insert(image)
        .select()
        .single();

    if (error) {
        console.error('Error uploading gallery image:', error);
        throw error;
    }

    return data;
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Cannot delete image.');
        return false;
    }

    const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting gallery image:', error);
        throw error;
    }

    return true;
}
