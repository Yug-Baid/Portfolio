"use client";

import React, { useRef } from "react";
import AnimatedHeader from '../components/AnimatedHeader';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  const text = `A journey of continuous learning and 
  academic excellence that shapes 
  my professional expertise.`;

  const educationData = [
    {
      degree: "High School (Class XII)",
      institution: "CS Vidya Bharti School",
      year: "2022 - 2024",
      description: "Completed secondary education with Science stream, achieving 87.3% in board examinations.",
      skills: ["Physics", "Mathematics", "Chemistry"]
    },
    {
      degree: "Bachelor of Technology",
      institution: "Indian Institute of Technology, Vadodara",
      year: "2024 - 2028",
      description: "Pursuing B.Tech in Computer Science with a CGPA of 8.87. Specializing in Full Stack Development and modern web technologies.",
      skills: ["Data Structures", "Algorithms", "System Design"]
    },
    {
      degree: "Full Stack Development",
      institution: "Apna College",
      year: "2024",
      description: "Completed comprehensive Full Stack Development certification covering modern web technologies and frameworks.",
      skills: ["React", "Node.js", "HTML/CSS", "JavaScript", "Tailwind CSS"]
    }
  ];

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 767px)",
      isDesktop: "(min-width: 768px)",
    }, (context) => {
      const { isMobile } = context.conditions;

      // Animate the items as they scroll into view
      itemsRef.current.forEach((el, index) => {
          if (!el) return;
          
          const isLeft = index % 2 === 0;
          
          // Mobile: Static | Desktop: Slide
          const initialX = isMobile ? 0 : (isLeft ? -100 : 100);
          const initialY = isMobile ? 0 : 20;

          gsap.fromTo(el, 
              { 
                  opacity: isMobile ? 1 : 0, 
                  x: initialX, 
                  y: initialY 
              },
              {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  duration: isMobile ? 0 : 1, // Instant on mobile
                  ease: "power3.out",
                  scrollTrigger: isMobile ? undefined : {
                      trigger: el,
                      start: "top 80%",
                      end: "top 20%",
                      toggleActions: "play none none reverse"
                  }
              }
          );
      });

      // Animate the central line - Desktop only
      if (!isMobile) {
        gsap.fromTo(".timeline-line",
            { scaleY: 0, transformOrigin: "top" },
            { 
                scaleY: 1, 
                duration: 1.5, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%"
                }
            }
        );
      }
    });
    
    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="Education" className="w-full bg-[var(--color-primary)] py-20 overflow-hidden">
      
      {/* Header */}
      <div className="mb-20">
             <AnimatedHeader 
                subtitle={"Academic Timeline"}
                title={"Education"}
                text={text}
                textColor="text-black"
                isScroll={true}
            />
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative max-w-7xl mx-auto px-4 flex flex-col gap-0 md:gap-0">
          
          {/* Central Line (Visible only on Desktop) */}
          <div className="timeline-line hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/10 -translate-x-1/2 z-0"></div>

          {educationData.map((item, index) => (
             <TimelineItem 
                key={index}
                data={item}
                index={index}
                align={index % 2 === 0 ? "left" : "right"} 
                itemRef={(el) => (itemsRef.current[index] = el)}
             />
          ))}

      </div>
    </section>
  );
};

const TimelineItem = ({ data, align, index, itemRef }) => {
    const isLeft = align === "left";

    return (
        <div ref={itemRef} className={`relative w-full flex md:items-center mb-16 md:mb-0 ${isLeft ? "md:justify-start" : "md:justify-end"}`}>
            
            {/* Desktop Center Dot */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[var(--color-gold)] bg-[var(--color-primary)] z-10 items-center justify-center">
                 <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]"></div>
            </div>

            {/* Content Card container */}
            <div className={`w-full md:w-1/2 ${isLeft ? "md:pr-16" : "md:pl-16"} relative`}>
                
                {/* Mobile Line and Dot (Left aligned) */}
                <div className="md:hidden absolute left-[19px] top-6 bottom-[-64px] w-[1px] bg-black/10 z-0 last:hidden"></div>
                <div className="md:hidden absolute left-0 top-6 w-10 h-10 flex items-center justify-center z-10">
                    <div className="w-3 h-3 rounded-full border border-[var(--color-gold)] bg-[var(--color-primary)]"></div>
                </div>

                {/* The Card - Reverted Color */}
                <div 
                    className={`ml-12 md:ml-0 glass-card bg-[#FAFDEE]/80 backdrop-blur-md p-8 rounded-2xl border border-black/5 hover:border-[var(--color-gold)]/30 transition-colors shadow-sm group hover:shadow-lg`}
                >
                    <div className="flex flex-col gap-2">
                        {/* Header Area */}
                        <div className="flex justify-between items-start gap-4">
                            <div>
                                <h3 className="text-2xl font-amiamie text-black group-hover:text-[var(--color-gold)] transition-colors duration-300">
                                    {data.degree}
                                </h3>
                                <p className="text-sm font-bold opacity-60 mt-1">{data.institution}</p>
                            </div>
                            <span className="shrink-0 text-[var(--color-gold)] font-mono text-xs border border-[var(--color-gold)]/20 px-2 py-1 rounded">
                                {data.year}
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-[1px] bg-black/5 my-3"></div>

                        {/* Description */}
                        <p className="text-black/70 font-light leading-relaxed mb-4">
                            {data.description}
                        </p>
                        
                        {/* Skills */}
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-white rounded-full text-xs text-black/60 border border-black/5">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Education;
