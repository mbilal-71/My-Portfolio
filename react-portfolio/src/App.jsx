import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar           from './components/Navbar';
import Hero             from './components/Hero';
import About            from './components/About';
import Services         from './components/Services';
import FeaturedProjects from './components/FeaturedProjects';
import Technologies     from './components/Technologies';
import Experience       from './components/Experience';
import Testimonials     from './components/Testimonials';
import Contact          from './components/Contact';
import Footer           from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

import './index.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
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
        <FeaturedProjects />
        <Technologies />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
