import React, { useState } from "react";
import { icons } from "../../constants";
import "./styles/suitcaseParts.css";

const SuitcaseParts = ({ onPartChange, activePart }) => {
  const handlePartClick = (part) => {
    if (onPartChange) {
      onPartChange(part);
    }
  };
  const partsArray1 = ["Body", "Handles"];
  const partsArray2 = ["Corners", "Wheels"];
  return (
    <div className="flex-direction-row gap-32 suitcase-parts">
      <div className="parts-group">
        <ul className="flex-direction-row gap-32 suitcase-parts-list">
          {partsArray1.map((part, index) => (
            <li
              className={`justify-center items-center gap-8 radius-8 pointer ${
                activePart === part ? "active" : ""
              }`}
              onClick={() => handlePartClick(part)}
              key={index}
            >
              <img
                src={activePart === part ? icons.ellipseFilled : icons.ellipse}
                alt="ellipseIcon"
              />
              <p className="black-text font-16 weight-400 uppercase">{part}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="parts-group">
        <ul className="flex-direction-row gap-32 suitcase-parts-list">
          {partsArray2.map((part, index) => (
            <li
              className={`justify-center items-center gap-8 radius-8 pointer ${
                activePart === part ? "active" : ""
              }`}
              onClick={() => handlePartClick(part)}
              key={index}
            >
              <img
                src={activePart === part ? icons.ellipseFilled : icons.ellipse}
                alt="ellipseIcon"
              />
              <p className="black-text font-16 weight-400 uppercase">{part}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SuitcaseParts;

const partsArray = ["Body", "Handles", "Corners", "Wheels"];
