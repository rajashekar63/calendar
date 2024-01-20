import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Calendar from "./Calendar";
import "./styles.scss";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:year/:month" element={<Calendar />} />
        <Route path="/" element={<Calendar />} />
      </Routes>
    </Router>
  );
};

export default App;
