import { Box, Text, Link, Stack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" bg="gray.900" color="white" py={6}>
      <Stack direction={["column", "row"]} spacing={8} justify="space-between" align="center" px={[4, 8]}>
        <Text fontSize="sm">&copy; {new Date().getFullYear()} Nepal Academy of Science and Technology (NAST). All rights reserved.</Text>
        
        <Stack direction="row" spacing={6}>
          <Link href="#" _hover={{ color: "teal.300" }}>
            Privacy Policy
          </Link>
          <Link href="#" _hover={{ color: "teal.300" }}>
            Terms of Service
          </Link>
          <Link href="https://nast.gov.np/" _hover={{ color: "teal.300" }}>
            Contact Us
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
