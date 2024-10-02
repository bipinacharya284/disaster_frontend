import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Text,
  ButtonGroup,
} from "@chakra-ui/react";
import axios from "axios";

const API_URL = "http://192.168.7.80:8080/api/sensor-data";

const SensorTable = () => {
  const [sensorData, setSensorData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [visibleSensors, setVisibleSensors] = useState({
    550: true,
    552: true,
  });

  // Fetch data based on selected sensor and date range
  const fetchSensorData = async (sensorId) => {
    try {
      let url;
      if (startDate && endDate) {
        url = `${API_URL}/${sensorId}/between?start_time=${startDate}&end_time=${endDate}`;
      } else if (startDate && !endDate) {
        url = `${API_URL}/${sensorId}/between?start_time=${startDate}`;
      } else if (!startDate && endDate) {
        url = `${API_URL}/${sensorId}/between?end_time=${endDate}`;
      } else {
        url = `${API_URL}/${sensorId}`;
      }

      const response = await axios.get(url);
      const sortedData = response.data.data;
      setSensorData(sortedData);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    // Fetch data for all visible sensors on mount or when dates change
    Object.keys(visibleSensors).forEach((sensorId) => {
      if (visibleSensors[sensorId]) {
        fetchSensorData(sensorId);
      }
    });
  }, [startDate, endDate, visibleSensors]);

  const filterData = () => {
    return sensorData.filter((data) => visibleSensors[data.sensor_id]);
  };

  const saveAsCSV = () => {
    const filteredData = filterData();
    const csvRows = [];
    // Add headers
    csvRows.push(["Value", "Received Time", "Sensor ID"].join(","));

    // Add data rows
    filteredData.forEach((data) => {
      const formattedTime = new Date(data.received_at).toLocaleString();
      csvRows.push([data.value, formattedTime, data.sensor_id].join(","));
    });

    // Create a Blob from the CSV data
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link to download the CSV
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "sensor-data.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const toggleSensor = (sensorId) => {
    setVisibleSensors((prev) => ({
      ...prev,
      [sensorId]: !prev[sensorId],
    }));
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <Text>Start at: </Text>
        <Input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
          style={{ maxWidth: 300 }}
          marginRight="1rem"
        />
        <Text>End at: </Text>
        <Input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ maxWidth: 300 }}
          placeholder="End Date"
        />
      </div>

      <Button onClick={saveAsCSV}>Save as CSV</Button>

      <ButtonGroup variant="outline" spacing="6" marginBottom="1rem">
        {[550, 552].map((sensorId) => (
          <Button
            key={sensorId}
            onClick={() => toggleSensor(sensorId)}
            colorScheme={visibleSensors[sensorId] ? "blue" : "gray"}
            bg={visibleSensors[sensorId] ? "blue.500" : "gray.200"}
            color={visibleSensors[sensorId] ? "white" : "black"}
            _hover={{ bg: visibleSensors[sensorId] ? "blue.400" : "gray.300" }}
            _active={{ bg: visibleSensors[sensorId] ? "blue.600" : "gray.400" }}
          >
            Sensor {sensorId}
          </Button>
        ))}
      </ButtonGroup>

      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Value</Th>
            <Th>Received Time</Th>
            <Th>Sensor ID</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filterData().map((data, index) => (
            <Tr key={index}>
              <Td>{data.value}</Td>
              <Td>{new Date(data.received_at).toLocaleString()}</Td>
              <Td>{data.sensor_id}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default SensorTable;
