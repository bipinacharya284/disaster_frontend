import React from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Button,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Import icons from assets
import landslideIcon from "../assets/landslide.png";
import floodIcon from "../assets/flood.png";
import bridgeIcon from "../assets/bridge.png";

const Home = () => {
  // Define the conditions and their descriptions along with their respective links
  const conditions = [
    {
      title: "Landslide",
      description: "Watch for potential landslides in your area.",
      link: "/landslide",
      icon: landslideIcon, // Icon for Landslide
    },
    {
      title: "Flood",
      description: "Be alert for flooding conditions and evacuations.",
      link: "/flood",
      icon: floodIcon, // Icon for Flood
    },
    {
      title: "Bridge Condition",
      description: "Check the condition of nearby bridges regularly.",
      link: "/bridge-condition",
      icon: bridgeIcon, // Icon for Bridge Condition
    },
  ];

  return (
    <Box p={5}>
      <Heading as="h1" mb={6}>
        Condition Monitoring
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
        {conditions.map((condition, index) => (
          <Box
            key={index}
            borderWidth={1}
            borderRadius="lg"
            p={4}
            shadow="md"
            bg="white"
            transition="transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease"
            _hover={{
              transform: "scale(1.05)",
              bg: "gray.50",
              boxShadow: "lg",
            }}
          >
            <VStack spacing={4} align="start">
              {/* Animated Icon */}
              <Image
                src={condition.icon}
                alt={`${condition.title} icon`}
                boxSize="60px"
                transition="transform 0.3s ease"
                _hover={{ transform: "scale(1.2)" }} // Bounce effect for icons
              />
              <Heading
                size="md"
                transition="color 0.3s ease"
                _hover={{ color: "blue.500" }}
              >
                {condition.title}
              </Heading>
              <Text>{condition.description}</Text>
              <Link to={condition.link}>
                <Button
                  colorScheme="blue"
                  transition="transform 0.3s ease"
                  _hover={{ transform: "scale(1.1)" }} // Button scaling effect
                >
                  View Details
                </Button>
              </Link>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
