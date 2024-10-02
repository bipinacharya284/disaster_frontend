import React, { useEffect, useState } from "react";
import { Box, Spinner } from "@chakra-ui/react"; // Import Spinner from Chakra UI
import SensorTable from "../../components/SensorTable";

const Table = () => {
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
        // Scrollable SensorTable with fixed height
        // <Box
        //   maxH="600px" // Set maximum height for the table container
        //   overflowY="auto" // Enable vertical scroll
        //   border="1px solid gray" // Add a border to define the table area
        //   padding="1rem"
        // >
        <SensorTable />
        // </Box>
      )}
    </Box>
  );
};

export default Table;
