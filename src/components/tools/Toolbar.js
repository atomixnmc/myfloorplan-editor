import {
  Button,
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Image,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Select,
  Center,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiPlus,
  FiCopy,
  FiCornerUpLeft
} from "react-icons/fi";

import { useSelector, useDispatch } from "react-redux";
import { changeViewMode } from "../../redux/appSlice";

export default function Toolbar() {
  const dispatch = useDispatch();
  return (
    <Flex
      ml={{ base: 0, md: 2 }}
      px={{ base: 2, md: 2 }}
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-start" }}
    >
      <HStack spacing={{ base: "0", md: "4" }} mr={4}>
        <Wrap spacing={4}>
          <WrapItem>
            <Button colorScheme="gray">
              <FiCopy />
            </Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme="gray">
              <FiCornerUpLeft />
            </Button>
          </WrapItem>
        </Wrap>
      </HStack>
      <Box w="200px" mr={4}>
        <Select placeholder="Select design...">
          <option selected>First floor</option>
          <option>Second floor</option>
          <option>
            <FiPlus /> Add new
          </option>
        </Select>
      </Box>
      <Center w="380px">
        <Text fontSize="lg">Document 1</Text>
      </Center>
      <HStack spacing={{ base: "0", md: 4 }}>
        <Wrap spacing={4}>
          <WrapItem>
            <Button
              colorScheme="gray"
              onClick={(evt) => dispatch(changeViewMode("2d"))}
            >
              2D
            </Button>
          </WrapItem>
          <WrapItem>
            <Button
              colorScheme="red"
              onClick={(evt) => dispatch(changeViewMode("3d"))}
            >
              3D
            </Button>
          </WrapItem>
        </Wrap>
      </HStack>
    </Flex>
  );
}
