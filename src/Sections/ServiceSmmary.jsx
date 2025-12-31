import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger)

const ServiceSmmary = () => {
    useGSAP(()=>{
        gsap.to("#title-service-1",{
            xPercent:20,
            scrollTrigger:{
                target:"#title-service-1",
                scrub:true
            }
        })
             gsap.to("#title-service-2",{
            xPercent:-20,
            scrollTrigger:{
                target:"#title-service-2",
                scrub:true
            }
        })
             gsap.to("#title-service-3",{
            xPercent:80,
            scrollTrigger:{
                target:"#title-service-3",
                scrub:true
            }
        })
             gsap.to("#title-service-4",{
            xPercent:-80,
            scrollTrigger:{
                target:"#title-service-4",
                scrub:true
            }
        })
    })

  return (
    <section id="" className="mt-20 overflow-hidden font-light leading-snug text-center mb-42 contact-text-responsive">
        <div id="title-service-1">
            <p>Architecture</p>
        </div>
        <div className="flex items-center justify-center gap-3 translate-x-16" id="title-service-2">
            <p className="font-normal">Development</p>
              <div className="w-10 h-1 md:w-32 bg-gold"/>
            <p>Deployment</p>
 
        </div>
        <div id="title-service-3" className="flex items-center justify-center gap-3 -translate-x-48">
            <p>APIs</p>
             <div className="w-10 h-1 md:w-32 bg-gold"/>
            <p>Frontends</p>
             <div className="w-10 h-1 md:w-32 bg-gold"/>
            <p>Scalability</p>
        </div>
        <div className="translate-x-48" id="title-service-4">
            <p>Databases</p>
        </div>
    </section>
  )
}

export default ServiceSmmary