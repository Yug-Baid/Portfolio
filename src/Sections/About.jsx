import React, { useRef } from 'react';
import AnimatedHeader from '../components/AnimatedHeader';
import ImageRipple from '../components/ImageRipple';
import MaskedDiv from '../components/MaskedDiv';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Icon } from '@iconify-icon/react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const imageRef = useRef(null);
  const skillsRef = useRef(null);

  const text = `Passionate about clean architecture. 
  I build scalable, high-performance solutions
  from prototype to production`;

  const stats = [
    { number: '50+', label: 'Projects Completed', icon: 'mdi:briefcase-check' },
    { number: '3+', label: 'Years Experience', icon: 'mdi:calendar-clock' },
    { number: '30+', label: 'Happy Clients', icon: 'mdi:account-heart' },
    { number: '100%', label: 'Success Rate', icon: 'mdi:chart-line' },
  ];

  const skills = [
    { 
      category: 'Frontend', 
      icon: 'mdi:react',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML/CSS'] 
    },
    { 
      category: 'Backend', 
      icon: 'mdi:server',
      items: ['Node.js', 'Express', 'MongoDB', 'Firebase', 'REST APIs', 'GraphQL'] 
    },
    { 
      category: 'Tools', 
      icon: 'mdi:tools',
      items: ['Git & GitHub', 'Docker', 'AWS', 'Figma', 'VS Code', 'Postman'] 
    },
  ];

  useGSAP(() => {
    // Section scale animation
    gsap.to('#About', {
      scale: 0.95,
      scrollTrigger: {
        trigger: '#About',
        start: 'bottom 90%',
        end: 'bottom 20%',
        scrub: true,
      },
      ease: 'power1.inOut',
    });

    // Image reveal animation
    gsap.fromTo(
      imageRef.current,
      { 
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        scale: 1.2 
      },
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
        },
      }
    );

    // Skills animation
    if (skillsRef.current) {
      gsap.fromTo(
        skillsRef.current.children,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 85%',
          },
        }
      );
    }
  });

  return (
    <section id="About" className="bg-black rounded-b-4xl min-h-screen py-20">
      <AnimatedHeader
        subtitle={'Code with purpose, build with scale'}
        title={'About'}
        text={text}
        textColor={'text-white'}
        isScroll={true}
      />

      <div className="container mx-auto px-6 md:px-10 mt-10">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
          {/* Left: Image with overlay text */}
          <div className="relative">
            <div
              ref={imageRef}
              className="relative w-full h-[500px] md:h-[650px] rounded-3xl overflow-hidden"
            >
              <ImageRipple src="/assets/Photo.jpg" className="absolute inset-0 w-full h-full" />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
              
              {/* Text Overlay - Much More Prominent */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 pointer-events-none">
                <h3 className="text-6xl md:text-6xl lg:text-7xl font-amiamie text-white mb-4 leading-none tracking-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
                  YUG JAIN<span className="text-gold">.</span>
                </h3>
                <p className="text-gold/90 text-xl md:text-2xl font-light tracking-wide">
                  Full Stack Developer & UI/UX Enthusiast
                </p>
              </div>
            </div>
          </div>

          {/* Right: About Text & Info */}
          <div className="space-y-8">
            <div>
              <h4 className="text-2xl md:text-3xl font-amiamie text-gold mb-4">
                Who Am I?
              </h4>
              <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed mb-6">
                Hey, I'm <span className="text-white font-medium">Yug Jain</span>, a creative web developer who loves building clean, responsive, and user-friendly websites.
              </p>
              <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed mb-6">
                I specialize in modern web technologies including <span className="text-gold">React</span>, <span className="text-gold">Node.js</span>, <span className="text-gold">TailwindCSS</span>, and <span className="text-gold">Firebase</span>.
              </p>
              <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed">
                I enjoy solving complex problems, learning cutting-edge technologies, and transforming innovative ideas into exceptional digital experiences. Let's create something remarkable together.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-3">
              <a
                href="mailto:yugbaid4@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center">
                  <Icon icon="mdi:email" className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-white/60 font-light">Email</p>
                  <p className="text-white group-hover:text-gold transition-colors">yugbaid4@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center">
                  <Icon icon="mdi:phone" className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-white/60 font-light">Phone</p>
                  <p className="text-white group-hover:text-gold transition-colors">+91 98765 43210</p>
                </div>
              </a>
            </div>
          </div>
        </div>

      

        {/* Skills Section */}
        <div ref={skillsRef}>
          <h4 className="text-3xl md:text-4xl font-amiamie text-white mb-10 text-center">
            Technical Skills<span className="text-gold">.</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 transition-all group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-gold/10">
                    <Icon icon={skillGroup.icon} className="flex items-center justify-center text-gold" />
                  </div>
                  <h5 className="text-2xl font-amiamie text-gold group-hover:text-white transition-colors">
                    {skillGroup.category}
                  </h5>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 text-sm font-light hover:bg-gold/10 hover:border-gold/30 hover:text-white transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;