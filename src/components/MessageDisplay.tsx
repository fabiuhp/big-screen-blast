
import { useEffect, useRef } from 'react';
import { Message } from '@/pages/Telao';

export const MessageDisplay = ({ message }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
      <div className="text-display animate-fade-in p-8 max-w-4xl text-center">
        <p className="text-4xl md:text-6xl font-bold text-white leading-tight">
          {message?.content}
        </p>
      </div>
    );
};
