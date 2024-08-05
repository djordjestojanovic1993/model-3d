import React, { useState } from "react";
import "./styles/materialPicker.css";
import { icons } from "../../constants";

const MaterialPicker = ({
  body,
  materials,
  onXClick,
  part,
  selectedColor,
  onColorChange,
  onArrowClick,
}) => {
  const handleColorClick = (color) => {
    if (body || materials.possible.includes(color)) {
      onColorChange(part, color);
    }
  };

  const renderColorCircle = (color, icon) => {
    const isDisabled = !body && !materials.possible.includes(color);
    const colorMap = {
      Black: "#232B2C",
      Red: "#D14048",
      Blue: "#5563EB",
      Green: "#ABCB9A",
      Orange: "#D86410",
      Aluminum: "#B7B9B9",
    };
    return (
      <div
        className={`flex-direction-row items-center justify-center material-wrapper ${
          isDisabled ? "disabled" : ""
        } ${selectedColor === color ? "selected" : ""}`}
        onClick={() => handleColorClick(color)}
        style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
      >
        {part === "Body" ? (
          <img src={icon} width={52} height={52} alt={color} />
        ) : (
          <div
            className="material-picker-color"
            style={{
              backgroundColor: colorMap[color] || colorMap.Aluminum,
            }}
          ></div>
        )}
      </div>
    );
  };

  return (
    <div className="radius-8 flex-direction-column gap-20 material-picker">
      <div className="flex-direction-row justify-space-between width-100 material-picker-title">
        <p className="black-text font-22 weight-400 uppercase">BODY COLOR</p>
        <img src={icons.xIcon} alt="x" className="pointer" onClick={onXClick} />
      </div>
      <div
        className="flex-direction-row justify-space-between width-100"
        style={{ height: "25px", marginTop: "4px" }}
      >
        <p className="font-16 weight-400">Select Color</p>
        <p className="font-16 weight-400 uppercase">
          {selectedColor || "None"}
        </p>
      </div>
      <div className="flex-direction-column gap-16 material-picker-materials">
        <div className="flex-direction-row gap-32">
          {renderColorCircle("Aluminum", icons.aluminumCircle)}
          {renderColorCircle("Black", icons.blackCircle)}
          {renderColorCircle("Red", icons.redCircle)}
        </div>
        <div className="flex-direction-row gap-32">
          {renderColorCircle("Blue", icons.blueCircle)}
          {renderColorCircle("Green", icons.greenCircle)}
          {renderColorCircle("Orange", icons.orangeCircle)}
        </div>
      </div>
      {part === "Body" && (
        <div
          className="flex-direction-row justify-space-between width-100 material-picker-add-image-title"
          style={{ marginTop: "21px" }}
        >
          <p className="font-16 weight-400">Image</p>
          <p className="font-16 weight-400 uppercase">no image</p>
        </div>
      )}
      {part === "Body" && (
        <div className="flex-direction-row justify-space-between width-100">
          <div className="no-image-wrapper">
            <img src={icons.noImage} alt="No Image" />
            <div className="no-image-line"></div>
          </div>
        </div>
      )}
      <div
        className="flex-direction-row justify-space-between  material-picker-arrows"
        style={{ height: "20px" }}
      >
        <img
          src={icons.arrowLeft}
          className="pointer"
          alt="Left Arrow"
          onClick={() => onArrowClick("Previous")}
        />
        <div
          className="flex-direction-row items-center gap-12 pointer"
          onClick={() => onArrowClick("Next")}
        >
          <p className="font-16 black-text weight-400">Next</p>
          <img src={icons.arrowRight} alt="Right Arrow" />
        </div>
      </div>
    </div>
  );
};

export default MaterialPicker;
