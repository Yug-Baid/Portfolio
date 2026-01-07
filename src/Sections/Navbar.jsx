import { socials } from "../Data";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import { Icon } from "@iconify-icon/react";

const Navbar = () => {
  const navRef = useRef(null);
  const menuRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const iconTl = useRef(null);
  const [showBurger, setShowBurger] = useState(true);

  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([menuRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -40,
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(
        menuRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.2,
          ease: "power2.out",
        },
        "<",
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          delay: 0.8,
          stagger: 0.2,

          ease: "power2.out",
        },
        "<+0.5",
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        duration: 0.3,
        y: 3.3,
        ease: "power3.out",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power3.out",
        },
        "<",
      );
  }, []);

  const toggleNav = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currScrollY = window.scrollY;
      setShowBurger(currScrollY <= lastScrollY || currScrollY <= 10);
      lastScrollY = currScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="
          z-50 flex flex-col
          w-full min-h-full
          py-12 px-6
          sm:py-16 sm:px-8
          md:py-20 md:px-10
          text-white/80
          bg-black
          fixed justify-between uppercase
          md:w-1/2 md:left-1/2
        "
      >
        {/* Close button for mobile - Top right */}
        <button
          onClick={toggleNav}
          className="
            md:hidden
            absolute top-6 right-6
            w-12 h-12
            flex items-center justify-center
            rounded-full
            bg-white/10 hover:bg-white/20
            transition-colors
            z-50
          "
          aria-label="Close menu"
        >
          <Icon icon="mdi:close" className="w-6 h-6 text-white" />
        </button>

        {/* Menu Items */}
        <div
          className="
            flex flex-col
            text-5xl
        
            sm:text-5xl
            md:text-5xl 
            lg:text-5xl
            xl:text-6xl
            mt-10 md:mt-[-20px]
          "
        >
          {["Home", "Services", "About", "Education", "Work", "Contact"].map(
            (section, idx) => (
              <div key={idx} ref={(el) => (menuRef.current[idx] = el)}>
                <Link
                  to={`${section}`}
                  offset={0}
                  smooth
                  duration={2000}
                  onClick={toggleNav}
                  className="

                    transition-all ease-in-out cursor-pointer
                    duration-300 hover:bg-white hover:text-black 
                    block py-2 px-2
                    min-h-[48px] flex items-center
                  "
                >
                  {section}
                </Link>
              </div>
            ),
          )}
        </div>

        {/* Contact Info */}
        <div
          ref={contactRef}
          className="
            flex flex-col flex-wrap
            justify-between gap-6 mt-8
            text-sm sm:text-base
          "
        >
          <div
            className="
              font-light
            "
          >
            <p
              className="
                tracking-wider text-white/50
                text-xs uppercase mb-1
              "
            >
              E-mail
            </p>

            <p
              className="
                text-white/80
                lowercase
                break-all
              "
            >
              yugbaid4@gmail.com
            </p>
          </div>
          <div
            className="
              text-white/50
            "
          >
            <p className="tracking-wider text-xs uppercase mb-2">
              Social Media
            </p>
            <div
              className="
                flex flex-row 
                gap-2
                sm:gap-2
                md:flex-col
                lg:flex-row lg:gap-4
              "
            >
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    leading-loose tracking-widest text-sm
                    transition-colors
                    min-h-[35px] flex items-center
                    duration-300 hover:text-white
                  "
                >
                  {"{"}
                  {social.name}
                  {"}"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hamburger Menu Button - Fixed position */}
      <div
        onClick={toggleNav}
        style={
          showBurger || isOpen
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
        className="
          flex flex-col z-[100]
          w-14 h-14
          bg-black
          rounded-full
          transition-all
          fixed items-center justify-center 
          top-5 right-5 
          hover:bg-gold/100
          cursor-pointer duration-300 gap-1
          md:h-18 md:w-18
          md:top-8 md:right-8
          lg:top-10 lg:right-10
        " 
        aria-label={isOpen ? "Close menu" : "Open menu"}
        role="button"
        tabIndex={0}
      >
        <span
          ref={topLineRef}
          className="
            block
            w-8 h-0.5
            bg-white
            rounded-full
            origin-center
          "
        ></span>
        <span
          ref={bottomLineRef}
          className="
            block
            w-8 h-0.5
            bg-white
            rounded-full
            origin-center
          "
        ></span>
      </div>
    </>
  );
};

export default Navbar;
