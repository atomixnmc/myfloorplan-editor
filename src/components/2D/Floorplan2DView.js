import React, { useState } from "react";
import Konva from "konva";
import { Stage, Layer, Rect, Text } from "react-konva";

function ColoredRect() {
  const [color, setColor] = useState("green");
  return (
    <Rect x={20} y={20} width={50} height={50} fill={color} shadowBlur={5} />
  );
}

export default function Floorplan2DView() {
  return (
    <Stage width={800} height={600}>
      <Layer>
        <Text text="Try click on rect" />
        <ColoredRect />
      </Layer>
    </Stage>
  );
}
