
import { useEffect, useRef } from 'react';
import { Message } from '@/pages/Telao';

interface MessageDisplayProps {
  message: Message;
}

export const MessageDisplay = ({ message }: MessageDisplayProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play video when the component mounts
    if (message.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Failed to play video:', error);
      });
    }
  }, [message]);

  if (message.type === 'text') {
    return (
      <div className="text-display animate-fade-in p-8 max-w-4xl text-center">
        <p className="text-4xl md:text-6xl font-bold text-white leading-tight">
          {message.content}
        </p>
      </div>
    );
  }

  if (message.type === 'image') {
    return (
      <div className="image-display animate-fade-in p-4">
        <img 
          src={message.content} 
          alt="Imagem enviada pelo usuário"
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg" 
        />
      </div>
    );
  }

  if (message.type === 'video') {
    return (
      <div className="video-display animate-fade-in w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          src={message.content}
          className="max-w-full max-h-full object-contain"
          muted={false}
          controls={false}
        />
      </div>
    );
  }

  return null;
};
