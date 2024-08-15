import React from 'react';

const Notification = ({ message, description, type, onClose }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-white text-green-700';
      case 'error':
        return 'bg-white text-red-700';
      case 'warning':
        return 'bg-white text-yellow-700';
      case 'info':
      default:
        return 'bg-white text-blue-700';
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m0-4h.01M12 17h.01M12 17h.01M12 17h.01M12 17h.01M12 17h.01M12 17h.01M12 17h.01M12 17h.01" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m0-4h.01M12 17h.01" />
          </svg>
        );
    }
  };

  return (
    <div className="fixed max-w-sm w-full mx-auto rounded-md shadow-lg border ${getTypeStyles()} p-4 flex items-start space-x-4 top-4 right-4">
      <div className="flex-shrink-0">
        {getTypeIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-left">{message}</p>
        <p className="text-sm text-black">{description}</p>
      </div>
      <div className="flex-shrink-0 self-start">
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;