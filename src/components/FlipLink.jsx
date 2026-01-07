import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href, className }) => {
  // Disable animation on mobile to prevent layout shifts
  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (isMobile) {
    // Simple link without animation on mobile
    return (
      <a
        href={href}
        className={`relative block whitespace-nowrap text-black ${className}`}
      >
        {children}
      </a>
    );
  }

  // Full animation on desktop
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className={`relative block overflow-hidden whitespace-nowrap text-black ${className}`}
      style={{ lineHeight: 0.75 }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

export default FlipLink;
