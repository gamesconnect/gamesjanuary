// Supabase Edge Function for Payment Webhook
// This endpoint receives callbacks from the payment gateway when payment status changes

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-webhook-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Expected webhook payload structure (adjust based on actual gateway docs)
interface WebhookPayload {
  reference?: string;
  transactionId?: string;
  status: "success" | "failed" | "pending";
  amount?: number;
  message?: string;
  // Some gateways use different field names
  payment_reference?: string;
  transaction_status?: string;
  // Phone number fields (for fallback matching)
  accountNumber?: string;
  phone?: string;
  msisdn?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse webhook payload
    const payload: WebhookPayload = await req.json();
    
    // Log the FULL payload for debugging
    console.log("=== WEBHOOK RECEIVED ===");
    console.log("Full payload:", JSON.stringify(payload, null, 2));

    // Extract reference (try different field names)
    const reference = payload.reference || payload.payment_reference || payload.transactionId;
    
    // Extract phone number (for fallback matching)
    const phoneNumber = payload.accountNumber || payload.phone || payload.msisdn;
    
    console.log("Extracted reference:", reference);
    console.log("Extracted phone:", phoneNumber);

    // Determine payment status (normalize different formats)
    let paymentStatus: "pending" | "completed" | "failed";
    const status = (payload.status || payload.transaction_status || "").toString().toLowerCase();
    
    console.log("Raw status:", payload.status, "Normalized:", status);
    
    if (status === "success" || status === "completed" || status === "successful" || status === "approved") {
      paymentStatus = "completed";
    } else if (status === "failed" || status === "failure" || status === "declined" || status === "rejected") {
      paymentStatus = "failed";
    } else {
      paymentStatus = "pending";
    }

    console.log("Final payment status to set:", paymentStatus);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let updatedRegistration = null;

    // Strategy 1: Try to match by payment_reference
    if (reference) {
      console.log("Trying to match by payment_reference:", reference);
      const { data, error } = await supabase
        .from("registrations")
        .update({ payment_status: paymentStatus })
        .eq("payment_reference", reference)
        .select()
        .single();

      if (!error && data) {
        console.log("SUCCESS: Matched by reference. Updated registration:", data.id);
        updatedRegistration = data;
      } else {
        console.log("No match by reference. Error:", error?.message);
      }
    }

    // Strategy 2: If no match by reference, try to find most recent pending registration with matching phone
    if (!updatedRegistration && phoneNumber) {
      console.log("Trying fallback: match by phone number:", phoneNumber);
      
      // Format phone variations to try
      const phoneVariations = [
        phoneNumber,
        phoneNumber.replace(/^233/, "0"), // 233xxx -> 0xxx
        phoneNumber.replace(/^0/, "233"),  // 0xxx -> 233xxx
      ];
      
      console.log("Phone variations to try:", phoneVariations);
      
      const { data, error } = await supabase
        .from("registrations")
        .update({ payment_status: paymentStatus })
        .in("phone", phoneVariations)
        .eq("payment_status", "pending")
        .order("created_at", { ascending: false })
        .limit(1)
        .select()
        .single();

      if (!error && data) {
        console.log("SUCCESS: Matched by phone. Updated registration:", data.id);
        updatedRegistration = data;
      } else {
        console.log("No match by phone. Error:", error?.message);
      }
    }

    // Strategy 3: As last resort, update the most recent pending registration
    if (!updatedRegistration) {
      console.log("Trying last resort: update most recent pending registration");
      const { data, error } = await supabase
        .from("registrations")
        .update({ payment_status: paymentStatus })
        .eq("payment_status", "pending")
        .order("created_at", { ascending: false })
        .limit(1)
        .select()
        .single();

      if (!error && data) {
        console.log("SUCCESS: Updated most recent pending registration:", data.id);
        updatedRegistration = data;
      } else {
        console.log("Failed to update any registration. Error:", error?.message);
      }
    }

    console.log("=== WEBHOOK COMPLETE ===");

    return new Response(
      JSON.stringify({ 
        received: true, 
        reference,
        status: paymentStatus,
        registrationId: updatedRegistration?.id,
        matched: !!updatedRegistration
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Webhook processing error:", error);
    
    // Return 200 to acknowledge receipt (most gateways will retry on non-200)
    return new Response(
      JSON.stringify({ received: true, error: "Processing error" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
