import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import AppRouter from "./routes/AppRouter";
import Footer from "./components/Footer";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar />
          <div style={{ flex: 1, padding: "2rem" }}>
            <AppRouter />
          </div>
          <Footer />
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
