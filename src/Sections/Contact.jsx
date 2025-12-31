import { useGSAP } from "@gsap/react"
import AnimatedHeader from "../components/AnimatedHeader"
import { socials } from "../Data"
import Marquee from "./Marquee"
import gsap from "gsap"

const Contact = () => {
    useGSAP(()=>{
        gsap.from(".social-link",{
            y:100,
            opacity:0,
            duration:0.5,
            stagger:0.3,
            ease:"back.out",
            scrollTrigger:{
                trigger:".social-link"
            }
        })
    },[])
    const item= ["Just imagine I code","Just imagine I code","Just imagine I code","Just imagine I code","Just imagine I code",]
    const text = `Got a question, how or project Idea?
    WE'D love to hear from you and discuss further! `
  return (
    <section id="Contact" className="flex flex-col justify-between min-h-screen bg-black">
        <div>
             <AnimatedHeader subtitle={"You Dream it, I Code it"}
        title={"Contact"}
        text={text}
        textColor="text-white"
        isScroll={true}
    />
    <div className="flex px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-10 ">
        <div className="flex flex-col w-full gap-10">
            <div className="social-link">
                <h2>E-mail</h2>
                <div className="w-full h-[1px] my-2 bg-white/30 "/>
                <p className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
                    yugbaid4@gmail.com
                </p>
            </div>
            <div className="social-link">
                <h2>Phone</h2>
                <div className="w-full h-[1px] my-2 bg-white/30 "/>
                <p className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
                    +91 79845 83673
                    </p>
            </div>
            <div className="social-link">
            <h2>Social Media</h2>
            <div className="w-full h-[1px] my-2 bg-white/30 "/>
            <div className="flex flex-wrap gap-2">
                {socials.map((social,idx)=>(
                    <a href={social.href} key={idx} className="text-xs ">
                        {"{"}
                    {social.name}
                    {"}"}
                    </a>
                ))}
            </div>
            </div>
        </div>
    </div>
        </div>
        <Marquee items={item} className="text-white bg-transparent"/>
    </section>
  )
}

export default Contact