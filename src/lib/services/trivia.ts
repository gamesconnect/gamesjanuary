import { supabase, isSupabaseConfigured } from '../supabase';
import type { Trivia } from '../../types';

// Mock data for fallback
const mockTrivia: Trivia = {
    id: '1',
    date: '2026-01-24T19:00:00Z',
    theme: 'Pop Culture Edition',
    whatsapp_link: 'https://wa.me/233123456789',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
};

export async function getActiveTrivia(): Promise<Trivia | null> {
    if (!isSupabaseConfigured) {
        return mockTrivia;
    }

    const { data, error } = await supabase
        .from('trivia')
        .select('*')
        .eq('is_active', true)
        .order('date', { ascending: true })
        .limit(1)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            // No rows found
            return null;
        }
        console.error('Error fetching active trivia:', error);
        return mockTrivia;
    }

    return data;
}

export async function getUpcomingTrivia(limit: number = 3): Promise<Trivia[]> {
    if (!isSupabaseConfigured) {
        return [mockTrivia];
    }

    const { data, error } = await supabase
        .from('trivia')
        .select('*')
        .gte('date', new Date().toISOString())
        .order('date', { ascending: true })
        .limit(limit);

    if (error) {
        console.error('Error fetching upcoming trivia:', error);
        return [mockTrivia];
    }

    return data || [];
}

export async function createTrivia(trivia: Omit<Trivia, 'id' | 'created_at'>): Promise<Trivia | null> {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Cannot create trivia.');
        return null;
    }

    const { data, error } = await supabase
        .from('trivia')
        .insert(trivia)
        .select()
        .single();

    if (error) {
        console.error('Error creating trivia:', error);
        throw error;
    }

    return data;
}

export async function updateTrivia(id: string, trivia: Partial<Trivia>): Promise<Trivia | null> {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Cannot update trivia.');
        return null;
    }

    const { data, error } = await supabase
        .from('trivia')
        .update(trivia)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating trivia:', error);
        throw error;
    }

    return data;
}

export async function deleteTrivia(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Cannot delete trivia.');
        return false;
    }

    const { error } = await supabase
        .from('trivia')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting trivia:', error);
        throw error;
    }

    return true;
}
