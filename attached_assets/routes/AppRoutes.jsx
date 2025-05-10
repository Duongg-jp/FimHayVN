// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import PhimLe from "../pages/PhimLe";
import PhimBo from "../pages/PhimBo";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Phim-le" element={<PhimLe />} />
      <Route path="Phim-bo" element={<PhimBo />} />
    </Routes>
  );
}

export default AppRoutes;
