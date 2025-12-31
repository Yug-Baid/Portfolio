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
        serviceRef.current.forEach((el)=>{
            if(!el) return;

            gsap.from(el,{
                y:100,
                scrollTrigger:{
                    trigger:el,
                    start:'top 80%',

                },
                duration:1,
                ease:"circ.out "
            })
        })
    },[])
    const text =  `I build high-performance full-stack apps
    with smooth UX to drive growth
    not headaches.`
  return (
   <section id="Services" className="bg-black min-h-screen rounded-t-4xl">
    <AnimatedHeader subtitle={"Behind the scene , Beyond the screen"}
        title={"Service"}
        text={text}
        textColor="text-white"
        isScroll={true}
    />
    {servicesData.map((service,idx)=>(
        <div ref={(el)=>(serviceRef.current[idx] = el)}
        key={idx}
        className="sticky px-10 pt-6 pb-12 text-white bg-black border-t-2 border-white/30 " style={isDesktop?{top:`calc(10vh + ${idx*5}em)`,marginBottom:`${(servicesData.length - idx - 1)*5}rem`}:{top:0}}>
            <div className="flex items-center justify-between gap-4 font-light ">
                <div className="flex flex-col gap-6 ">
                    <h2 className="text-4xl lg:text-5xl">{service.title}</h2>
                    <p className="tracking-widest lg:text-2xl text-white/60 text-pretty">{service.description}</p>
                    <div className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl text-white/80">
                    {service.items.map((item,itemidx)=>(
                        <div key={`item-${idx}-${itemidx}`}>
                            <h3 className="flex"> 
                                <span className="mr-12 text-lg text-white/30">0{itemidx+1}</span>
                                {item.title}
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