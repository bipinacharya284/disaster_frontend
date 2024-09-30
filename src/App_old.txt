import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading, Input, Button, VStack, HStack, Text } from '@chakra-ui/react';
import axios from 'axios';

function App() {
  const [deviceId, setDeviceId] = useState('');
  const [sensorId, setSensorId] = useState('');
  const [value, setValue] = useState('');
  const [retrievedSensorId, setRetrievedSensorId] = useState('');
  const [sensorResults, setSensorResults] = useState([]);

  // Function to handle saving sensor data
  const handleSaveSensorData = async () => {
    try {
      const sensorPayload = {
        device_id: deviceId,
        sensor_data: [
          {
            sensor_id: sensorId,
            value: parseFloat(value),
          },
        ],
      };

      const response = await axios.post('http://localhost:8000/api/sensor-data', sensorPayload);
      alert('Sensor data saved successfully!',response);
    } catch (error) {
      console.error('Error saving sensor data', error);
    }
  };

  // Function to handle retrieving all sensor data by sensorId
  const handleGetAllSensorData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8080/api/sensor-data/${retrievedSensorId}`);
      console.log("Response data:", response.data); // Log the response data

      // Set the sensor results with the correct data format
      setSensorResults(response.data.data); // Assuming response.data is already in the correct format
    } catch (error) {
      console.error('Error fetching sensor data', error);
    }
  };

  useEffect(() => {
    console.log("Sensor Results State:", sensorResults); // Log sensorResults whenever it updates
  }, [sensorResults]);

  return (
    <ChakraProvider>
      <Box p={4} maxWidth="600px" mx="auto">
        <Heading mb={6} textAlign="center">
          Sensor Dashboard
        </Heading>

        {/* Form to submit sensor data */}
        <VStack spacing={4} mb={8}>
          <Input
            placeholder="Device ID"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
          />
          <Input
            placeholder="Sensor ID"
            value={sensorId}
            onChange={(e) => setSensorId(e.target.value)}
          />
          <Input
            placeholder="Value"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleSaveSensorData}>
            Save Sensor Data
          </Button>
        </VStack>

        {/* Form to retrieve sensor data */}
        <VStack spacing={4}>
          <Input
            placeholder="Sensor ID to retrieve data"
            value={retrievedSensorId}
            onChange={(e) => setRetrievedSensorId(e.target.value)}
          />
          <Button colorScheme="green" onClick={handleGetAllSensorData}>
            Retrieve Sensor Data
          </Button>
        </VStack>

        {/* Displaying the fetched sensor data */}
        {Array.isArray(sensorResults) && sensorResults.length > 0 ? (
          <Box mt={8}>
            <Heading size="md" mb={4}>
              Retrieved Sensor Data:
            </Heading>
            {sensorResults.map((sensor, index) => (
              <HStack key={sensor._id} justifyContent="space-between" p={2} borderWidth="1px" borderRadius="md">
                <Text>Sensor ID: {sensor.sensor_id}</Text>
                <Text>Value: {sensor.value}</Text>
                <Text>Sent At: {sensor.sent_at ? new Date(sensor.sent_at).toLocaleString() : 'N/A'}</Text>
                <Text>Received At: {sensor.received_at ? new Date(sensor.received_at).toLocaleString() : 'N/A'}</Text>
              </HStack>
            ))}
          </Box>
        ) : (
          <Text>No sensor data available</Text>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
