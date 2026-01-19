// Database Types for Supabase

export interface Event {
    id: string;
    title: string;
    description: string | null;
    date: string;
    end_date: string | null;
    location: string | null;
    price: number | null;
    early_bird_price: number | null;
    image_url: string | null;
    category: 'game-day' | 'party' | 'trivia' | 'travel' | 'other';
    is_featured: boolean;
    max_capacity: number | null;
    created_at: string;
}

export interface Registration {
    id: string;
    event_id: string;
    full_name: string;
    email: string;
    phone: string | null;
    team: 'red' | 'yellow' | 'blue' | 'green' | null;
    payment_status: 'pending' | 'completed' | 'failed' | 'free' | null;
    payment_reference: string | null;
    created_at: string;
}

export interface Payment {
    id: string;
    registration_id: string;
    reference: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    payment_method: 'paystack' | 'cash' | 'free';
    created_at: string;
}

export interface Travel {
    id: string;
    destination: string;
    description: string | null;
    departure_date: string;
    return_date: string;
    price: number | null;
    itinerary: ItineraryItem[] | null;
    image_url: string | null;
    max_spots: number | null;
    spots_left: number | null;
    created_at: string;
}

export interface ItineraryItem {
    day: number;
    title: string;
    description: string;
    activities: string[];
}

export interface Trivia {
    id: string;
    date: string;
    theme: string | null;
    whatsapp_link: string | null;
    is_active: boolean;
    created_at: string;
}

export interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    type: 'contact' | 'volunteer' | 'newsletter';
    created_at: string;
}

export interface GalleryImage {
    id: string;
    image_url: string;
    caption: string | null;
    category: 'game-day' | 'travel' | 'party' | 'trivia';
    event_id: string | null;
    created_at: string;
}

// Component Props Types
export interface TeamColor {
    name: string;
    color: string;
    bgClass: string;
    textClass: string;
}

export const TEAM_COLORS: TeamColor[] = [
    { name: 'Red', color: '#E53935', bgClass: 'bg-brand-red', textClass: 'text-brand-red' },
    { name: 'Yellow', color: '#FDD835', bgClass: 'bg-brand-yellow', textClass: 'text-brand-yellow' },
    { name: 'Blue', color: '#1E88E5', bgClass: 'bg-brand-blue', textClass: 'text-brand-blue' },
    { name: 'Green', color: '#43A047', bgClass: 'bg-brand-green', textClass: 'text-brand-green' },
];
