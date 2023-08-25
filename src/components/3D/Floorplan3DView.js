import { Engine, Scene } from "react-babylonjs";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

const InitSceneObjects = () => (
  <>
    <freeCamera
      name="camera1"
      position={new Vector3(0, 5, -10)}
      setTarget={[Vector3.Zero()]}
    />
    <hemisphericLight
      name="light1"
      intensity={0.7}
      direction={new Vector3(0, 1, 0)}
    />
    <ground name="ground" width={6} height={6} />
    <box
      name="box"
      size={2}
      position={new Vector3(0, 1, 0)}
      rotation={Vector3.Zero()}
    />
  </>
);

export default function Floorplan3DView({ children }) {
  return (
    <div style={{ flex: 1, display: "flex" }}>
      <Engine antialias adaptToDeviceRatio canvasId="babylon-canvas">
        <Scene>
          <InitSceneObjects />
        </Scene>
      </Engine>
    </div>
  );
}
