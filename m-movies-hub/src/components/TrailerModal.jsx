import React from "react";

   const TrailerModal = ({ videoId, movieTitle, isOpen, onClose }) => {
         if (!isOpen || !videoId) return null;
    const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
        };

   return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-4xl w-full">
        
        <button 
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-xl hover:text-gray-300 bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>
        
        
        <div className="aspect-video bg-black rounded overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={`${movieTitle} Trailer`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );

  };

export default TrailerModal;