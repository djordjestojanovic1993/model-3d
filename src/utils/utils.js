const possibleColorsMap = {
  Blue: ["Blue", "Black", "Aluminum"],
  Green: ["Green", "Black", "Aluminum"],
  Orange: ["Orange", "Black", "Aluminum"],
  Red: ["Red", "Black", "Aluminum"],
  Black: ["Black", "Aluminum"],
  Aluminum: ["Black", "Aluminum"],
};

const allColors = ["Black", "Blue", "Green", "Orange", "Aluminum", "Red"];

export const getPossibleAndImpossibleMaterials = (selectedBackgroundColor) => {
  const possibleColors = possibleColorsMap[selectedBackgroundColor] || [];
  const impossibleColors = allColors.filter(
    (color) => !possibleColors.includes(color)
  );

  return {
    possible: possibleColors,
    impossible: impossibleColors,
  };
};

const partsMap = {
  Body: ["Body_metal_base", "Body_metal_cover"],
  Handles: ["Handle_base1", "Handle_metal-1", "Handle_telescope-1"],
  Corners: ["Corners_base", "Corners_cover"],
  Wheels: [
    "Wheels_base",
    "Wheels_base_cover",
    "Wheels_front_right_base",
    "Wheels_front_left_base",
    "Wheels_back_right_base",
    "Wheels_back_left_base",
    "Wheels_front_right_center",
    "Wheels_front_left_center",
    "Wheels_back_right_center",
    "Wheels_back_left_center",
  ],
};

const materialMap = {
  Body: {
    Aluminum: "06 CHROME SATIN ALUMINUM",
    Green: "Chrome SATIN OLIVE GREEN",
    Red: "04 CHROME SATIN CHERRY RED",
    Orange: "03 CHROME SATIN BURNT ORANGE",
    Black: "05 CHROME SATIN MIDNIGHT BLACK",
    Blue: "01 CHROME SATIN ROYAL BLUE",
  },
  Handles: {
    Aluminum: "Chrome ALUMINIUM",
    Green: "Chrome SATIN OLIVE GREEN",
    Red: "Chrome CHERRY RED",
    Orange: "03 CHROME SATIN BURNT ORANGE",
    Black: "Chrome MIDNIGHT BLACK",
    Blue: "Chrome ROYAL BLUE",
  },
  Corners: {
    Aluminum: "Chrome ALUMINIUM",
    Green: "Chrome SATIN OLIVE GREEN",
    Red: "Chrome CHERRY RED",
    Orange: "03 CHROME SATIN BURNT ORANGE",
    Black: "Chrome MIDNIGHT BLACK",
    Blue: "Chrome ROYAL BLUE",
  },
  Wheels: {
    Aluminum: "Chrome ALUMINIUM",
    Green: "Chrome SATIN OLIVE GREEN",
    Red: "Chrome CHERRY RED",
    Orange: "03 CHROME SATIN BURNT ORANGE",
    Black: "Chrome MIDNIGHT BLACK",
    Blue: "Chrome ROYAL BLUE",
  },
};

const createPartsAndMaterials = (suitcase) => {
  return suitcase.map((item) => {
    const parts = partsMap[item.part] || [];
    const material = materialMap[item.part]?.[item.color] || "";
    return { parts, material };
  });
};

export const changeColor = (suitcase, Unlimited3D) => {
  const SuitcasePartsAndColorsArray = createPartsAndMaterials(suitcase);

  for (let partsColor of SuitcasePartsAndColorsArray) {
    var partObjects = partsColor.parts.map(function (part) {
      return { parts: [part], material: partsColor.material };
    });

    Unlimited3D.changeMaterials(
      {
        partObjects: partObjects,
      },
      (error, response) => {
        if (error) {
          console.error("Error during color change:", JSON.stringify(error));
        } else {
          console.log(
            `Successfully changed color of parts: ${partsColor.parts.join(
              ", "
            )} to ${partsColor.material}`
            // response
          );
        }
      }
    );
  }
};

export const changeCamera = (part, Unlimited3D, isMobile) => {
  let cameraName;

  switch (part) {
    case "":
      cameraName = isMobile
        ? "default_camera_mobile"
        : "default_camera_desktop";
      break;
    case "Body":
      cameraName = isMobile ? "camera_body_mobile" : "camera_body";
      break;
    case "Corners":
      cameraName = isMobile ? "camera_corners_mobile" : "camera_corners";
      break;
    case "Handles":
      cameraName = isMobile ? "camera_handle_mobile" : "camera_handle";
      break;
    case "Wheels":
      cameraName = isMobile ? "camera_wheels_mobile" : "camera_wheels";
      break;
    default:
      cameraName = isMobile
        ? "default_camera_mobile"
        : "default_camera_desktop";
      return;
  }

  console.log(`Activating camera: ${cameraName}`);
  Unlimited3D.activateModifier({ modifier: cameraName });
};

export const toggleAnnotationsBasedOnNavbar = (Unlimited3D, navBarValue) => {
  if (navBarValue === "CONFIGURATOR") {
    Unlimited3D.hideAnnotations({
      annotations: ["Open", "Extend handle", "Wheel spinner on"],
    });
  } else {
    Unlimited3D.showAnnotations({
      annotationObjects: [
        {
          annotations: ["Open", "Extend handle", "Wheel spinner on"],
        },
      ],
    });
  }
};

export const doAnimation = (Unlimited3D, annotation) => {
  switch (annotation) {
    case "Open":
      Unlimited3D.showOnlyAnnotations({
        annotationObjects: [
          {
            annotations: ["Close"],
          },
        ],
      });
      Unlimited3D.activateModifier({ modifier: "open" });

      break;
    case "Extend handle":
      Unlimited3D.showOnlyAnnotations({
        annotationObjects: [
          {
            annotations: ["Retract handle"],
          },
        ],
      });
      Unlimited3D.activateModifier({ modifier: "extend_handle" });

      break;
    case "Wheel spinner on":
      Unlimited3D.showOnlyAnnotations({
        annotationObjects: [
          {
            annotations: ["Wheel spinner off"],
          },
        ],
      });
      Unlimited3D.activateModifier({ modifier: "wheel_spinner_on" });

      break;
    case "Close":
      Unlimited3D.showOnlyAnnotations({
        annotationObjects: [
          {
            annotations: ["Open", "Extend handle", "Wheel spinner on"],
          },
        ],
      });
      Unlimited3D.activateModifier({ modifier: "close" });
      break;
    case "Retract handle":
      Unlimited3D.showOnlyAnnotations({
        annotationObjects: [
          {
            annotations: ["Open", "Extend handle", "Wheel spinner on"],
          },
        ],
      });
      Unlimited3D.activateModifier({ modifier: "retract_handle" });
      break;
    case "Wheel spinner off":
      Unlimited3D.showOnlyAnnotations({
        annotationObjects: [
          {
            annotations: ["Open", "Extend handle", "Wheel spinner on"],
          },
        ],
      });
      Unlimited3D.activateModifier({ modifier: "wheel_spinner_off" });
      break;
  }
};

export const changePart = (currentPart, arrow) => {
  const partsArray = ["Body", "Handles", "Corners", "Wheels"];

  const currentIndex = partsArray.indexOf(currentPart);

  if (currentIndex === -1) return null;

  let newIndex;

  if (arrow === "Next") {
    newIndex = (currentIndex + 1) % partsArray.length;
  } else if (arrow === "Previous") {
    newIndex = (currentIndex - 1 + partsArray.length) % partsArray.length;
  } else {
    return null;
  }

  return partsArray[newIndex];
};
