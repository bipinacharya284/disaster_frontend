import React from "react";
import Navbar from "./components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import Graph from "./components/Graph";
function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <Graph />
      </div>
    </ChakraProvider>
  );
}

export default App;
