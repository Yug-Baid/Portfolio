import { socials } from "../Data";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";

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
          py-15 px-10
          text-white/80
          bg-black
          fixed justify-between uppercase
          md:w-1/2 md:left-1/2
        "
      >
        <div
          className="
            flex flex-col
            text-5xl
            gap-y-2
            md:text-6xl
            lg:text-7xl
          "
        >
          {["Home", "Services", "About", "Work", "Contact"].map(
            (section, idx) => (
              <div key={idx} ref={(el) => (menuRef.current[idx] = el)}>
                <Link
                  to={`${section}`}
                  offset={0}
                  smooth
                  duration={2000}
                  className="
                    transition-all cursor-pointer
                    duration-300 hover:text-white
                  "
                >
                  {section}
                </Link>
              </div>
            ),
          )}
        </div>
        <div
          ref={contactRef}
          className="
            flex flex-col flex-wrap
            justify-between gap-8
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
              "
            >
              E-mail
            </p>

            <p
              className="
                text-white/50
                lowercase
              "
            >
              yugbaid4@gmail.com
            </p>
          </div>
          <div
            className="
              tracking-wider text-white/50
            "
          >
            Social Media
            <div
              className="
                flex flex-col 
                gap-x-2
                
                md:flex-col
                lg:flex-row
              "
            >
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="
                    leading-loose tracking-widest text-sm
                    transition-colors
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
      <div
        onClick={toggleNav}
        style={
          showBurger
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
        className="
          flex flex-col z-50
          w-14 h-14
          bg-black
          rounded-full
          transition-all
          fixed items-center justify-center top-5 right-10 duration-300 gap-1
          md:h-18 md:w-18
        " 
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
