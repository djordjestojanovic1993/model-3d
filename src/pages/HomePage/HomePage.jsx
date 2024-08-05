import React, { useEffect, useState } from "react";
import SuitcaseHandler from "../../components/SuitcaseHandler/SuitcaseHandler";
import "./styles/homePage.css";
import SuitcaseParts from "../../components/SuitcaseParts/SuitcaseParts";
import MaterialPicker from "../../components/MaterialPicker/MaterialPicker";
import { getPossibleAndImpossibleMaterials } from "../../utils/utils";
import {
  changeColor,
  changeCamera,
  toggleAnnotationsBasedOnNavbar,
  changePart,
} from "../../utils/utils";

const HomePage = ({ navBarValue }) => {
  const [part, setPart] = useState("");
  const [model, setModel] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 764);
  const [suitcase, setSuitcase] = useState([
    { part: "Body", color: "Aluminum" },
    { part: "Handles", color: "Aluminum" },
    { part: "Corners", color: "Aluminum" },
    { part: "Wheels", color: "Aluminum" },
  ]);

  let PossibleAndImpossibleMaterials = getPossibleAndImpossibleMaterials(
    suitcase[0].color
  );
  const handlePartChange = (part) => {
    setPart(part);
    changeCamera(part, model, isMobile);
  };
  const updatePartColor = (updatedPart, color) => {
    setSuitcase((prevSuitcase) =>
      prevSuitcase.map((item) =>
        item.part === updatedPart
          ? { ...item, color }
          : updatedPart === "Body"
          ? { ...item, color: "Aluminum" }
          : item
      )
    );
  };
  useEffect(() => {
    if (model) {
      changeColor(suitcase, model);
      changeCamera(part, model, isMobile);
    }
  }, [suitcase, isMobile, part]);
  useEffect(() => {
    if (navBarValue === "ANIMATIONS") {
      setPart("");
    }
    if (model) {
      toggleAnnotationsBasedOnNavbar(model, navBarValue);
    }
  }, [navBarValue, model]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleArrowClick = (arrow) => {
    setPart(changePart(part, arrow));
  };
  return (
    <div className="flex-direction-column items-center justify-start home-page">
      <div className="flex-direction-row items-center width-100">
        <SuitcaseHandler
          suitcase={suitcase}
          receiveModel={(model) => setModel(model)}
        />
        {part !== "" && (
          <MaterialPicker
            body={part === "Body"}
            part={part}
            materials={PossibleAndImpossibleMaterials}
            onXClick={() => handlePartChange("")}
            onArrowClick={(arrow) => handleArrowClick(arrow)}
            selectedColor={
              suitcase.find((item) => item.part === part)?.color || "Aluminum"
            }
            onColorChange={(part, color) => updatePartColor(part, color)}
          />
        )}
      </div>
      {navBarValue === "CONFIGURATOR" && (
        <SuitcaseParts
          onPartChange={(part) => {
            handlePartChange(part);
          }}
          activePart={part}
        />
      )}
    </div>
  );
};

export default HomePage;
