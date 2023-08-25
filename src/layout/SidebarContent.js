import {
  Box,
  CloseButton,
  Flex,
  Image,
  Icon,
  Text,
  Center,
  Square,
  useColorModeValue
} from "@chakra-ui/react";

import {
  FiCompass,
  FiHome,
  FiList,
  FiSettings,
  FiStar,
  FiTrendingUp
} from "react-icons/fi";

export const menuLinkItems = [
  { name: "Home", icon: FiHome },
  { name: "Draw", icon: FiTrendingUp },
  { name: "Items", icon: FiList },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings }
];

export const SideBarNavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white"
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white"
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

function MiniSidebarNavs({ children }) {
  return (
    <Flex h="full">
      <Box w="64px" bg="gray.200" p="2">
        {menuLinkItems.map((link) => (
          <Box
            p="4"
            borderRadius="lg"
            _hover={{
              bg: "cyan.400",
              color: "white"
            }}
          >
            <Icon key={link.name} as={link.icon} />
          </Box>
        ))}
      </Box>
      <Box flex="1" bg="gray.300">
        {children}
      </Box>
    </Flex>
  );
}
export function SidebarContent({
  onClose,
  barWidth,
  sidebarContent,
  isFull = false,
  ...rest
}) {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: barWidth }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="16" alignItems="center" mx="8" justifyContent="space-between">
        <Image src="logo.png" width="80px" />

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {isFull ? (
        menuLinkItems.map((link) => (
          <SideBarNavItem key={link.name} icon={link.icon}>
            {link.name}
          </SideBarNavItem>
        ))
      ) : (
        <MiniSidebarNavs>{sidebarContent}</MiniSidebarNavs>
      )}
    </Box>
  );
}
