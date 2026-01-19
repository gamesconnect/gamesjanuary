import { supabase, isSupabaseConfigured } from '../supabase';
import type { Travel } from '../../types';

// Mock data for fallback
const mockTrips: Travel[] = [
    {
        id: '1',
        destination: 'Akosombo Weekend Getaway',
        description: 'Escape to the serene shores of the Volta River for a weekend of relaxation, boat rides, and adventure.',
        departure_date: '2026-02-14',
        return_date: '2026-02-16',
        price: 500,
        itinerary: [
            { day: 1, title: 'Departure & Arrival', description: 'Travel to Akosombo', activities: ['Bus departure from Accra', 'Check-in at resort', 'Welcome dinner'] },
            { day: 2, title: 'Adventure Day', description: 'Full day of activities', activities: ['Boat cruise', 'Swimming', 'Beach games'] },
            { day: 3, title: 'Departure', description: 'Return to Accra', activities: ['Breakfast', 'Check-out', 'Return journey'] },
        ],
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        max_spots: 30,
        spots_left: 12,
        created_at: '2026-01-01T00:00:00Z',
    },
    {
        id: '2',
        destination: 'Cape Coast Heritage Tour',
        description: 'Explore Ghana\'s rich history with a visit to Cape Coast Castle, Kakum National Park, and local attractions.',
        departure_date: '2026-03-21',
        return_date: '2026-03-23',
        price: 650,
        itinerary: [
            { day: 1, title: 'Journey & History', description: 'Travel and castle tour', activities: ['Departure from Accra', 'Cape Coast Castle tour', 'Hotel check-in'] },
            { day: 2, title: 'Nature & Adventure', description: 'Kakum exploration', activities: ['Kakum canopy walkway', 'Nature hike', 'Local cuisine dinner'] },
            { day: 3, title: 'Local Experience', description: 'Cultural immersion', activities: ['Local market visit', 'Beach time', 'Return to Accra'] },
        ],
        image_url: 'https://images.unsplash.com/photo-1580746738099-78d6833b3bb7?w=800',
        max_spots: 40,
        spots_left: 25,
        created_at: '2026-01-01T00:00:00Z',
    },
];

export async function getTrips(): Promise<Travel[]> {
    if (!isSupabaseConfigured) {
        return mockTrips;
    }

    const { data, error } = await supabase
        .from('travel')
        .select('*')
        .order('departure_date', { ascending: true });

    if (error) {
        console.error('Error fetching trips:', error);
        return mockTrips;
    }

    return data || [];
}

export async function getTripById(id: string): Promise<Travel | null> {
    if (!isSupabaseConfigured) {
        return mockTrips.find(t => t.id === id) || null;
    }

    const { data, error } = await supabase
        .from('travel')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching trip:', error);
        return mockTrips.find(t => t.id === id) || null;
    }

    return data;
}

export async function getUpcomingTrips(limit: number = 3): Promise<Travel[]> {
    if (!isSupabaseConfigured) {
        return mockTrips.slice(0, limit);
    }

    const { data, error } = await supabase
        .from('travel')
        .select('*')
        .gte('departure_date', new Date().toISOString().split('T')[0])
        .order('departure_date', { ascending: true })
        .limit(limit);

    if (error) {
        console.error('Error fetching upcoming trips:', error);
        return mockTrips.slice(0, limit);
    }

    return data || [];
}

export async function createTrip(trip: Omit<Travel, 'id' | 'created_at'>): Promise<Travel | null> {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Cannot create trip.');
        return null;
    }

    const { data, error } = await supabase
        .from('travel')
        .insert(trip)
        .select()
        .single();

    if (error) {
        console.error('Error creating trip:', error);
        throw error;
    }

    return data;
}

export async function updateTrip(id: string, trip: Partial<Travel>): Promise<Travel | null> {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Cannot update trip.');
        return null;
    }

    const { data, error } = await supabase
        .from('travel')
        .update(trip)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating trip:', error);
        throw error;
    }

    return data;
}

export async function deleteTrip(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Cannot delete trip.');
        return false;
    }

    const { error } = await supabase
        .from('travel')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting trip:', error);
        throw error;
    }

    return true;
}

export async function getTravelBookingsCount(): Promise<number> {
    if (!isSupabaseConfigured) {
        return 0;
    }

    // This would require a travel_bookings table - for now return spots used
    const { data, error } = await supabase
        .from('travel')
        .select('max_spots, spots_left');

    if (error) {
        console.error('Error counting travel bookings:', error);
        return 0;
    }

    return (data || []).reduce((acc, trip) => {
        const booked = (trip.max_spots || 0) - (trip.spots_left || 0);
        return acc + booked;
    }, 0);
}
