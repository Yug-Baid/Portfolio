import React, { useRef } from 'react'
import AnimatedHeader from '../components/AnimatedHeader'
import AnimatedText from '../components/AnimatedText'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)

const About = () => {

  const imgRef = useRef(null)
  const aboutText = `👋 Hey, I'm Yug Jain
 I'm a creative web developer 💻 who loves building clean, responsive, and user-friendly websites 🌐. I work with tools like React ⚛️, Node.js 🚀, TailwindCSS 🌈, and Firebase 🔥.
I enjoy solving problems, learning new tech 📚, and turning ideas into real digital experiences 💡.
Let’s build something cool together! 🙌`
    const text = `Passionate about clean architecture 
    I build scalable, high-performance solutions
    from prototye to production`

    useGSAP(()=>{
      gsap.to("#About",{
        scale:0.95,
        scrollTrigger:{
          trigger:"#About",
          start:"bottom 90%",
          end:"bottom 20%",
          scrub:true,

        },
        ease:"power1.inOut"
      })

      gsap.set(imgRef.current,{
        clipPath:"polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      })

      gsap.to(imgRef.current,{
        clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration:2,
        ease:"power3.out",
        scrollTrigger:{
          trigger:imgRef.current
        }
      })
    })
  return (
    <section id='About' className=' bg-black rounded-b-4xl min-h-screen ' >
        <AnimatedHeader subtitle={"Code with purpose , build with scale"} title={"About"} text={text} textColor={"text-white"} isScroll={true}/>
        <div className='flex flex-col lg:flex-row justify-between items-center gap-16 px-10 text-xl pb-16 font-light tracking-wide md:text-2xl lg:text-3xl text-white/60 -mt-20'>
            <img ref={imgRef} src="assets\Photo.jpg" className='w-md rounded-3xl' />
            <AnimatedText text={aboutText} className="w-full"/>


        </div>
    </section>
  )
}

export default About