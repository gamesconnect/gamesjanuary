import { supabase, isSupabaseConfigured } from '../supabase';
import type { Message } from '../../types';

export interface MessageInput {
    name: string;
    email: string;
    message: string;
    type: 'contact' | 'volunteer' | 'newsletter';
    phone?: string;
    skills?: string;
    availability?: string;
}

export async function createMessage(data: MessageInput): Promise<Message | null> {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Message saved locally only.');
        // Return mock message for demo
        return {
            id: crypto.randomUUID(),
            name: data.name,
            email: data.email,
            message: data.message,
            type: data.type,
            created_at: new Date().toISOString(),
        };
    }

    const { data: message, error } = await supabase
        .from('messages')
        .insert(data)
        .select()
        .single();

    if (error) {
        console.error('Error creating message:', error);
        throw error;
    }

    return message;
}

export async function getMessages(): Promise<Message[]> {
    if (!isSupabaseConfigured) {
        return [];
    }

    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching messages:', error);
        return [];
    }

    return data || [];
}

export async function getRecentMessages(limit: number = 5): Promise<Message[]> {
    if (!isSupabaseConfigured) {
        // Return mock data
        return [
            { id: '1', name: 'Yaw Mensah', email: 'yaw@example.com', message: 'Hi, I wanted to ask about group discounts...', type: 'contact' as const, created_at: '2026-01-17T10:00:00Z' },
            { id: '2', name: 'Adwoa Sarpong', email: 'adwoa@example.com', message: 'I would love to help with events...', type: 'volunteer' as const, created_at: '2026-01-16T14:00:00Z' },
            { id: '3', name: 'Kweku Appiah', email: 'kweku@example.com', message: 'Is there parking available at Nexus 9?', type: 'contact' as const, created_at: '2026-01-15T09:00:00Z' },
        ].slice(0, limit);
    }

    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching recent messages:', error);
        return [];
    }

    return data || [];
}

export async function markAsRead(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Cannot mark message as read.');
        return false;
    }

    const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', id);

    if (error) {
        console.error('Error marking message as read:', error);
        return false;
    }

    return true;
}

export async function getUnreadCount(): Promise<number> {
    if (!isSupabaseConfigured) {
        return 12; // Mock unread count
    }

    const { count, error } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false);

    if (error) {
        console.error('Error counting unread messages:', error);
        return 0;
    }

    return count || 0;
}

export async function getMessagesCount(): Promise<number> {
    if (!isSupabaseConfigured) {
        return 0;
    }

    const { count, error } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error('Error counting messages:', error);
        return 0;
    }

    return count || 0;
}
