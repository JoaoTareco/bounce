import React from "react";

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10">
      <div className="flex items-center justify-center h-full">
        <span className="text-white text-xl font-bold">
          Placing Booking...
        </span>
      </div>
    </div>
  );
};

export default LoadingOverlay;