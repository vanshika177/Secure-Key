import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">
          <span className="text-green-300">&lt;</span>SecureKey
          <span className="text-green-300">/&gt;</span>
        </h1>

        {/* Mobile Menu Button */}
        <button className="block md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <lord-icon
            src="https://cdn.lordicon.com/jtqmyoan.json"
            trigger="hover"
            style={{ width: "30px", height: "30px" }}
          ></lord-icon>
        </button>

        {/* GitHub Link (Desktop) */}
        <a
          href="https://github.com/vanshika177"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block text-lg hover:text-green-300"
        >
          <lord-icon
            src="https://cdn.lordicon.com/gigfpovs.json"
            trigger="hover"
            colors="primary:#ffffff,secondary:#61dafb"
            style={{ width: "30px", height: "30px" }}
          ></lord-icon>
        </a>
      </div>

      {/* GitHub Link (Mobile Menu) */}
      {isOpen && (
        <div className="md:hidden mt-4 text-center bg-green-900 p-4 rounded-lg">
          <a
            href="https://github.com/vanshika177"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-lg hover:text-green-300"
          >
            <lord-icon
              src="https://cdn.lordicon.com/gigfpovs.json"
              trigger="hover"
              colors="primary:#ffffff,secondary:#61dafb"
              style={{ width: "30px", height: "30px" }}
            ></lord-icon>
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
