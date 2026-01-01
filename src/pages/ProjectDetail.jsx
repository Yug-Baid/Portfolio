import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify-icon/react';
import { getProjectBySlug, projects } from '../Data';
import ReactLenis from 'lenis/react';
import AnimatedHeader from '../components/AnimatedHeader';
import HoverExpand from '../components/HoverExpand';

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProjectBySlug(id);
  const [activeImage, setActiveImage] = useState(0);
  
  // Refs for animations
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const galleryRef = useRef(null);
  const techRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Hero animation
    const heroTl = gsap.timeline();
    heroTl.fromTo(
      '.hero-content > *',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    );

    // Content reveal animations
    const sections = [contentRef.current, galleryRef.current, techRef.current, resultsRef.current];
    sections.forEach((section) => {
      if (!section) return;
      gsap.fromTo(
        section.querySelectorAll('.animate-item'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );
    });

    // Parallax effect on hero image
    gsap.to('.hero-image', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-amiamie text-black mb-4">Project Not Found</h1>
          <Link to="/" className="text-gold hover:underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.slug === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
    <div className="min-h-screen bg-primary">
      {/* Fixed Back Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-sm rounded-full border border-white/10 hover:bg-black transition-all duration-300 group"
      >
        <Icon icon="mdi:arrow-left" className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm text-white">Back</span>
      </button>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={project.bgImage}
            alt={project.name}
            className="hero-image w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary" />
        </div>

        {/* Hero Content */}
        <div className="hero-content absolute inset-0 flex flex-col justify-end pb-16 md:pb-24">
          <div className="container mx-auto px-6 md:px-10">
            <p className="text-yellow-600 text-sm md:text-base mb-3 tracking-wider uppercase font-light" style={{ textShadow: '0 0 20px rgba(207, 163, 85, 0.8), 0 0 40px rgba(207, 163, 85, 0.4)' }}>
              {project.category}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-amiamie text-black mb-6 max-w-4xl">
              {project.name}
              <span className="text-gold">.</span>
            </h1>
            <div className="flex flex-wrap gap-3 mb-8">
              {project.frameworks.map((framework) => (
                <span
                  key={framework.id}
                  className="px-4 py-1.5 text-sm rounded-full bg-black/5 backdrop-blur-sm border border-black/10 text-black font-light"
                >
                  {framework.name}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-6 md:gap-10 text-sm md:text-base text-black/60 font-light mb-8">
              <div>
                <span className="block text-xs uppercase tracking-wider text-gold mb-1">Year</span>
                {project.year}
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-gold mb-1">Client</span>
                {project.client}
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-gold mb-1">Duration</span>
                {project.duration}
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-gold mb-1">Role</span>
                {project.role}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black rounded-full hover:opacity-90 transition-all group font-medium"
                >
                  <Icon icon="mdi:open-in-new" className="w-5 h-5" />
                  <span>View Live Demo</span>
                </a>
              )}
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black/10 backdrop-blur-sm border border-black/20 text-black rounded-full hover:bg-black/20 transition-all group font-medium"
                >
                  <Icon icon="mdi:github" className="w-5 h-5" />
                  <span>View on GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-10">
          {/* Overview */}
          <div className="max-w-4xl mb-20 animate-item">
            <h2 className="text-3xl md:text-4xl font-amiamie text-black mb-6">
              Overview<span className="text-gold">.</span>
            </h2>
            <p className="text-lg md:text-xl text-black/70 leading-relaxed font-light">
              {project.longDescription}
            </p>
          </div>

          {/* Challenges & Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Challenges */}
            <div className="animate-item">
              <h3 className="text-2xl font-amiamie text-gold mb-6">Challenges</h3>
              <div className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <div
                    key={index}
                    className="p-6 bg-black/5 rounded-2xl border border-black/10 hover:border-gold/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-gold text-sm font-light">0{index + 1}</span>
                      <div>
                        <h4 className="text-lg font-amiamie text-black mb-2">{challenge.title}</h4>
                        <p className="text-black/60 font-light text-sm">{challenge.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div className="animate-item">
              <h3 className="text-2xl font-amiamie text-gold mb-6">Solutions</h3>
              <div className="space-y-4">
                {project.solutions.map((solution, index) => (
                  <div
                    key={index}
                    className="p-6 bg-black/5 rounded-2xl border border-black/10 hover:border-gold/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-gold text-sm font-light">0{index + 1}</span>
                      <div>
                        <h4 className="text-lg font-amiamie text-black mb-2">{solution.title}</h4>
                        <p className="text-black/60 font-light text-sm">{solution.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} className="py-20 bg-black/5">
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-amiamie text-black mb-12 animate-item">
            Gallery<span className="text-gold">.</span>
          </h2>

          {/* Hover Expand Gallery */}
          <div className="animate-item">
            <HoverExpand 
              images={project.gallery}
              initialSelectedIndex={0}
              thumbnailHeight={550}
              maxThumbnails={project.gallery.length}
            />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section ref={resultsRef} className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="text-3xl md:text-4xl font-amiamie text-black mb-12 animate-item">
            Results<span className="text-gold">.</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 animate-item">
            {project.results.map((result, index) => (
              <div
                key={index}
                className="text-center p-6 bg-black/5 rounded-2xl border border-black/10 hover:border-gold/30 transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-amiamie text-gold mb-2">
                  {result.value}
                </div>
                <div className="text-sm text-black/60 uppercase tracking-wider mb-1 font-light">
                  {result.metric}
                </div>
                <div className="text-xs text-black/40 font-light">{result.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Between Projects */}
      <section className="py-16 border-t border-black/10">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <Link
              to={`/project/${prevProject.slug}`}
              className="group flex items-center gap-4 hover:text-gold transition-colors"
            >
              <Icon icon="mdi:arrow-left" className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
              <div className="text-right md:text-left">
                <div className="text-xs uppercase tracking-wider text-black/40 mb-1 font-light">
                  Previous Project
                </div>
                <div className="text-lg font-amiamie text-black group-hover:text-gold transition-colors">
                  {prevProject.name}
                </div>
              </div>
            </Link>

            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const workSection = document.getElementById('Work');
                  if (workSection) {
                    workSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="px-6 py-3 border border-black/20 rounded-full hover:border-gold hover:text-gold transition-all font-light cursor-pointer"
            >
              All Projects
            </button>

            <Link
              to={`/project/${nextProject.slug}`}
              className="group flex items-center gap-4 hover:text-gold transition-colors"
            >
              <div className="text-left md:text-right">
                <div className="text-xs uppercase tracking-wider text-black/40 mb-1 font-light">
                  Next Project
                </div>
                <div className="text-lg font-amiamie text-black group-hover:text-gold transition-colors">
                  {nextProject.name}
                </div>
              </div>
              <Icon icon="mdi:chevron-right" className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 md:py-32 bg-black text-white">
        <div className="container mx-auto px-6 md:px-10 text-center">
          <h2 className="text-3xl md:text-5xl font-amiamie mb-6">
            Like what you see<span className="text-gold">?</span>
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto font-light">
            Let's work together on your next project and create something amazing.
          </p>
          <button
            onClick={() => {
              navigate('/');
              setTimeout(() => {
                const contactSection = document.getElementById('Contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-black rounded-full hover:opacity-90 transition-all group font-medium cursor-pointer"
          >
            <span>Get in Touch</span>
            <Icon icon="mdi:arrow-up-right" className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </section>
    </div>
    </ReactLenis>
  );
};

export default ProjectDetail;
