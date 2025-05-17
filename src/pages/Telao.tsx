
import { useEffect, useState } from "react";
import { MessageDisplay } from "@/components/MessageDisplay";

// Types for our messages
export interface Message {
  id: string;
  type: 'text' | 'image' | 'video';
  content: string; // Text content or file URL
  duration: number; // in seconds
}

const Telao = () => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://big-screen-backend.onrender.com/api/messages")
      .then(res => res.json())
      .then(data => setMessages(data.messages))
      .catch(() => setMessages([]));
  }, []);

  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative">
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000`}>
          <MessageDisplay message={messages[messages.length - 1]} />
        </div>
      
      <div className="absolute bottom-4 right-4 text-white/50 text-sm">
        enviemensagens.com.br
      </div>
    </div>
  );
};

export default Telao;
