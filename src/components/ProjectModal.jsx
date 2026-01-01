import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Icon } from '@iconify-icon/react';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Animate modal entrance
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      
      gsap.fromTo(
        contentRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.1, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const handleClose = () => {
    gsap.to(contentRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.2,
      delay: 0.1,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-6xl max-h-[90vh] bg-primary rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 rounded-full transition-colors backdrop-blur-sm"
          aria-label="Close"
        >
          <Icon icon="mdi:close" className="w-6 h-6 text-white" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
          {/* Hero Image */}
          <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
            <img
              src={project.bgImage}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-primary" />
            
            {/* Project Image Overlay */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <img
                src={project.image}
                alt={project.name}
                className="max-w-full max-h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 space-y-8">
            {/* Title & Description */}
            <div>
              <h2 className="text-4xl md:text-5xl font-amiamie text-black mb-4">
                {project.name}
                <span className="text-gold">.</span>
              </h2>
              <p className="text-lg md:text-xl text-black/70 font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-2xl font-amiamie text-gold mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.frameworks.map((framework) => (
                  <span
                    key={framework.id}
                    className="px-4 py-2 bg-black/5 border border-black/10 rounded-full text-black font-light hover:bg-gold/10 hover:border-gold/30 transition-colors"
                  >
                    {framework.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-black/5 rounded-2xl border border-black/10">
                <Icon icon="mdi:calendar-outline" className="w-8 h-8 text-gold mb-3" />
                <h4 className="text-sm uppercase tracking-wider text-black/60 mb-1">Year</h4>
                <p className="text-lg font-light text-black">2024</p>
              </div>
              <div className="p-6 bg-black/5 rounded-2xl border border-black/10">
                <Icon icon="mdi:account-outline" className="w-8 h-8 text-gold mb-3" />
                <h4 className="text-sm uppercase tracking-wider text-black/60 mb-1">Client</h4>
                <p className="text-lg font-light text-black">Private</p>
              </div>
              <div className="p-6 bg-black/5 rounded-2xl border border-black/10">
                <Icon icon="mdi:clock-outline" className="w-8 h-8 text-gold mb-3" />
                <h4 className="text-sm uppercase tracking-wider text-black/60 mb-1">Duration</h4>
                <p className="text-lg font-light text-black">3 Months</p>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-2xl font-amiamie text-gold mb-4">Key Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check-circle" className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-black/70 font-light">Responsive design optimized for all devices</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check-circle" className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-black/70 font-light">Secure payment integration and checkout flow</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check-circle" className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-black/70 font-light">Advanced filtering and search functionality</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check-circle" className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-black/70 font-light">Admin dashboard for inventory management</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  <span>View Live Site</span>
                  <Icon icon="mdi:open-in-new" className="w-5 h-5" />
                </a>
              )}
              <button
                onClick={handleClose}
                className="inline-flex items-center gap-2 px-6 py-3 border border-black/20 rounded-full font-light hover:border-gold hover:text-gold transition-colors"
              >
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(207, 163, 85, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(207, 163, 85, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
