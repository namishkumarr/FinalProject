import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeApp from "./components/HomePage";
import JobApp from "./components/JobsPage";
import HireApp from "./components/HirePage"
import "./App.css";

function App() {
  return (
    <div className="App">
    
      <Routes>
        <Route path="/" element={<HomeApp />} />
        <Route path="/jobs" element={<JobApp />} />
        <Route path="/hire" element={<HireApp />}/>
      </Routes>
    
    </div>
  );
}

export default App;
