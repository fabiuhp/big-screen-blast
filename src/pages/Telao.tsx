
import { useEffect, useState } from "react";
import { MessageDisplay } from "@/components/MessageDisplay";

// Types for our messages
export interface Message {
  id: string;
  type: 'text' | 'image' | 'video';
  content: string; // Text content or file URL
  duration: number; // in seconds
}

// Mock data - in a real application this would come from a database
const mockMessages: Message[] = [
  {
    id: '1',
    type: 'text',
    content: 'Feliz aniversário Maria! Parabéns pelos seus 30 anos!',
    duration: 8,
  },
  {
    id: '2',
    type: 'text',
    content: 'João e Ana, vocês são incríveis! Obrigado por tudo!',
    duration: 7,
  },
  {
    id: '3',
    type: 'text',
    content: 'Estou amando o evento! Melhor festa do ano!',
    duration: 5,
  }
];

const Telao = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    // Function to cycle through messages
    const cycleMessages = () => {
      const currentMessage = messages[currentMessageIndex];
      
      // Show the message
      setShowMessage(true);
      
      // Set timeout to hide the message based on its duration
      const hideTimeout = setTimeout(() => {
        setShowMessage(false);
        
        // Set timeout to show the next message after a transition period
        setTimeout(() => {
          setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 1000); // 1 second transition between messages
      }, currentMessage.duration * 1000);
      
      return () => clearTimeout(hideTimeout);
    };
    
    cycleMessages();
    
    // Poll for new messages in a real application
    const intervalId = setInterval(() => {
      // This would fetch new messages from an API
      // For now we just use the mock data
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [currentMessageIndex, messages]);

  const currentMessage = messages[currentMessageIndex];

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative" 
      style={{
        background: "radial-gradient(circle at center, #f7d34a 10%, #f9844a 30%, #f5515f 50%, #3cb371 90%)"
      }}
    >
      {showMessage && currentMessage && (
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${showMessage ? 'opacity-100' : 'opacity-0'}`}>
          <MessageDisplay message={currentMessage} />
        </div>
      )}
      
      {/* Logo or watermark could go here */}
      <div className="absolute bottom-4 right-4 text-white/50 text-sm">
        enviemensagens.com.br
      </div>
    </div>
  );
};

export default Telao;
