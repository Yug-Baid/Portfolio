import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    // Check if device is touch-enabled (usually mobile/tablet)
    // We generally don't want custom cursors on touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const moveCursor = (e) => {
      // Use gsap for smoother performance than direct style manipulation
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1, // Slight lag for smooth feeling
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', moveCursor);

    // Initial positioning to avoid jump
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="cursor fixed top-0 left-0 w-6 h-6 rounded-full bg-[#EFD390] mix-blend-difference pointer-events-none z-[9999] hidden md:block"
      style={{ transform: 'translate(-50%, -50%)', left: 0, top: 0 }} 
    ></div>
  );
};

export default CustomCursor;
