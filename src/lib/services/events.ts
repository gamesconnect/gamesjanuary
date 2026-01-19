import { supabase, isSupabaseConfigured } from '../supabase';
import type { Event } from '../../types';

// Mock data for fallback when Supabase is not configured
const mockEvents: Event[] = [
    {
        id: '1',
        title: 'Game Day: February Edition',
        description: 'Monthly games day featuring team competitions, board games, video games, and more! Join your team and compete for glory.',
        date: '2026-02-01T10:00:00Z',
        end_date: '2026-02-01T18:00:00Z',
        location: 'Nexus 9 Games Hub, Accra',
        price: 50,
        early_bird_price: 40,
        image_url: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800',
        category: 'game-day',
        is_featured: true,
        max_capacity: 100,
        created_at: '2026-01-01T00:00:00Z',
    },
    {
        id: '2',
        title: 'Trivia Friday: Pop Culture Edition',
        description: 'Test your knowledge in our weekly trivia night! Teams compete for prizes and bragging rights.',
        date: '2026-01-24T19:00:00Z',
        end_date: '2026-01-24T22:00:00Z',
        location: 'The Brew Bar, Osu',
        price: 20,
        early_bird_price: null,
        image_url: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800',
        category: 'trivia',
        is_featured: false,
        max_capacity: null,
        created_at: '2026-01-01T00:00:00Z',
    },
    {
        id: '3',
        title: 'Akosombo Weekend Getaway',
        description: 'Escape to Akosombo for a weekend of fun, boat rides, swimming, and relaxation by the Volta River!',
        date: '2026-02-14T06:00:00Z',
        end_date: '2026-02-16T20:00:00Z',
        location: 'Akosombo, Ghana',
        price: 500,
        early_bird_price: 450,
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        category: 'travel',
        is_featured: true,
        max_capacity: 30,
        created_at: '2026-01-01T00:00:00Z',
    },
];

export async function getEvents(): Promise<Event[]> {
    if (!isSupabaseConfigured) {
        return mockEvents;
    }

    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

    if (error) {
        console.error('Error fetching events:', error);
        return mockEvents;
    }

    return data || [];
}

export async function getEventById(id: string): Promise<Event | null> {
    if (!isSupabaseConfigured) {
        return mockEvents.find(e => e.id === id) || null;
    }

    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching event:', error);
        return mockEvents.find(e => e.id === id) || null;
    }

    return data;
}

export async function getUpcomingEvents(limit: number = 6): Promise<Event[]> {
    if (!isSupabaseConfigured) {
        return mockEvents.slice(0, limit);
    }

    const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('date', new Date().toISOString())
        .order('date', { ascending: true })
        .limit(limit);

    if (error) {
        console.error('Error fetching upcoming events:', error);
        return mockEvents.slice(0, limit);
    }

    return data || [];
}

export async function getFeaturedEvents(): Promise<Event[]> {
    if (!isSupabaseConfigured) {
        return mockEvents.filter(e => e.is_featured);
    }

    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_featured', true)
        .order('date', { ascending: true });

    if (error) {
        console.error('Error fetching featured events:', error);
        return mockEvents.filter(e => e.is_featured);
    }

    return data || [];
}

export async function createEvent(event: Omit<Event, 'id' | 'created_at'>): Promise<Event | null> {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Cannot create event.');
        return null;
    }

    const { data, error } = await supabase
        .from('events')
        .insert(event)
        .select()
        .single();

    if (error) {
        console.error('Error creating event:', error);
        throw error;
    }

    return data;
}

export async function updateEvent(id: string, event: Partial<Event>): Promise<Event | null> {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Cannot update event.');
        return null;
    }

    const { data, error } = await supabase
        .from('events')
        .update(event)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating event:', error);
        throw error;
    }

    return data;
}

export async function deleteEvent(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Cannot delete event.');
        return false;
    }

    const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting event:', error);
        throw error;
    }

    return true;
}

export async function getEventsCount(): Promise<number> {
    if (!isSupabaseConfigured) {
        return mockEvents.length;
    }

    const { count, error } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error('Error counting events:', error);
        return 0;
    }

    return count || 0;
}
