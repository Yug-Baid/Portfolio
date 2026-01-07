
import { Planet } from "../components/Planet";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, Lightformer, OrbitControls } from "@react-three/drei";
import FlipLink from "../components/FlipLink";
import { useMediaQuery } from "react-responsive";
import AnimatedHeader from "../components/AnimatedHeader";

const Hero = () => {
  // Unified breakpoint system: mobile < 640px, tablet 640-1024px, desktop > 1024px
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const text = `I help growing brands and startups gain an
unfair advantage through premium 
results driven web/apps`;

  // Responsive planet scale
  const planetScale = isMobile ? 0.6 : isTablet ? 0.65 : 1;
  
  // Responsive canvas quality (lower DPR on mobile for performance)
  const dpr = isMobile ? [1, 1.2] : isTablet ? [1, 1.5] : [1, 2];

  // Responsive canvas height (prevent overflow on mobile landscape)
  const getCanvasHeight = () => {
    if (isMobile) return 'h-[70vh] sm:h-[75vh]';
    if (isTablet) return 'h-[80vh]';
    return 'h-full';
  };

  return (
    <section className="relative flex flex-col justify-center min-h-screen overflow-hidden" id="Home">
      {/* Text Content - Overlay on top */}
      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <AnimatedHeader 
            subtitle="404 No Bugs Found" 
            title={<FlipLink href="#">Yug Jain</FlipLink>} 
            text={text} 
            textColor="text-black" 
            isScroll={false}
          />
        </div>
      </div>

      {/* 3D Planet Canvas - Background */}
      <figure
        className={`absolute inset-x-0 ${getCanvasHeight()} ${isMobile ? 'top-[10vh]' : 'top-0 bottom-0'}`}
        style={{ width: "100%" }}
      >
        <Canvas
          shadows={!isMobile} // Disable shadows on mobile for performance
          camera={{ position: [0, 0, -10], fov: isMobile ? 20 : 17.5, near: 1, far: 20 }}
          dpr={dpr}
          performance={{ min: 0.5 }}
          gl={{ 
            antialias: !isMobile, // Disable antialiasing on mobile
            powerPreference: isMobile ? "low-power" : "high-performance" 
          }}
        >
          <ambientLight intensity={isMobile ? 0.6 : 0.5} />
          <Float speed={isMobile ? 0.3 : 0.5} floatIntensity={isMobile ? 0.3 : 1}>
            <Planet scale={planetScale} />
          </Float>
          <Environment resolution={isMobile ? 128 : 256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 5, -9]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 3, 1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[5, -1, -1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[10, 1, 0]}
                scale={10}
              />
            </group>
          </Environment>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={!isMobile} // Disable rotation on mobile for better touch UX
            autoRotate={true}
            autoRotateSpeed={isMobile ? 0.3 : 0.5}
            touches={{ ONE: isMobile ? 0 : 1 }} // Improve touch interaction
          />
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;
