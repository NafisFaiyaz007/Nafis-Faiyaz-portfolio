import React from "react";
import Background from "../components/Background";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Education from "../components/Education";
import ProjectSection from "../components/ProjectSection";
import Toolkit from "../components/Toolkit";
import Painting from "../components/Painting";
import Footer from "../components/Footer";

const Home = () => (
  <div className="relative min-h-screen font-sans text-fg">
    <Background />
    <Navbar />
    <main className="relative z-10">
      <Hero />
      <About />
      <Experience />
      <Education />
      <ProjectSection />
      <Toolkit />
      <Painting />
    </main>
    <div className="relative z-10">
      <Footer />
    </div>
  </div>
);

export default Home;
