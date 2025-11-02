import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, upgrade",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const upgradeHeader = req.headers.get("upgrade") || "";
  
  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket connection", { status: 400 });
  }

  try {
    const { socket, response } = Deno.upgradeWebSocket(req);
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Connect to Lovable AI Gateway
    const aiSocket = new WebSocket("wss://ai.gateway.lovable.dev/v1/realtime");
    
    aiSocket.onopen = () => {
      console.log("Connected to AI Gateway");
      
      // Send initial configuration
      aiSocket.send(JSON.stringify({
        type: "session.update",
        session: {
          model: "google/gemini-2.5-flash",
          modalities: ["text", "audio"],
          instructions: "You are a helpful customer support assistant for UrbanThreads, a premium streetwear brand. Help customers with product inquiries, order tracking, sizing questions, and general support. Be friendly, professional, and knowledgeable about urban fashion.",
          voice: "alloy",
          input_audio_format: "pcm16",
          output_audio_format: "pcm16",
          turn_detection: {
            type: "server_vad",
            threshold: 0.5,
            prefix_padding_ms: 300,
            silence_duration_ms: 1000
          },
          temperature: 0.8,
        }
      }));
    };

    // Forward messages from client to AI
    socket.onmessage = (event) => {
      console.log("Client message:", event.data);
      aiSocket.send(event.data);
    };

    // Forward messages from AI to client
    aiSocket.onmessage = (event) => {
      console.log("AI response:", event.data);
      socket.send(event.data);
    };

    aiSocket.onerror = (error) => {
      console.error("AI Socket error:", error);
      socket.close();
    };

    aiSocket.onclose = () => {
      console.log("AI Socket closed");
      socket.close();
    };

    socket.onclose = () => {
      console.log("Client socket closed");
      aiSocket.close();
    };

    return response;
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
