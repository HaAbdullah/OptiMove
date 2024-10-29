import useSpline from '@splinetool/r3f-spline'

export default function Scene({ ...props }) {
  const { nodes, materials } = useSpline('https://prod.spline.design/2fzdsSVagfszNxsd/scene.spline')

  return (
    <group {...props} dispose={null}>
      <mesh
        name="Rectangle"
        geometry={nodes.Rectangle.geometry}
        material={materials['Rectangle Material']}
      />
    </group>
  )
}