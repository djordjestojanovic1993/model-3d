import React, { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./styles/global.css";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const [navBarValue, setNavBarValue] = useState("CONFIGURATOR");
  return (
    <div className="App">
      <NavBar
        onChangeNavBarValue={(value) => setNavBarValue(value)}
        activeItem={navBarValue}
      />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage navBarValue={navBarValue} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
