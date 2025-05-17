
import { useEffect, useRef } from 'react';
import { Message } from '@/pages/Telao';

interface MessageDisplayProps {
  message: Message;
}

export const MessageDisplay = ({ message }: MessageDisplayProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play audio/video when the component mounts
    if (message.type === 'audio' && audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error('Failed to play audio:', error);
      });
    } else if (message.type === 'video' && videoRef.current) {
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

  if (message.type === 'audio') {
    return (
      <div className="audio-display animate-fade-in">
        <div className="audio-visualization w-64 h-64 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center animate-pulse">
          <div className="text-white text-2xl">▶️ Reproduzindo Áudio</div>
        </div>
        <audio ref={audioRef} src={message.content} className="hidden" />
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
