import React, { useEffect, useState } from "react";
import "./styles/SuitcaseHandler.css";
import { doAnimation } from "../../utils/utils";

const SuitcaseHandler = ({ suitcase, receiveModel }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    if (
      !document.querySelector(
        'script[src="https://distcdn.unlimited3d.com/pres/v/2.10.0/unlimited3d.min.js"]'
      )
    ) {
      const script = document.createElement("script");
      script.src =
        "https://distcdn.unlimited3d.com/pres/v/2.10.0/unlimited3d.min.js";
      script.onload = () => {
        var options = {
          distID: "latest",
          solution3DName: "suitcase-color",
          projectName: "resources-for-videos-and-marketing-purposes",
          solution3DID: "62766",
          containerID: "container3d_replace",
          onPointerClick: handlePointerClick,
        };
        if (window.Unlimited3D) {
          window.Unlimited3D.init(options);
          console.log("Unlimited3D initialized with options:", options);

          setIsInitialized(true);
        } else {
          console.error("Unlimited3D is not defined");
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  const handlePointerClick = (objectsClick) => {
    console.log(objectsClick);
    if (objectsClick.length > 0) {
      if (objectsClick[0].type === "annotation") {
        console.log(objectsClick[0]);
        doAnimation(window.Unlimited3D, objectsClick[0].name);
      }
    }
  };

  useEffect(() => {
    if (isInitialized) {
      receiveModel(window.Unlimited3D);
      window.Unlimited3D.hideAnnotations({
        annotations: ["Open", "Extend handle", "Wheel spinner on"],
      });
    }
  }, [isInitialized, suitcase]);
  return (
    <div
      id="container3d_replace"
      style={{ width: "100%", height: "700px" }}
    ></div>
  );
};

export default SuitcaseHandler;
