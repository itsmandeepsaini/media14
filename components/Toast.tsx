import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600'
  };

  const icons = {
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
    info: <Info size={20} />
  };

  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[100] flex items-center space-x-3 px-6 py-3 rounded-full shadow-lg text-white font-medium animate-bounce-in ${bgColors[type]}`}>
      {icons[type]}
      <span>{message}</span>
    </div>
  );
};

export default Toast;