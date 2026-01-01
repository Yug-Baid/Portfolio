
import { Planet } from "../components/Planet";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, Lightformer, OrbitControls } from "@react-three/drei";
import FlipLink from "../components/FlipLink";
import { useMediaQuery } from "react-responsive";
import AnimatedHeader from "../components/AnimatedHeader";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
    const text = `I help growing brands and startups gain an
unfair advantage through premuim 
results driven web/apps`;

  return (
    <section className="relative flex flex-col justify-center min-h-screen overflow-hidden" id="Home">
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
      <figure
        className={`absolute inset-x-0 top-[-2px] ${isMobile ? 'h-[85vh] top-[-50px]' : 'bottom-0 h-full'}`}
        style={{ width: "100%" }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
        >
          <ambientLight intensity={0.5} />
          <Float speed={0.5}>
            <Planet scale={isMobile ? 0.5 : 1} />
          </Float>
          <Environment resolution={256}>
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
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;
