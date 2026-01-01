
import { useRef } from "react";
import AnimatedText from "../components/AnimatedText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";


const AnimatedHeader = ({subtitle,title,text,textColor,isScroll}) => {
      const contextRef = useRef(null);
      const headerRef = useRef(null);
    
    
      useGSAP(() => {
        const mm = gsap.matchMedia();

        const config = isScroll ? {
            trigger: contextRef.current,
            start: "top 80%"
        } : undefined;

        mm.add({
          // Mobile settings
          isMobile: "(max-width: 767px)",
          // Desktop settings 
          isDesktop: "(min-width: 768px)",
        }, (context) => {
          const { isMobile } = context.conditions;
          
          // Config: Only use ScrollTrigger on Desktop
          const config = (isScroll && !isMobile) ? {
              trigger: contextRef.current,
              start: "top 80%"
          } : undefined;
          
          const tl = gsap.timeline({
            scrollTrigger: config
          });

          // Mobile: Simple fade in, no heavy scroll trigger
          // Desktop: Original Scroll Trigger animation
          tl.from(contextRef.current, {
            y: isMobile ? 0 : "50vh", // No movement on mobile start
            opacity: isMobile ? 0 : 1, // Fade in on mobile
            duration: 1,
            ease: "circ.out",
          });
          
          tl.from(
            headerRef.current,
            {
              opacity: 1,
              y: isMobile ? 0 : "200",
              duration: 1,
              ease: "circ.out",
            },
            "<+0.2"
          );
        });
        
        return () => mm.revert();
      }, [isScroll]);
  return (
           <div ref={contextRef} className="mb-70">
                <div style={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)" }}>
                  <div
                    ref={headerRef}
                    className="flex flex-col justify-center gap-12 sm:gap-16 pt-16"
                  >
                  
                    <div className="px-10">
                      <h1 className={`flex flex-col flex-wrap gap-12 ${textColor} banner-text-responsive sm:gap-16 md:block uppercase`}>
                        {title}
                      </h1>
                     
                    </div>
                  </div>
                 
                </div>
                    
                <div className={`relative px-10 ${textColor}`}>
                  
                  <div className="absolute  inset-x-0 border-t-2">
                     <p className={`text-sm mt-5   ml-10 font-light tracking-[0.3rem] uppercase px-10 ${textColor}`}>
                    {subtitle}
                    </p>
                    <div className="py-12 sm:py-16 text-end px-10">
                      <AnimatedText
                        text={text}
                        className="font-light uppercase value-text-responsive"
                      />
                      
                    </div>  
                    
                  </div>
                </div>
              </div>
  )
}

export default AnimatedHeader