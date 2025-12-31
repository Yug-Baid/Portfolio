import { useRef } from "react"
import Marquee from "./Marquee"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const ContactSummary = () => {
    const items = ["Innovation","Precision","Trust","Collaboration","Excellence"]
    const items2 = ["Contact Us","Contact Us","Contact Us","Contact Us","Contact Us","Contact Us","Contact Us",]
     const contactRef = useRef(null)

    useGSAP(()=>{
        gsap.to(contactRef.current,{
            scrollTrigger:{
                trigger:contactRef.current,
                start:"center center",
                end:"+=800 center",
                pin:true,
                pinSpacing:true,
                markers:false
            }
        })
    })

  return (
     <section ref={contactRef} id='Contact' className="flex flex-col items-center justify-between min-h-screen gap-12 mt-16">
        <Marquee items = {items}/>
        <div className="overflow-hidden font-light text-center contact-text-responsive">
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
        icon="material-symbols-light:square"
        />
     </section>
  )
}

export default ContactSummary