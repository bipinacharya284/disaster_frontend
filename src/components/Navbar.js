import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom"; // Import Link from react-router-dom

const Links = ["Home", "Landslide", "Flood", "Bridge"];

const NavLink = ({ children }) => (
  <Box
    as={RouterLink}
    to={`/${children.toLowerCase()}`}
    px={4}
    py={2}
    borderRadius="md"
    _hover={{
      bg: "gray.200", // Background color on hover
      color: "black", // Text color on hover
    }}
    textDecoration="none"
    color="white"
  >
    <Text fontSize="xl">{children}</Text>
  </Box>
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
