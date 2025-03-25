import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white text-center p-4 mt-8">
      <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center">
        <p className="text-sm sm:text-base font-semibold">
          <span className="text-green-300">&lt;</span>SecureKey
          <span className="text-green-300">/&gt;</span> © 2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
