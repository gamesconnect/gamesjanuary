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
    
    console.log("Webhook received:", JSON.stringify(payload));

    // Extract reference (try different field names)
    const reference = payload.reference || payload.payment_reference || payload.transactionId;
    
    if (!reference) {
      console.error("No reference found in webhook payload");
      return new Response(
        JSON.stringify({ error: "Missing payment reference" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Determine payment status (normalize different formats)
    let paymentStatus: "pending" | "completed" | "failed";
    const status = (payload.status || payload.transaction_status || "").toLowerCase();
    
    if (status === "success" || status === "completed" || status === "successful") {
      paymentStatus = "completed";
    } else if (status === "failed" || status === "failure" || status === "declined") {
      paymentStatus = "failed";
    } else {
      paymentStatus = "pending";
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Update registration payment status
    const { data, error } = await supabase
      .from("registrations")
      .update({ payment_status: paymentStatus })
      .eq("payment_reference", reference)
      .select()
      .single();

    if (error) {
      console.error("Database update error:", error);
      // Still return 200 to acknowledge receipt (prevent retries)
      return new Response(
        JSON.stringify({ received: true, error: "Database update failed" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Payment ${reference} updated to ${paymentStatus}`, data);

    return new Response(
      JSON.stringify({ 
        received: true, 
        reference,
        status: paymentStatus,
        registrationId: data?.id 
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
