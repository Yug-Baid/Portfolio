import React, { useRef, useState } from 'react'
import AnimatedHeader from '../components/AnimatedHeader'
import { projects } from '../Data'
 
import { Icon } from '@iconify-icon/react/dist/iconify.js'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { overlay } from 'three/tsl'


const Work = () => {
    const previewRef = useRef(null)
    const overlayRef = useRef([])
    const [currIdx,setCurrIdx] = useState(null)
    const text = `Featured projects that have been meticulously
    crafted with passion to drive
    results and impact`

    const mouse = useRef({x:0,y:0})
    const moveX = useRef(null)
    const moveY = useRef(null)

    useGSAP(()=>{
      moveX.current =   gsap.quickTo(previewRef.current,"x",{
            duration:1.5,
            ease:"power3.out"
        })

       moveY.current =  gsap.quickTo(previewRef.current,"y",{
            duration:2,
            ease:"power3.out"
        })

        gsap.from("#project",{
            y:100,
            opacity:0,
            delat:0.5,
            duration:1,
            stagger:0.25,
            ease:"back.out",
            scrollTrigger:{
                trigger:"#project"
            }
            
        })
    })

    const handleMouseMove = (e)=>{
        if(window.innerWidth < 768) return;

        mouse.current.x = e.clientX +24
         mouse.current.y = e.clientX +24
         moveX.current(mouse.current.x)
             moveY.current(mouse.current.y)
        
    }

    const handleMouseEnter = (idx) =>{
        if(window.innerWidth < 768) return;
        setCurrIdx(idx)

        const el = overlayRef.current[idx]
        if(!el) return

        gsap.killTweensOf(el)
        gsap.fromTo(
            el,
            {clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"},
            {
                clipPath:"polygon(0 100%, 100% 100%, 100% 0, 0 0)",
                duration:0.2,
                ease:"power2.out"
            }
        )


        gsap.to(previewRef.current,{
            opacity:1,
            scale:1,
            duration:0.3,
            ease:'power2.out'
        })
    }

      const handleMouseLeave = (idx) =>{
        if(window.innerWidth < 768) return;
        setCurrIdx(null)

          const el = overlayRef.current[idx]
        if(!el) return

        gsap.killTweensOf(el)
        gsap.to(el,{
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
            duration:0.2,
            ease:"power2.in"
        })

         gsap.to(previewRef.current,{
            opacity:0,
            scale:0.95,
            duration:0.3,
            ease:'power2.out'
        })
        
    }
  return (
        <section id='Work' className='flex flex-col min-h-screen'>
           <AnimatedHeader subtitle={"Logic meets Aesthetics"}
        title={"Works"}
        text={text}
        textColor="text-black"
        isScroll={true}
    />
    <div className='relative flex flex-col font-light' onMouseMove={handleMouseMove}>
        {projects.map((project,idx)=>(
            <div key={project.id} id='project' className='relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0' onMouseEnter={()=>handleMouseEnter(idx)} onMouseLeave={()=>handleMouseLeave(idx)}>
                <div ref={(el)=>{overlayRef.current[idx] = el}} className='absolute inset-0 hidden md:block duration:200 bg-black -z-10 clip-path '/>
                <div className='flex justify-between px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white'><h2 className='lg:text-[32px] text-[26px] leading-none'>{project.name}</h2>
                <Icon icon="solar:arrow-right-up-bold" className="md:size-6 size-5" />
                </div>
                <div className='w-full h-0.5 bg-black opacity-50'/>
                <div className='flex px-10 text-xs uppercase leading-loose md:text-sm gap-x-5 transition-all duration-500'>
                    {project.frameworks.map((framework)=>(
                    <p key={framework.id} className='text-black transition-colors duration-500 md:group-hover:text-white'>{framework.name}</p>
                ))}
                </div>
                <div className='relative flex items-center justify-center px-10 md:hidden h-[400px]'>
                    <img src={project.bgImage} alt={`${project.name}-bg-image`} className='object-cover w-full h-full rounded-md brightness-50' />
                    <img src={project.image} alt={`${project.name}-image`} className='absolute bg-center px-14 rounded-xl' />
                </div>
            </div>
        ))}
        <div ref={previewRef} className='fixed -top-2/6 left-0 z-50 overflow-hidden border-8 border-black pointer-events-none w-[960px] md:block hidden opacity-0'>
        {currIdx !== null && (
                <img src={projects[currIdx].image} alt="" className='object-cover w-full h-full' />
        )}
       </div>
    </div>
        </section>
  )
}

export default Work