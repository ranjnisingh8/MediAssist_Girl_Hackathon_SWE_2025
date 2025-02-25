import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Records from "./pages/Records";

function App() {
  return (
    <Router>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/records" element={<Records />} />
      </Routes>
    </Router>
  );
}

export default App;
