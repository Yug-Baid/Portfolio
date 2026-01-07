
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

          // Mobile: Simple fade in without large y movement to prevent layout shifts
          // Desktop: Original Scroll Trigger animation
          tl.from(contextRef.current, {
            y: isMobile ? 0 : "50vh",
            opacity: isMobile ? 1 : 1, // Keep opacity 1 to avoid flash
            duration: isMobile ? 0.5 : 1,
            ease: "circ.out",
          });
          
          tl.from(
            headerRef.current,
            {
              opacity: 1,
              y: isMobile ? 0 : "200",
              duration: isMobile ? 0.5 : 1,
              ease: "circ.out",
            },
            "<+0.2"
          );
        });
        
        return () => mm.revert();
      }, [isScroll]);
  return (
           <div ref={contextRef} className="mb-16 sm:mb-20 md:mb-24 lg:mb-28">
                <div style={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)" }}>
                  <div
                    ref={headerRef}
                    className="flex flex-col justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 pt-12 sm:pt-14 md:pt-16"
                  >
                  
                    <div className="px-4 sm:px-6 md:px-8 lg:px-10">
                      <h1 className={`flex flex-col flex-wrap gap-8 sm:gap-10 md:gap-12 lg:gap-16 ${textColor} banner-text-responsive md:block uppercase`}>
                        {title}
                      </h1>
                     
                    </div>
                  </div>
                 
                </div>
                    
                <div className={`relative px-4 sm:px-6 md:px-8 lg:px-10 ${textColor}`}>
                  
                  <div className="absolute inset-x-0 border-t-2">
                     <p className={`text-xs sm:text-sm mt-4 sm:mt-5 ml-0 sm:ml-6 md:ml-10 font-light tracking-[0.2rem] sm:tracking-[0.3rem] uppercase px-4 sm:px-6 md:px-10 ${textColor}`}>
                    {subtitle}
                    </p>
                    <div className="sm:pb-10 md:pb-12 lg:pb-16 text-end px-4 sm:px-6 md:px-10">
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