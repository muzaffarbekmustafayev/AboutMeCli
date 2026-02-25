import React, { useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Download } from 'lucide-react';

const ImageModal = ({ image, title, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = title || 'image';
    link.click();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
      >
        <X size={24} />
      </button>

      <button
        onClick={handleDownload}
        className="absolute top-4 right-16 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
      >
        <Download size={24} />
      </button>

      <div onClick={(e) => e.stopPropagation()} className="max-w-5xl max-h-[90vh] overflow-auto">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-auto rounded-lg"
        />
        {title && (
          <p className="text-white text-center mt-4 text-lg font-semibold">{title}</p>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
