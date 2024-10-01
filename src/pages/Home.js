import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import image from "../assets/displayImage.ppm"; // Replace with actual image path

const Home = () => {
  return (
    <Box p={8}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        direction={{ base: "column", md: "row" }}
      >
        {/* Left Side - Project Introduction */}
        <Box flex={1} mr={{ base: 0, md: 8 }} mb={{ base: 8, md: 0 }}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Disaster Early Warning System
          </Text>
          <Text fontSize="lg" mb={4}>
            The Disaster Early Warning System is a project designed to alert
            communities and authorities of potential hazards such as flood and
            landslide. It combines hardware sensors with a web-based monitoring
            system to provide real-time data on environmental conditions,
            allowing for timely warnings and interventions.
          </Text>
          <Text fontSize="lg">
            This system is designed with efficiency and accuracy in mind,
            ensuring that the data collected is reliable and actionable.
            Together, we aim to build a safer environment by leveraging
            technology to prevent catastrophic outcomes.
          </Text>
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
    </Box>
  );
};

export default Home;
