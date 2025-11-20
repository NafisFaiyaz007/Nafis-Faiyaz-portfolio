import React, { useState, useEffect } from "react";
import siteContent from "../content/siteContent";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { profile, documents, navbar } = siteContent;
  const navigateToLink = (link) => {
    window.open(link, "_blank");
  };
  // Shrink navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`bg-black bg-opacity-50 fixed top-0 w-full font-raleway z-50 shadow-lg transition-all duration-300 ${
        scrolling ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-8 py-4 flex justify-between items-center">
        {/* Left Section: Brand Name */}
        <div className="flex items-center space-x-6">
          <img
            className="w-14 max-w-xs sm:max-w-sm rounded-full border-2 border-myCyan object-cover"
            src={profile.profileImage}
            alt="Profile Pic"
            loading="lazy"
            decoding="async"
          />
          <h2 className="font-bebas text-2xl border-l-2 p-4 text-myCyan">
            {navbar.tagline}
          </h2>
        </div>

        {/* Desktop Menu */}
        <div className="space-x-6 hidden md:flex">
          <button
            onClick={() => navigateToLink(documents.academicCv)}
            download
            className="inline-block text-sm px-6 py-2 leading-none border rounded text-gray-100 border-white hover:border-2  hover:border-myCyan hover:text-white transition duration-300"
          >
            {navbar.academicLabel}
          </button>
          <button
            onClick={() => navigateToLink(documents.professionalCv)}
            download
            className="inline-block text-sm px-6 py-2 leading-none border rounded text-gray-100 border-white hover:border-2 hover:border-myCyan hover:text-white transition duration-300"
          >
            {navbar.professionalLabel}
          </button>
          
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-gray-100 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-8 h-8" // Adjusted width and height for better visibility
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg" // Make sure to include xmlns for proper SVG rendering
            >
              <path fill="currentColor" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-70 px-4 py-6">
          <ul className="space-y-4 text-lg text-gray-100">
            <li>
              <button
                onClick={() => navigateToLink(documents.academicCv)}
                download
                className="inline-block text-sm px-6 py-2 leading-none border rounded-md text-gray-100 border-white hover:border-2  hover:border-myCyan hover:text-white "
              >
                {navbar.academicLabel}
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToLink(documents.professionalCv)}
                download
                className="inline-block text-sm px-6 py-2 leading-none border rounded-md text-gray-100 border-white hover:border-2 hover:border-myCyan hover:text-white"
              >
                {navbar.professionalLabel}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
