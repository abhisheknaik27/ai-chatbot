import React from "react";

const Header = () => {
  return (
    <div className="relative">
      <h1 className="text-4xl font-bold py-4 uppercase text-white">
        Ai answer generator
        <span className="text-xs absolute bottom-0 right-0 bg-gradient-to-br from-gray-300 to-sky-400 bg-clip-text text-transparent">
          powered by Google Gemini
        </span>
      </h1>
    </div>
  );
};

export default Header;
