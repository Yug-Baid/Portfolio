import { useRef } from "react"
import Marquee from "./Marquee"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const ContactSummary = () => {
    const items = ["Innovation","Precision","Trust","Collaboration","Excellence"]
    const items2 = ["Contact Us","Contact Us","Contact Us","Contact Us","Contact Us","Contact Us","Contact Us",]
     const contactRef = useRef(null)

    useGSAP(()=>{
        const mm = gsap.matchMedia();
        
        mm.add({
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        }, (context) => {
          const { isMobile } = context.conditions;
          
          // Only pin on desktop for better mobile scroll experience
          if (!isMobile) {
            gsap.to(contactRef.current,{
                scrollTrigger:{
                    trigger:contactRef.current,
                    start:"center center",
                    end:"+=800 center",
                    pin:true,
                    pinSpacing:true,
                    markers:false
                }
            });
          }
        });
        
        return () => mm.revert();
    })

  return (
     <section ref={contactRef}  className="flex flex-col items-center justify-between min-h-screen gap-8 sm:gap-10 md:gap-12 mt-12 sm:mt-14 md:mt-16">
        <Marquee items = {items}/>
        <div className="overflow-hidden font-light text-center contact-text-responsive px-4 sm:px-6">
            <p>" Let's build a <br />
            <span className="text-normal">memorable</span> & <span className="italic ">inspiring</span><br />
            web application <span className="text-gold">together</span>"
            </p>
        </div>
        <Marquee 
        items={items2}
        reverse={true}
        className="text-black bg-transparent border-y-2"
        iconClassName="stroke-gold stroke-2 text-primary"
        icon="ph:arrow-right"
        />
     </section>
  )
}

export default ContactSummary