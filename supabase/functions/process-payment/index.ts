// Supabase Edge Function for Mobile Money Payments
// This function proxies payment requests to the payment gateway

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const PAYMENT_API_URL = "http://54.86.149.215/pay";
const DCM_PARTNER_CODE = Deno.env.get("DCM_PARTNER_CODE") || "MSH";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface PaymentRequest {
  accountNumber: string;
  amount: string;
  narration: string;
  network: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { 
          status: 405, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Parse the request body
    const body: PaymentRequest = await req.json();

    // Validate required fields
    if (!body.accountNumber || !body.amount || !body.network) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Missing required fields: accountNumber, amount, network" 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log("Processing payment:", {
      accountNumber: body.accountNumber.substring(0, 6) + "****",
      amount: body.amount,
      network: body.network,
    });

    // Forward the request to the payment gateway
    const paymentResponse = await fetch(PAYMENT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Partner-Code": DCM_PARTNER_CODE,
      },
      body: JSON.stringify({
        accountNumber: body.accountNumber,
        amount: body.amount,
        narration: body.narration || "Event Ticket Payment",
        network: body.network,
      }),
    });

    const responseData = await paymentResponse.json();

    console.log("Payment gateway response:", paymentResponse.status);

    // Return the payment gateway response
    return new Response(
      JSON.stringify({
        success: paymentResponse.ok,
        ...responseData,
      }),
      { 
        status: paymentResponse.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Payment processing error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to process payment. Please try again.",
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
