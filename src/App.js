import { Box, Container, Heading, Text } from "@chakra-ui/react";
import Floorplan2DView from "./components/2D/Floorplan2DView";
import Floorplan3DView from "./components/3D/Floorplan3DView";
import EditorLayout from "./layout/EditorLayout";

import { useSelector, useDispatch } from "react-redux";
import Toolbar from "./components/tools/Toolbar";
import ModelsSearch from "./components/itemsLibrary/ModelsSearch";

export default function App() {
  const viewMode = useSelector((state) => state.app.viewMode);
  return (
    <EditorLayout topBar={<Toolbar />} sidebarContent={<ModelsSearch />}>
      {viewMode === "3d" ? <Floorplan3DView /> : <Floorplan2DView />}
    </EditorLayout>
  );
}
