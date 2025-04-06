import { forwardRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export const Paper = forwardRef((props: any, ref: any) => {
  const { nodes, materials } = useGLTF("/models/paper.glb");
  const paper = useRef();

  useFrame((state, delta) => {
    paper.current.rotation.y += delta * 0.25;
  });

  return (
    <group {...props} ref={paper} dispose={null}>
      <mesh
        ref={ref}
        name="paper"
        castShadow
        receiveShadow
        geometry={nodes.Paper.geometry}
        material={materials.Paper}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
});

useGLTF.preload("/models/paper.glb");
