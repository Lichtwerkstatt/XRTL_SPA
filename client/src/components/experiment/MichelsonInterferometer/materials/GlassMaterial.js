
const GlassMaterial = () => {
  return (
    <meshPhysicalMaterial
      thickness={1}
      roughness={0.1}
      transmission={1}
      clearcoat={0.1}
      clearcoatRoughness={0}
      ior={1.4}
      envMapIntensity={25}
      color={"#ffffff"}
      attenuationColor={"#00ffff"}
      attenuationDistance={5}
    />
  );
};
export default GlassMaterial;
