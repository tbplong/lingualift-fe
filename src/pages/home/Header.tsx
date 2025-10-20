import React from "react";

const Welcome = ({ setPage }) => {
  return (
    <div className="bg-[rgb(244,247,249)] h-60 rounded p-6">
      <div className="flex items-center justify-between h-full">
        <div className="flex-[2] flex flex-col justify-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome back, Stella Walton
          </h2>
          <p className="text-gray-600">sdfsdfdsfdsfsfdsf</p>
          <p className="text-sm text-gray-500">jngrfefdf</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded mt-2 w-fit transition-colors"
            onClick={() => {
              setPage(3);
            }}
          >
            Get Started
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center rotate-25">
          <img
            src="/image/abc.png"
            alt="Books illustration"
            className="w-80 h-80 object-contain "
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
