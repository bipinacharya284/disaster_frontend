import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Landslide/Dashboard";
import Landslide from "../pages/Landslide/Home";
import Flood from "../pages/Flood/Home";
import Bridge from "../pages/Bridge/Home";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/landslide" element={<Landslide />} />
      <Route path="/flood" element={<Flood />} />
      <Route path="/bridge" element={<Bridge />} />
      <Route path="/landslide/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRouter;
