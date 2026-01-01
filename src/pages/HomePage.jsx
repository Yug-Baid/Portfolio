import ReactLenis from 'lenis/react';
import Navbar from '../Sections/Navbar';
import Hero from '../Sections/Hero';
import ServiceSmmary from '../Sections/ServiceSmmary';
import Services from '../Sections/Services';
import About from '../Sections/About';
import Work from '../Sections/Work';
import Education from '../Sections/Education';
import ContactSummary from '../Sections/ContactSummary';
import Contact from '../Sections/Contact';

const HomePage = () => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }} className='relative w-full min-h-screen overflow-x-hidden'>
      <Navbar/>
      <Hero/>
      <ServiceSmmary/>
      <Services/>
      <About/>
      <Education/>
      <Work/>
      <ContactSummary/>
      <Contact/>
    </ReactLenis>
  );
};

export default HomePage;
