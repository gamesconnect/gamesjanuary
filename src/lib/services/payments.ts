import { supabase, isSupabaseConfigured } from '../supabase';

// Mobile Money Network Codes
export const MOBILE_NETWORKS = {
    mtn: { code: '300591', name: 'MTN Mobile Money', shortName: 'MTN' },
    airteltigo: { code: '300592', name: 'AirtelTigo Money', shortName: 'AirtelTigo' },
    telecel: { code: '300594', name: 'Telecel Cash', shortName: 'Telecel' },
} as const;

export type MobileNetwork = keyof typeof MOBILE_NETWORKS;

export interface PaymentRequest {
    accountNumber: string; // Phone number in format 233XXXXXXXXX
    amount: string;
    narration: string;
    network: MobileNetwork;
}

export interface PaymentResult {
    success: boolean;
    message?: string;
    transactionId?: string;
    error?: string;
}

/**
 * Get the Payment API URL
 * Priority: 1. Supabase Edge Function, 2. Vite proxy (dev), 3. Direct URL
 */
function getPaymentApiUrl(): string {
    // Use Supabase Edge Function if configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (supabaseUrl) {
        return `${supabaseUrl}/functions/v1/process-payment`;
    }
    
    // In development, use the Vite proxy to bypass CORS
    if (import.meta.env.DEV) {
        return '/api/pay';
    }
    
    return import.meta.env.VITE_PAYMENT_API_URL || 'http://54.86.149.215/pay';
}

/**
 * Get the DCM Partner Code from environment variables
 */
function getPartnerCode(): string {
    return import.meta.env.VITE_DCM_PARTNER_CODE || 'MSH';
}

/**
 * Format phone number to required format (233XXXXXXXXX)
 */
export function formatPhoneNumber(phone: string): string {
    // Remove all non-digits
    let cleaned = phone.replace(/\D/g, '');

    // Handle different formats
    if (cleaned.startsWith('0')) {
        // Local format: 0XXXXXXXXX -> 233XXXXXXXXX
        cleaned = '233' + cleaned.slice(1);
    } else if (!cleaned.startsWith('233')) {
        // Add country code if missing
        cleaned = '233' + cleaned;
    }

    return cleaned;
}

/**
 * Generate a unique payment reference
 */
export function generatePaymentReference(): string {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `GC-${timestamp}-${randomStr}`;
}

/**
 * Make payment via Mobile Money API
 */
export async function initiatePayment(
    phoneNumber: string,
    amount: number,
    network: MobileNetwork,
    narration: string
): Promise<PaymentResult> {
    const formattedPhone = formatPhoneNumber(phoneNumber);

    const payload: PaymentRequest = {
        accountNumber: formattedPhone,
        amount: amount.toString(),
        narration,
        network,
    };

    // Build headers - include Supabase auth if using Edge Function
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
        // Using Supabase Edge Function - add authorization
        headers['Authorization'] = `Bearer ${supabaseKey}`;
        headers['apikey'] = supabaseKey;
    } else {
        // Using direct API - add partner code
        headers['X-Partner-Code'] = getPartnerCode();
    }

    try {
        const response = await fetch(getPaymentApiUrl(), {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok && data.success !== false) {
            return {
                success: true,
                message: data.message || 'Payment initiated successfully',
                transactionId: data.transactionId || data.reference,
            };
        } else {
            return {
                success: false,
                error: data.message || data.error || 'Payment failed',
            };
        }
    } catch (error) {
        console.error('Payment API error:', error);
        return {
            success: false,
            error: 'Unable to process payment. Please try again.',
        };
    }
}

/**
 * Update registration with payment status
 */
export async function updateRegistrationPaymentStatus(
    registrationId: string,
    paymentStatus: 'pending' | 'completed' | 'failed' | 'free',
    paymentReference: string | null
): Promise<boolean> {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Payment status update skipped.');
        return true;
    }

    const { error } = await supabase
        .from('registrations')
        .update({
            payment_status: paymentStatus,
            payment_reference: paymentReference,
        })
        .eq('id', registrationId);

    if (error) {
        console.error('Error updating payment status:', error);
        throw error;
    }

    return true;
}

/**
 * Get registration by payment reference
 */
export async function getRegistrationByPaymentReference(reference: string) {
    if (!isSupabaseConfigured) {
        return null;
    }

    const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('payment_reference', reference)
        .single();

    if (error) {
        console.error('Error fetching registration by reference:', error);
        return null;
    }

    return data;
}

/**
 * Check if an event is free (price is 0 or null)
 */
export function isEventFree(price: number | null, earlyBirdPrice: number | null): boolean {
    const effectivePrice = earlyBirdPrice ?? price;
    return effectivePrice === null || effectivePrice === 0;
}

/**
 * Get the effective price for an event (early bird if available, else regular)
 */
export function getEffectivePrice(price: number | null, earlyBirdPrice: number | null): number {
    if (earlyBirdPrice !== null && earlyBirdPrice > 0) {
        return earlyBirdPrice;
    }
    return price ?? 0;
}
