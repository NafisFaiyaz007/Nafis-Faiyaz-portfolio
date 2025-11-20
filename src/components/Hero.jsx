/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "animate.css";
import "font-awesome/css/font-awesome.min.css";
import siteContent from "../content/siteContent";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { profile, hero } = siteContent;
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative bg-black bg-opacity-30 py-32 px-4 font-raleway sm:px-10 lg:px-16 text-myWhite min-h-screen flex items-center"
    >
      <div className="container mx-auto z-10 relative grid grid-cols-1 sm:grid-cols-2 gap-6 items-center justify-center">
        {/* Left Grid: Profile Picture and Name/Designation */}
        <div
          className={`flex flex-col justify-center align-middle items-center mb-6 sm:mb-0 ${
            isVisible ? "animate__animated animate__fadeInLeft" : ""
          }`}
        >
          <div className="relative rounded-full overflow-hidden shadow-xl mb-4 transform transition duration-600 hover:scale-105">
            <img
              className="w-auto max-w-xs sm:max-w-sm object-cover"
              src={profile.profileImage}
              alt="Profile Pic"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <h1 className="text-3xl sm:text-5xl font-bebas text-myWhite leading-tight mb-2 text-center">
            {profile.name}
          </h1>
          <p className="text-lg sm:text-xl font-raleway text-myCyan opacity-100 mb-6 text-center">
            {profile.title}
          </p>

          {/* Social Links: GitHub & LinkedIn */}
          <div className="flex space-x-6 justify-center">
            <a
              href="https://github.com/nafisfaiyaz007"
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl hover:text-myCyan transition duration-300"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/nafis-faiyaz193/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl hover:text-myCyan transition duration-300"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        {/* Right Grid: Bio Section */}
        <div
          className={`text-justify sm:text-left sm:border-l-2 sm:border-myWhite ${
            isVisible ? "animate__animated animate__fadeInRight" : ""
          }`}
        >
          {/* Introduction Section */}
          <div className="w-full rounded-lg text-myWhite p-6 sm:p-8 text-justify shadow-xl">
            <h2 className="font-bebas text-2xl ">{hero.biographyHeading}</h2>
            <p className="text-sm leading-loose mb-4">{hero.biography}</p>

            <h2 className="text-2xl font-bebas mt-2">
              {hero.researchHeading}
            </h2>
            <p className="text-sm  leading-loose">{hero.researchText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
