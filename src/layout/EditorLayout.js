import {
  Box,
  Drawer,
  DrawerContent,
  Flex,
  Icon,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import { MobileNav } from "./MobileNav";
import { SidebarContent } from "./SidebarContent";

const SidebarWithHeader = ({ children, topBar, sidebarContent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        position="relative"
        zIndex="100"
        barWidth={300}
        onClose={() => onClose}
        sidebarContent={sidebarContent}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        position="relative"
        zIndex="100"
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            barWidth={300}
            onClose={onClose}
            sidebarContent={sidebarContent}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav
        position="fixed"
        top="0"
        ml="80"
        onOpen={onOpen}
        centerBar={topBar}
      />
      <Box
        ml={{ base: 0, md: 300 }}
        width="80vw"
        position="fixed"
        top="0"
        zIndex="10"
        mt="80px"
        p="1"
      >
        {children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
