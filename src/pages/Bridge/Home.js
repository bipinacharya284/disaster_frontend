import React, { useEffect, useState } from "react";
import { Box, Flex, Image, Text, Spinner, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Import Link for routing
import image from "../../assets/bridgewarning.png"; // Replace with actual image path

const Bridge = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading with a timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds (for demo purposes)
    });

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <Box p={8}>
      {loading ? (
        // Loading Spinner
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100vh" // Full viewport height to center the spinner
        >
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        // Main Content
        <Flex
          justifyContent="space-between"
          alignItems="center"
          direction={{ base: "column", md: "row" }}
        >
          {/* Left Side - Project Introduction */}
          <Box flex={1} mr={{ base: 0, md: 8 }} mb={{ base: 8, md: 0 }}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Bridge Safety Warning System
            </Text>
            <Text fontSize="lg" mb={4}>
              The Bridge Safety Warning System is a project designed to alert
              communities and authorities of potential hazards of bridge
              collapse. It combines hardware sensors with a web-based monitoring
              system to provide real-time data on environmental conditions,
              allowing for timely warnings and interventions.
            </Text>
            <Text fontSize="lg" mb={4}>
              This system is designed with efficiency and accuracy in mind,
              ensuring that the data collected is reliable and actionable.
              Together, we aim to build a safer environment by leveraging
              technology to prevent catastrophic outcomes.
            </Text>

            {/* View Dashboard Button */}
            <Link to="/flood/dashboard">
              <Button colorScheme="blue" mt={4}>
                View Dashboard
              </Button>
            </Link>
          </Box>

          {/* Right Side - Project Hardware Image */}
          <Box flex={1}>
            <Image
              src={image}
              alt="Project Hardware"
              borderRadius="md"
              boxShadow="lg"
              objectFit="cover"
              maxHeight="400px"
            />
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default Bridge;
