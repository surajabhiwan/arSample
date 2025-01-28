import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const ARView = ({ content }) => {
  if (!content) return null;

  const renderContent = () => {
    switch (content.type) {
      case 'text':
        return (
          <Text fontSize={1} color="white" position={[0, 0, -5]}>
            {content.data}
          </Text>
        );
      case 'image':
        return (
          <mesh position={[0, 0, -5]}>
            <planeGeometry args={[4, 4]} />
            <meshBasicMaterial map={new THREE.TextureLoader().load(content.data)} />
          </mesh>
        );
      case 'video':
        return (
          <mesh position={[0, 0, -5]}>
            <planeGeometry args={[4, 2]} />
            <meshBasicMaterial>
              <videoTexture attach="map" args={[content.data]} />
            </meshBasicMaterial>
          </mesh>
        );
      default:
        return null;
    }
  };

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {renderContent()}
    </Canvas>
  );
};

export default ARView;