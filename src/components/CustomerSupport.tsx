import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Headphones, X, Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AudioRecorder, AudioQueue, encodeAudioForAPI } from "@/utils/VoiceChat";

const CustomerSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const recorderRef = useRef<AudioRecorder | null>(null);
  const audioQueueRef = useRef<AudioQueue | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  const connect = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      audioQueueRef.current = new AudioQueue(audioContextRef.current);

      const wsUrl = `wss://pqduasxtizurjfqovync.supabase.co/functions/v1/voice-support`;
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
        startRecording();
        
        toast({
          title: "Connected",
          description: "Voice support is ready. Start speaking!",
        });
      };

      wsRef.current.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        console.log("Received:", data.type);

        if (data.type === "response.audio.delta") {
          const binaryString = atob(data.delta);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          await audioQueueRef.current?.addToQueue(bytes);
          setIsSpeaking(true);
        } else if (data.type === "response.audio.done") {
          setIsSpeaking(false);
        } else if (data.type === "conversation.item.input_audio_transcription.completed") {
          setTranscript(prev => [...prev, `You: ${data.transcript}`]);
        } else if (data.type === "response.audio_transcript.delta") {
          setTranscript(prev => {
            const newTranscript = [...prev];
            if (newTranscript[newTranscript.length - 1]?.startsWith("Assistant:")) {
              newTranscript[newTranscript.length - 1] += data.delta;
            } else {
              newTranscript.push(`Assistant: ${data.delta}`);
            }
            return newTranscript;
          });
        }
      };

      wsRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        toast({
          title: "Connection Error",
          description: "Failed to connect to support",
          variant: "destructive",
        });
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket closed");
        setIsConnected(false);
        stopRecording();
      };
    } catch (error) {
      console.error("Error connecting:", error);
      toast({
        title: "Error",
        description: "Failed to access microphone",
        variant: "destructive",
      });
    }
  };

  const startRecording = async () => {
    try {
      recorderRef.current = new AudioRecorder((audioData) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            type: 'input_audio_buffer.append',
            audio: encodeAudioForAPI(audioData)
          }));
        }
      });
      await recorderRef.current.start();
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
    recorderRef.current = null;
  };

  const disconnect = () => {
    stopRecording();
    wsRef.current?.close();
    audioContextRef.current?.close();
    setIsConnected(false);
    setTranscript([]);
  };

  const handleToggle = () => {
    if (isOpen) {
      disconnect();
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleToggle}
        className="fixed bottom-8 right-8 z-50 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 animate-pulse"
        aria-label="Customer Support"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Headphones className="w-6 h-6" />}
      </button>

      {/* Support Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 z-50 bg-card border-2 border-primary/20 rounded-lg shadow-2xl w-96 animate-scale-in">
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
            <h3 className="font-heading font-bold text-lg uppercase tracking-wider">
              Customer Support
            </h3>
            <p className="text-sm text-primary-foreground/80">
              Talk to our AI assistant
            </p>
          </div>

          <div className="p-6 space-y-4">
            {!isConnected ? (
              <Button
                onClick={connect}
                variant="hero"
                className="w-full"
              >
                <Mic className="w-4 h-4 mr-2" />
                Start Voice Chat
              </Button>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isSpeaking ? (
                      <div className="flex gap-1">
                        <div className="w-2 h-8 bg-primary animate-pulse" />
                        <div className="w-2 h-6 bg-primary animate-pulse" style={{ animationDelay: "0.1s" }} />
                        <div className="w-2 h-10 bg-primary animate-pulse" style={{ animationDelay: "0.2s" }} />
                      </div>
                    ) : (
                      <Mic className="w-5 h-5 text-primary" />
                    )}
                    <span className="text-sm font-medium">
                      {isSpeaking ? "Assistant speaking..." : "Listening..."}
                    </span>
                  </div>
                  <Button
                    onClick={disconnect}
                    variant="outline"
                    size="sm"
                  >
                    <MicOff className="w-4 h-4" />
                  </Button>
                </div>

                {/* Transcript */}
                <div className="bg-muted/30 rounded p-4 max-h-64 overflow-y-auto space-y-2">
                  {transcript.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">
                      Start speaking to get help...
                    </p>
                  ) : (
                    transcript.map((line, index) => (
                      <p key={index} className="text-sm">
                        {line}
                      </p>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerSupport;
