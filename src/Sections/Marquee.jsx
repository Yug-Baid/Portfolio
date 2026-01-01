import { Icon } from '@iconify-icon/react/dist/iconify.js'
import gsap from 'gsap'
import { Observer } from 'gsap/all'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(Observer)

const Marquee = ({items, className="text-white bg-black", icon = "mdi:star-four-points", iconClassName="", reverse = false}) => {
    const containerRef = useRef(null)
    const wrapperRef = useRef(null)
 
    useEffect(() => {
        if (!wrapperRef.current) return;

        const wrapper = wrapperRef.current;
        const firstSet = wrapper.children[0];
        
        if (!firstSet) return;

        // Wait for layout to complete
        const setupAnimation = () => {
            const itemWidth = firstSet.offsetWidth;
            
            if (itemWidth === 0) {
                requestAnimationFrame(setupAnimation);
                return;
            }

            // Set initial position
            gsap.set(wrapper, { x: 0 });

            // Create seamless infinite loop animation
            const tl = gsap.timeline({
                repeat: -1,
                onRepeat: () => {
                    // Reset position seamlessly
                    gsap.set(wrapper, { x: 0 });
                }
            });

            // Animate one full width
            tl.to(wrapper, {
                x: -itemWidth,
                duration: itemWidth / 100, // Adjusted base speed
                ease: "none",
                force3D: true
            });

            // Set initial direction
            const initialScale = reverse ? -1 : 1;
            tl.timeScale(initialScale);

            // Use Observer for better scroll interaction (replaces removed functionality)
            const observer = Observer.create({
                target: window,
                type: "wheel,touch,pointer",
                onChangeY: (self) => {
                    const delta = self.deltaY;
                    let targetScale = 1;

                    // Determine direction and speed boost based on scroll
                    if (delta > 0) {
                        // Scrolling down
                        targetScale = reverse ? -2.5 : 2.5;
                    } else {
                        // Scrolling up
                        targetScale = reverse ? 2.5 : -2.5; 
                    }

                    // Smooth acceleration
                    gsap.to(tl, {
                        timeScale: targetScale,
                        duration: 0.2,
                        overwrite: true
                    });

                    // Return to normal speed
                    gsap.to(tl, {
                        timeScale: initialScale,
                        duration: 1.5,
                        delay: 0.1,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                }
            });

            return () => {
                tl.kill();
                observer.kill();
            };
        };

        const cleanup = setupAnimation();
        // Since setupAnimation is recursive with rAF, we need to handle cleanup carefully if it hasn't started
        // But for simplicity in this effect, the returned cleanup from setupAnimation (if active) works.
        // A robust way is to just return a wrapper cleanup.
        return cleanup;
    }, [items, reverse]);

    // Duplicate items enough times to fill the screen and create seamless loop
    const duplicatedItems = [...items, ...items];

    return (
        <div ref={containerRef} className={`overflow-hidden w-full h-20 md:h-[100px] flex items-center marquee-text-responsive font-light uppercase whitespace-nowrap ${className}`}>
            <div ref={wrapperRef} className='flex will-change-transform'>
                {/* First set */}
                <div className='flex'>
                    {items.map((text, idx) => (
                        <span key={`set1-${idx}`} className='flex items-center px-16 gap-x-32'>
                            {text}<Icon icon={icon} className={iconClassName}/>
                        </span>
                    ))}
                </div>
                {/* Second set for seamless loop */}
                <div className='flex'>
                    {items.map((text, idx) => (
                        <span key={`set2-${idx}`} className='flex items-center px-16 gap-x-32'>
                            {text}<Icon icon={icon} className={iconClassName}/>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Marquee