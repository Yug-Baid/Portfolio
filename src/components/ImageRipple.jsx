import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';

// Vertex Shader: Standard UV and Position
const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Fragment Shader: Ripple Effect logic
const fragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;
varying vec2 vUv;

void main() {
    vec2 p = vUv;
    
    // Ripple calculation
    float dist = distance(p, uMouse);
    float decay = clamp(1.0 - dist * 3.0, 0.0, 1.0); // radius of effect
    
    // Wave distortion
    float wave = sin(dist * 25.0 - uTime * 6.0) * 0.05 * decay * uHover;
    
    // Apply distortion
    vec2 distortedUv = p + vec2(wave);
    
    vec4 color = texture2D(uTexture, distortedUv);

    gl_FragColor = color;
}
`;

const RipplePlane = ({ texture, ...props }) => {
    const meshRef = useRef();
    const [hover, setHover] = useState(0);
    
    const uniforms = useMemo(
        () => ({
            uTexture: { value: texture },
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uHover: { value: 0 }
        }),
        [texture]
    );

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
            
            // Lerp hover intensity for smooth transition
            meshRef.current.material.uniforms.uHover.value = THREE.MathUtils.lerp(
                meshRef.current.material.uniforms.uHover.value,
                hover,
                0.1
            );
        }
    });

    const handlePointerMove = (e) => {
        if (e.uv && meshRef.current) {
            meshRef.current.material.uniforms.uMouse.value.x = e.uv.x;
            meshRef.current.material.uniforms.uMouse.value.y = e.uv.y;
        }
    };

    return (
        <mesh 
            ref={meshRef} 
            {...props}
            onPointerOver={() => setHover(1.0)}
            onPointerOut={() => setHover(0.0)}
            onPointerMove={handlePointerMove}
        >
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
            />
        </mesh>
    );
};

const ImageRipple = ({ src, text, className, ...props }) => {
    return (
        <div className={`relative ${className} pointer-events-auto`} style={{ width: '100%', height: '100%' }}>
            <Canvas 
                camera={{ position: [0, 0, 1] }}
                dpr={[1, 1.5]}
                performance={{ min: 0.5 }}
                gl={{ antialias: false, powerPreference: "high-performance" }}
            >
                 <Content src={src} text={text} />
            </Canvas>
        </div>
    );
};

const Content = ({ src, text }) => {
    // If text, we use the Text -> Texture scene
    if (text) {
        return <TextSceneContent text={text} />
    }
    
    if (src) {
        return <SceneContent src={src} />
    }
    return null;
}

// Wrapper to handle Suspense/Texture loading inside Canvas
const Loader = () => <div className="w-full h-full flex items-center justify-center text-xs">Loading...</div>;

import { Suspense } from 'react';
import { useThree } from '@react-three/fiber';

// Correcting Content to access viewport
const SceneContent = ({ src }) => {
    const { viewport } = useThree();
    const texture = useTexture(src);
    
    return <RipplePlane texture={texture} scale={[viewport.width, viewport.height, 1]} />;
}

// Separate Text Scene
import { RenderTexture, PerspectiveCamera } from '@react-three/drei';

// Rewriting Export Logic to be robust
const ImageRippleFinal = ({ src, text, className }) => {
    return (
        <div className={`relative ${className} pointer-events-auto`}>
            <Canvas 
                camera={{ position: [0, 0, 5], fov: 50 }}
                dpr={[1, 1.5]}
                performance={{ min: 0.5 }}
                gl={{ antialias: false, powerPreference: "high-performance" }}
            >
                <Suspense fallback={null}>
                   <Content src={src} text={text} />
                </Suspense>
            </Canvas>
        </div>
    )
}

const TextSceneContent = ({ text }) => {
    const { viewport } = useThree();
    const meshRef = useRef();
     const [hover, setHover] = useState(0);

    // We render text to a texture
    const navRef = useRef()

     const uniforms = useMemo(
        () => ({
            uTexture: { value: null }, // Will be attached via map
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uHover: { value: 0 }
        }),
        []
    );

     useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
             meshRef.current.material.uniforms.uHover.value = THREE.MathUtils.lerp(
                meshRef.current.material.uniforms.uHover.value,
                hover,
                0.1
            );
        }
    });
    
    const handlePointerMove = (e) => {
        if (e.uv && meshRef.current) {
             meshRef.current.material.uniforms.uMouse.value.x = e.uv.x;
             meshRef.current.material.uniforms.uMouse.value.y = e.uv.y;
        }
    }


    return (
        <mesh 
            ref={meshRef} 
            scale={[viewport.width, viewport.height, 1]}
            onPointerOver={() => setHover(1.0)}
            onPointerOut={() => setHover(0.0)}
            onPointerMove={handlePointerMove}
        >
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial 
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
            >
                 <RenderTexture attach="uniforms-uTexture-value">
                     <color attach="background" args={['#e5e5e0']} />
                     <Text 
                        ref={navRef}
                        fontSize={3}
                        color="black"
                        font="/fonts/amiamie/otf/Amiamie-Regular.otf" // CORRECTED PATH
                        anchorX="center"
                        anchorY="middle"
                     >
                        {text}
                     </Text>
                 </RenderTexture>
            </shaderMaterial>
        </mesh>
    )
}


export default ImageRippleFinal;
