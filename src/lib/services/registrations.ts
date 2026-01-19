import { supabase, isSupabaseConfigured } from '../supabase';
import type { Registration } from '../../types';

export interface RegistrationInput {
    event_id: string;
    full_name: string;
    email: string;
    phone?: string;
    team?: 'red' | 'yellow' | 'blue' | 'green';
    payment_status?: 'pending' | 'completed' | 'failed' | 'free';
    payment_reference?: string;
}

export async function createRegistration(data: RegistrationInput): Promise<Registration | null> {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Registration saved locally only.');
        // Return a mock registration for demo purposes
        return {
            id: crypto.randomUUID(),
            event_id: data.event_id,
            full_name: data.full_name,
            email: data.email,
            phone: data.phone || null,
            team: data.team || null,
            payment_status: data.payment_status || null,
            payment_reference: data.payment_reference || null,
            created_at: new Date().toISOString(),
        };
    }

    const { data: registration, error } = await supabase
        .from('registrations')
        .insert(data)
        .select()
        .single();

    if (error) {
        console.error('Error creating registration:', error);
        throw error;
    }

    return registration;
}

export async function getRegistrationsByEvent(eventId: string): Promise<Registration[]> {
    if (!isSupabaseConfigured) {
        return [];
    }

    const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching registrations:', error);
        return [];
    }

    return data || [];
}

export async function getRecentRegistrations(limit: number = 5): Promise<(Registration & { event_title?: string })[]> {
    if (!isSupabaseConfigured) {
        // Return mock data
        return [
            { id: '1', event_id: '1', full_name: 'Ama Mensah', email: 'ama@example.com', phone: null, team: 'red' as const, payment_status: 'completed' as const, payment_reference: 'GC-123456', created_at: '2026-01-17T10:00:00Z' },
            { id: '2', event_id: '3', full_name: 'Kwame Asante', email: 'kwame@example.com', phone: null, team: null, payment_status: 'free' as const, payment_reference: null, created_at: '2026-01-17T09:00:00Z' },
            { id: '3', event_id: '1', full_name: 'Efua Osei', email: 'efua@example.com', phone: null, team: 'blue' as const, payment_status: 'completed' as const, payment_reference: 'GC-789012', created_at: '2026-01-16T14:00:00Z' },
        ].slice(0, limit);
    }

    const { data, error } = await supabase
        .from('registrations')
        .select(`
            *,
            events(title)
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching recent registrations:', error);
        return [];
    }

    return (data || []).map(reg => ({
        ...reg,
        event_title: reg.events?.title,
    }));
}

export async function deleteRegistration(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Cannot delete registration.');
        return false;
    }

    const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting registration:', error);
        throw error;
    }

    return true;
}

export async function getRegistrationsCount(): Promise<number> {
    if (!isSupabaseConfigured) {
        return 0;
    }

    const { count, error } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error('Error counting registrations:', error);
        return 0;
    }

    return count || 0;
}
