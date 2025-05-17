import { useEffect, useState } from "react";

export const MessageDisplay = ({ message }: {message: {id: string; content: string; duration: number}}) => {
  const [timeLeft, setTimeLeft] = useState(message?.duration ?? 0);

  useEffect(() => {
    setTimeLeft(message?.duration ?? 0);
    if (!message?.id) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const timeout = setTimeout(() => {
      fetch(`https://big-screen-backend.onrender.com/api/messages/${message.id}`, {
        method: "DELETE",
      });
    }, message.duration * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [message]);

  if (!message) {
    return (
      <div className="text-display animate-fade-in p-8 max-w-4xl text-center">
        <p className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Aguardando novas mensagens
        </p>
      </div>
    );
  }

  return (
    <div className="text-display animate-fade-in p-8 max-w-4xl text-center">
      <p className="text-4xl md:text-6xl font-bold text-white leading-tight">
        {message.content}
      </p>
      <div className="mt-4 text-2xl text-white/80">
        Tempo restante: {timeLeft}s
      </div>
    </div>
  );
};