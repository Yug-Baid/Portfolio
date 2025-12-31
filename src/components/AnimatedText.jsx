import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/all"
import gsap from "gsap"
gsap.registerPlugin(ScrollTrigger)

const AnimatedText = ({text,className}) => {
    const containerRef = useRef(null)
    const linesRef = useRef([])
    const lines = text.split("\n").filter((line)=>line.trim() !== "");

    useGSAP(()=>{
        if(linesRef.current.length>0){
            gsap.from(linesRef.current,{
                y:100,
                opacity:0,
                duration:1,
                stagger:0.3,
                ease:"back.out",
                ScrollTrigger:{
                    trigger:containerRef.current
                }
            })
        }
    })
    
  return (
    <div ref={containerRef} className={className}>
        {lines.map((line,idx)=>(
            <span key={idx} ref={(el)=>(linesRef.current[idx] = el)} className="block leading-relaxed tracking-wide text-pretty text-xl lg:text-2xl">
                {line}
            </span>
            
        ))}

    </div>
  )
}

export default AnimatedText