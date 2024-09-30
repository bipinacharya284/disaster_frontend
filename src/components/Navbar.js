import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Links = ["Home", "Dashboard"];

const NavLink = ({ children }) => (
  <Text fontSize="2xl" color="white">
    <Link
      px={3}
      py={4}
      // rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "gray.200",
        color: "black",
      }}
      href={`#${children.toLowerCase()}`}
    >
      {children}
    </Link>
  </Text>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={"blue.500"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {/* Logo or Brand Name */}
          <Box fontWeight="bold" fontSize="2xl" color="white">
            Disaster Early Warning System
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            color="white"
            bg="transparent"
            _hover={{ bg: "gray.700" }}
          />

          {/* Menu Links (Hidden on small screens) */}
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </Flex>

        {/* Mobile Menu */}
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
