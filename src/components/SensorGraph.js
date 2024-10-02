import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Text,
  ResponsiveContainer,
} from "recharts";
import { Button, ButtonGroup, Input } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// API Endpoint for all sensors
const API_URL = "http://192.168.7.80:8080/api/sensor-data";

const DynamicLineGraph = () => {
  const [sensorData, setSensorData] = useState([]);
  const [visibleSensors, setVisibleSensors] = useState({
    550: true,
    552: true,
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Function to fetch data for a specific sensor
  const fetchSensorData = async (sensorId, startTime, endTime) => {
    try {
      let url;
      if (startTime && endTime) {
        url = `${API_URL}/${sensorId}/between?start_time=${startTime}&end_time=${endTime}`;
      } else if (startTime && !endTime) {
        url = `${API_URL}/${sensorId}/between?start_time=${startTime}`;
      } else if (!startTime && endTime) {
        url = `${API_URL}/${sensorId}/between?end_time=${endTime}`;
      } else {
        url = `${API_URL}/${sensorId}`;
      }

      const response = await axios.get(url);
      const formattedData = response.data.data.map((item) => {
        const receivedAtUTC = new Date(item.received_at);
        const localTime = new Date(
          receivedAtUTC.getTime() + 5 * 60 * 60 * 1000 + 45 * 60 * 1000
        );
        return {
          value: item.value,
          receivedAtUTC: localTime,
          sensorId: sensorId,
        };
      });
      return formattedData;
    } catch (error) {
      console.error(`Error fetching data for sensor ${sensorId}:`, error);
      return [];
    }
  };

  // Function to fetch data for all sensors
  const fetchAllSensorsData = async () => {
    const sensorIds = [550, 552];
    const allSensorData = [];

    const startTime = startDate ? new Date(startDate).toISOString() : null;
    const endTime = endDate ? new Date(endDate).toISOString() : null;

    for (const sensorId of sensorIds) {
      const data = await fetchSensorData(sensorId, startTime, endTime);
      // Limit to the latest 1000 records
      allSensorData.push(...data.slice(-1000));
    }

    const groupedData = allSensorData.reduce((acc, curr) => {
      const timestamp = curr.receivedAtUTC.toISOString();
      if (!acc[timestamp]) {
        acc[timestamp] = { receivedAtUTC: curr.receivedAtUTC };
      }
      acc[timestamp][`value_${curr.sensorId}`] = curr.value;
      return acc;
    }, {});

    const finalData = Object.values(groupedData);
    setSensorData(finalData);
  };

  useEffect(() => {
    const fetchInterval = () => {
      fetchAllSensorsData();
    };

    const interval = setInterval(fetchInterval, 5000);
    fetchAllSensorsData();

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  const saveGraphAsPDF = () => {
    const graphElement = document.querySelector(
      ".recharts-responsive-container"
    );

    html2canvas(graphElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4"); // 'l' for landscape orientation

      const pageHeight = pdf.internal.pageSize.height; // A4 page height in mm
      const pageWidth = pdf.internal.pageSize.width; // A4 page width in mm
      const imgWidth = pageWidth; // Full width of the page
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
      // const imgHeight = 200;

      let heightLeft = imgHeight;
      let position = 0; // Start position from the top

      // Add the first image
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight; // Subtract the height of the page

      // Add subsequent pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight; // Calculate the position for the next page
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight; // Subtract the height of the page
      }

      pdf.save("sensor-data-graph.pdf");
    });
  };

  const toggleSensor = (sensorId) => {
    setVisibleSensors((prev) => ({
      ...prev,
      [sensorId]: !prev[sensorId],
    }));
  };

  const minDate = sensorData.length
    ? Math.min(...sensorData.map((d) => new Date(d.receivedAtUTC).getTime()))
    : null;
  const maxDate = sensorData.length
    ? Math.max(...sensorData.map((d) => new Date(d.receivedAtUTC).getTime()))
    : null;

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

      <ButtonGroup variant="outline" spacing="6" marginBottom="1rem">
        {Object.keys(visibleSensors).map((sensorId) => (
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
        <Button onClick={saveGraphAsPDF}>Save as PDF</Button>
      </ButtonGroup>

      <ResponsiveContainer width="100%" minHeight={550}>
        <LineChart
          data={sensorData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="receivedAtUTC"
            domain={[minDate || "dataMin", maxDate || "dataMax"]}
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(visibleSensors).map(
            (sensorId) =>
              visibleSensors[sensorId] && (
                <Line
                  key={sensorId}
                  type="monotone"
                  dataKey={`value_${sensorId}`}
                  stroke={sensorId === "550" ? "#8884d8" : "#82ca9d"}
                  name={`Sensor ${sensorId}`}
                  isAnimationActive={false}
                />
              )
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicLineGraph;
