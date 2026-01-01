import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AnimatedHeader from '../components/AnimatedHeader';
import { Icon } from '@iconify-icon/react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: 'mdi:email-outline', label: 'Email', value: 'yugbaid4@gmail.com', href: 'mailto:yugbaid4@gmail.com' },
  { icon: 'mdi:phone-outline', label: 'Phone', value: '+91 79845 83672', href: 'tel:+917984583672' },
  { icon: 'mdi:map-marker-outline', label: 'Location', value: 'India', href: '#' },
];

const socialLinks = [
  { icon: 'mdi:github', label: 'GitHub', href: 'https://github.com/Yug-Baid' },
  { icon: 'mdi:linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/yug-baid-89702b309/' },
  { icon: 'mdi:instagram', label: 'Instagram', href: 'https://www.instagram.com/yug__jaiin__/' },
];

const Contact = () => {
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const text = `Have a project in mind or just want to chat?
  Drop me a message and let's create
  something amazing together`;

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 767px)",
      isDesktop: "(min-width: 768px)",
    }, (context) => {
      const { isMobile } = context.conditions;

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { y: isMobile ? 0 : 60, opacity: isMobile ? 1 : 0 },
          {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0 : 0.8,
            ease: 'power3.out',
            scrollTrigger: isMobile ? undefined : {
              trigger: formRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current.children,
          { y: isMobile ? 0 : 60, opacity: isMobile ? 1 : 0 },
          {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0 : 0.8,
            stagger: isMobile ? 0 : 0.1,
            ease: 'power3.out',
            scrollTrigger: isMobile ? undefined : {
              trigger: infoRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS configuration
      const serviceId = 'service_5h1vim5';
      const templateId = 'template_1ih5vqg';        // Template for YOU (notification)
      const autoReplyTemplateId = 'template_52xb4yh'; // Template for USER (auto-reply)
      const publicKey = '2VqfUXytJ_oHanSmx';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      // Send email to YOU (notification of new contact)
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      // Send auto-reply to USER (confirmation email)
      await emailjs.send(
        serviceId,
        autoReplyTemplateId,
        templateParams,
        publicKey
      );

      toast.success(
        "Message sent successfully! You'll receive a confirmation email shortly.",
        {
          duration: 5000,
          style: {
            background: '#cfa355',
            color: '#000',
            fontWeight: '500',
            padding: '16px 24px',
            borderRadius: '12px',
          },
          iconTheme: {
            primary: '#000',
            secondary: '#cfa355',
          },
        }
      );
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error(
        'Failed to send message. Please try emailing me directly at yugbaid4@gmail.com',
        {
          duration: 6000,
          style: {
            background: '#ef4444',
            color: '#fff',
            fontWeight: '500',
            padding: '16px 24px',
            borderRadius: '12px',
          },
        }
      );
    }

    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section  className="py-10 md:py-10 bg-black text-white" id="Contact">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto px-6 md:px-10">
        {/* Section Header */}
        <AnimatedHeader 
          subtitle="Get In Touch" 
          title="Contact" 
          text={text} 
          textColor="text-white" 
          isScroll={true}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-20"  >
          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm text-white/60 mb-2 font-light tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors font-light"
                  placeholder="Enter your name"
                />
              </div>
              <div  >
                <label htmlFor="email" className="block text-sm text-white/60 mb-2 font-light tracking-wide">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors font-light"
                  placeholder="Enter your email"
                
                />
              </div>
            </div>
            <div >
              <label htmlFor="subject" className="block text-sm text-white/60 mb-2 font-light tracking-wide">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors font-light"
                placeholder="Project Inquiry"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-white/60 mb-2 font-light tracking-wide">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors resize-none font-light"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold text-black rounded-full font-medium hover:opacity-90 transition-all disabled:opacity-50 uppercase tracking-wider"
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  Send Message
                  <Icon icon="mdi:send" className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-10" >
            <div>
              <h3 className="text-2xl font-amiamie mb-6 text-gold">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group border border-white/5"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center">
                      <Icon icon={info.icon} className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60 font-light">{info.label}</p>
                      <p className="text-white group-hover:text-gold transition-colors font-light">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-amiamie mb-6 text-gold">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-black transition-colors border border-white/10"
                    aria-label={social.label}
                  >
                    <Icon icon={social.icon} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gold/10 border border-gold/30">
              <div className="w-3 h-3 rounded-full bg-gold animate-pulse" />
              <span className="text-sm text-white font-light">Currently available for new projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
