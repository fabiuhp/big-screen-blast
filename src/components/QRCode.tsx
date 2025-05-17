
import { useEffect, useRef } from 'react';
import QRCodeLib from 'qrcode';

interface QRCodeProps {
  url: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
}

const QRCode = ({ url, size = 128, bgColor = '#FFFFFF', fgColor = '#000000' }: QRCodeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCodeLib.toCanvas(
        canvasRef.current,
        url,
        {
          width: size,
          margin: 1,
          color: {
            dark: fgColor,
            light: bgColor
          }
        },
        (error) => {
          if (error) console.error(error);
        }
      );
    }
  }, [url, size, bgColor, fgColor]);

  return (
    <div className="qrcode-container bg-white p-3 rounded-lg shadow-lg">
      <canvas ref={canvasRef} />
      <div className="text-center text-xs mt-1 font-medium text-gray-600">
        Escaneie para acessar
      </div>
    </div>
  );
};

export default QRCode;
