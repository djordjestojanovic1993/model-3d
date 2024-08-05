import React, { useState } from "react";
import "./styles/NavBar.css";
import "../../styles/global.css";

const NavBar = ({ onChangeNavBarValue, activeItem }) => {
  const handleItemClick = (item) => {
    if (onChangeNavBarValue) {
      onChangeNavBarValue(item);
    }
  };
  return (
    <div className="flex-direction-row items-end justify-center radius-8 nav-bar">
      <ul className="flex-direction-row justify-center gap-44 nav-bar-list">
        <li
          className={`flex-direction-row items-start justify-center pointer ${
            activeItem === "CONFIGURATOR" ? "active" : ""
          }`}
          onClick={() => handleItemClick("CONFIGURATOR")}
        >
          <p className="black-text font-22 weight-400 uppercase">
            CONFIGURATOR
          </p>
        </li>
        <li
          className={`flex-direction-row items-center justify-center pointer ${
            activeItem === "ANIMATIONS" ? "active" : ""
          }`}
          onClick={() => handleItemClick("ANIMATIONS")}
        >
          <p className="black-text font-22 weight-400 uppercase">ANIMATIONS</p>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
