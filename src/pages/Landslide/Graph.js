import React, { useEffect, useState } from "react";
import { Box, Spinner } from "@chakra-ui/react"; // Import Spinner from Chakra UI
import DynamicLineGraph from "../../components/SensorGraph";

const Graph = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading with a timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds (for demo purposes)
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <Box padding="2rem">
      {loading ? (
        // Loading Spinner
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Spinner size="xl" color="blue.500" />
        </Box>
      ) : (
        <DynamicLineGraph />

        // Main Content - Dynamic Line Graph
      )}
    </Box>
  );
};

export default Graph;
