import React from "react";

const CustomButton = ({ word, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white text-black font-semibold px-6 py-2 rounded-md shadow-md transition-all duration-300 hover:bg-blue-800 hover:scale-105"
    >
      {word}
    </button>
  );
};

export default CustomButton;
