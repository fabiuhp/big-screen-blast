
import { useCallback, useEffect, useState } from "react";
import { MessageDisplay } from "@/components/MessageDisplay";
import qrCode from "@/assets/682916cf2947b.svg"

// Types for our messages
export interface Message {
  id: string;
  type: 'text' | 'image' | 'video';
  content: string; // Text content or file URL
  duration: number; // in seconds
}

const Telao = () => {
  const [messages, setMessages] = useState<any[]>([]);

  const loadMessages = useCallback(() => {
    fetch("https://big-screen-backend.onrender.com/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data.messages ?? []))
      .catch(() => setMessages([]));
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  useEffect(() => {
  if (messages.length > 0) return;

  const interval = setInterval(() => {
    loadMessages();
  }, 10000);

  return () => clearInterval(interval);
}, [messages, loadMessages]);

  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative">
      <div className={`absolute inset-0 flex flex-column items-center justify-center transition-opacity duration-1000`} style={{flexDirection: 'column'}}>
        <MessageDisplay message={messages[messages.length - 1]} onMessageDeleted={loadMessages} />
        <img src={qrCode} className="mt-8 w-60 h-60 object-contain"/>
      </div>
      <div className="absolute bottom-4 right-4 text-white/50 text-sm">
        <a href="http://swcriciuma.synapsee.com.br/">http://swcriciuma.synapsee.com.br/</a>
      </div>
    </div>
  );
};

export default Telao;
