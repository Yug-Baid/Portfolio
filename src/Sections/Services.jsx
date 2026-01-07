import { useRef } from "react"
import AnimatedHeader from "../components/AnimatedHeader"
import { servicesData } from "../Data"
import { useMediaQuery } from "react-responsive"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"


const Services = () => {
    const serviceRef = useRef([])
    const isDesktop = useMediaQuery({minWidth:"56rem"})
    useGSAP(()=>{
        const mm = gsap.matchMedia();

        mm.add({
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        }, (context) => {
          const { isMobile } = context.conditions;

          serviceRef.current.forEach((el)=>{
              if(!el) return;

              gsap.from(el,{
                  y: isMobile ? 0 : 60, // No movement on mobile
                  opacity: isMobile ? 1 : 0, // Already visible or simple fade
                  
                  // Only use scrollTrigger on Desktop
                  scrollTrigger: isMobile ? undefined : {
                      trigger: el,
                      start: 'top 85%',
                      end: 'top 60%',
                      toggleActions: 'play none none reverse',
                  },
                  
                  duration: isMobile ? 0 : 0.8, // Instant on mobile
                  ease: "power2.out",
                  force3D: true,
                  willChange: "transform, opacity"
              })
          })
        });

        return () => mm.revert();
    },[])
    const text =  ``
  return (
   <section id="Services" className="bg-black min-h-screen rounded-t-4xl py-12 sm:py-16 md:py-20">
    <AnimatedHeader subtitle={"Behind the scene , Beyond the screen"}
        title={"Service"}
        text={text}
        textColor="text-white"
        isScroll={true}
    />
    {servicesData.map((service,idx)=>(
        <div ref={(el)=>(serviceRef.current[idx] = el)}
        key={idx}
        className="sticky px-4 sm:px-6 md:px-10 pt-5 sm:pt-6 pb-8 sm:pb-10 md:pb-12 text-white bg-black border-t-2 border-white/30" 
        style={isDesktop?{top:`calc(10vh + ${idx*5}em)`,marginBottom:`${(servicesData.length - idx - 1)*5}rem`}:{top:0}}>
            <div className="flex items-center justify-between gap-4 font-light">
                <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
                    <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl">{service.title}</h2>
                    <p className="tracking-wide sm:tracking-wider text-base sm:text-lg md:text-xl lg:text-2xl text-white/60 text-pretty max-w-4xl">{service.description}</p>
                    <div className="flex flex-col gap-2 text-xl sm:text-2xl md:gap-3 lg:text-3xl text-white/80">
                    {service.items.map((item,itemidx)=>(
                        <div key={`item-${idx}-${itemidx}`}>
                            <h3 className="flex flex-col"> 
                                <span className="flex items-center gap-3 sm:gap-4">
                                    <span className="text-base sm:text-lg text-white/30 shrink-0">0{itemidx+1}</span>
                                    <span>{item.title}</span>
                                </span>
                                {item.description && (
                                    <span className="ml-10 sm:ml-12 text-sm sm:text-base md:text-lg text-white/50 font-light mt-1">
                                        {item.description}
                                    </span>
                                )}
                            </h3>
                            {itemidx < service.items.length -1 && (
                            <div className="w-full h-px my-2 bg-white/30 "/>
                            )}
                        </div>
                    ))}</div>
                </div>
            </div>
        </div>
    ))}
   </section>
  )
}

export default Services