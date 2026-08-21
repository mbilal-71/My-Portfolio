import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import SeeItInAction from './components/SeeItInAction';
import FeaturedProjects from './components/FeaturedProjects';
import Technologies from './components/Technologies';
import Experience from './components/Experience';
import Contact from './components/Contact';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';

import './index.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Enable smooth scrolling via GSAP (optional, CSS handles basics)
    ScrollTrigger.config({ limitCallbacks: true });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <SeeItInAction />
        <FeaturedProjects />
        <Technologies />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
