// Etch a Sketch by Vlad Hadyak (using flex-box layout instead of grid) (Updated UI)

const gridContainer = document.querySelector(".grid-container");
const contentContainer = document.querySelector(".content-container");

const defaultBtn = document.querySelector(".default-color");
const rainbowBtn = document.querySelector(".rainbow");
const eraserBtn = document.querySelector(".eraser");
const colorPickerBtn = document.querySelector(".color-picker");
const clearGridBtn = document.querySelector(".clear-grid");

const slider = document.querySelector(".slider");
const value = document.querySelector(".value");

colorPickerBtn.value = "#d9ff06";

let mouseDown = false;

let defaultEnabled = true;
let rainbowEnabled = true;
let customColorEnabled = true;
let eraserEnabled = true;

createGrid = () => {
  let userInput = slider.value;
  slider.oninput = createGrid;
  gridContainer.textContent = "";                                                             // Removes previously selected grid after new one is created
 
  value.textContent = `Grid size: ${userInput}x${userInput}`;

  for (let i = 0; i < userInput; i++) {
    const column = document.createElement("div");
    column.classList.add("column");

    for (let j = 0; j < userInput; j++) {
      const row = document.createElement("div");
      row.classList.add("row");
      column.appendChild(row);
    };
    gridContainer.appendChild(column);
  };
  contentContainer.appendChild(gridContainer);
};
createGrid();

createToolbox = () => {
  const gridCells = document.querySelectorAll(".row");

  // Remove all button effects

  removeButtonEffects = () => {
    rainbowBtn.style.cssText = 'transform: ""; transition: ""; background-color: ""'; 
    defaultBtn.style.cssText = 'transform: ""; transition: ""; background-color: ""'; 
    eraserBtn.style.cssText = 'transform: ""; transition: ""; background-color: ""';
  };

  // Create Default color

  createDefaultColor = () => {
    gridCells.forEach((cell) => {
      cell.addEventListener("mousedown", (e) => {
        if (defaultEnabled) {
          mouseDown = true;
          e.target.classList.add("default-hover");
          e.target.style.backgroundColor = "rgb(27, 18, 18)";

          defaultBtn.style.cssText = "transform: scale(1.2); transition: 0.1s; background-color: rgb(61, 1, 144)";
          rainbowBtn.style.cssText = 'transform: ""; transition: ""; background-color: ""'; 
          eraserBtn.style.cssText = 'transform: ""; transition: ""; background-color: ""'; 
        };
      });

      cell.addEventListener("mouseup", () => {
        mouseDown = false;
      });

      gridContainer.addEventListener("mouseleave", () => {
        mouseDown = false;
      });

      cell.addEventListener("mouseenter", (e) => {
        if (e.buttons === 1 && mouseDown) {                                                   // Fix a bug where the cursor drag sometimes will trigger for mouse to hover over cells without clicking the mouse
          let target = e.target;

          if (target.matches("div")) {
            e.target.classList.add("default-hover");
            e.target.style.backgroundColor = "rgb(27, 18, 18)";
          };
        };
      });
    });
    customColorEnabled = false;
    rainbowEnabled = false;
    eraserEnabled = false;
    defaultEnabled = true;
  };
  createDefaultColor();

  defaultBtn.addEventListener("click", (e) => {
    e.target.style.cssText = "transform: scale(1.2); transition: 0.1s; background-color: rgb(61, 1, 144)";
    rainbowBtn.style.cssText = 'transform: ""; transition: ""; background-color: ""'; 
    eraserBtn.style.cssText = 'transform: ""; transition: ""; background-color: ""'; 
  });

  defaultBtn.addEventListener("click", createDefaultColor); 

  // Create Rainbow color

  createRainbow = () => {
    gridCells.forEach((cell) => {
      cell.addEventListener("mousedown", (e) => {
        if (rainbowEnabled) {
          mouseDown = true;
          let randomColor = Math.floor(Math.random() * 16777215).toString(16);                // Generates random color for each hovered cell
          e.target.style.backgroundColor = "#" + randomColor;                                 // Inputs that random color
        };
      });

      cell.addEventListener("mouseup", () => {
        mouseDown = false;
      });

      cell.addEventListener("mouseenter", (e) => {
        if (e.buttons === 1 && mouseDown) {
          let randomColor = Math.floor(Math.random() * 16777215).toString(16);
          
          if (cell.matches("div")) {
            e.target.classList.add("rainbow-hover");
            e.target.style.backgroundColor = "#" + randomColor;
          };
        };
      });
    });
    customColorEnabled = false;
    defaultEnabled = false;
    eraserEnabled = false;
    rainbowEnabled = true;
  };

  rainbowBtn.addEventListener("click", (e) => {
    e.target.style.cssText = "transform: scale(1.2); transition: 0.1s; background-color: rgb(61, 1, 144)";
    defaultBtn.style.cssText = 'transform: ""; transition: ""; background-color: ""'; 
    eraserBtn.style.cssText = 'transform: ""; transition: ""; background-color: ""'; 
  });

  rainbowBtn.addEventListener("click", createRainbow);

  // Create an Eraser

  createEraser = () => {
    gridCells.forEach((cell) => {
      cell.addEventListener("mousedown", (e) => {
        if (eraserEnabled) {
          mouseDown = true;
          e.target.classList.remove("rainbow-hover", "default-hover", "custom-hover");
          e.target.style.backgroundColor = "";
        };
      });

      cell.addEventListener("mouseup", () => {
        mouseDown = false;
      });

      cell.addEventListener("mouseenter", (e) => {
        if (e.buttons === 1 && mouseDown) {
          let target = e.target;

          if (target.matches("div")) {
            e.target.classList.remove("rainbow-hover", "default-hover", "custom-hover");
            e.target.style.backgroundColor = "";
          };
        };
      });
    });
    customColorEnabled = false;
    defaultEnabled = false;
    rainbowEnabled = false;
    eraserEnabled = true;
  };

  eraserBtn.addEventListener("click", (e) => {
    e.target.style.cssText = "transform: scale(1.2); transition: 0.1s; background-color: rgb(61, 1, 144)";
    defaultBtn.style.cssText = 'transform: ""; transition: ""; background-color: ""'; 
    rainbowBtn.style.cssText = 'transform: ""; transition: ""; background-color: ""';
  });

  eraserBtn.addEventListener("click", createEraser);

  // Create a Color picker
 
  createColorPicker = () => {
    colorPickerBtn.addEventListener("change", () => {
      gridCells.forEach((cell) => {
        cell.addEventListener("mousedown", () => {
          if (customColorEnabled) {
            mouseDown = true;
            let color = colorPickerBtn.value;
            cell.classList.add("custom-hover");
            cell.style.backgroundColor = color;
          };
        });

        cell.addEventListener("mouseup", () => {
          mouseDown = false;
        });

        cell.addEventListener("mouseenter", (e) => {
          if (e.buttons === 1 && mouseDown) {
            let color = colorPickerBtn.value;

            if (cell.matches("div")) {
              cell.classList.add("custom-hover");
              cell.style.backgroundColor = color;
            };
          };
        });
      });
    });
    defaultEnabled = false;
    rainbowEnabled = false;
    eraserEnabled = false;
    customColorEnabled = true;

    removeButtonEffects();
  };
  colorPickerBtn.addEventListener("input", createColorPicker);

  // Clear Grid

  createClearGrid = () => {
    clearGridBtn.addEventListener("click", () => {
      gridCells.forEach((cell) => {
        cell.style.backgroundColor = "";
      });
    });
  };
  createClearGrid();
};
createToolbox();

slider.addEventListener("change", () => {
  createToolbox();                                                                            // Creates a new grid and resets all the functions after slider value is changed
  removeButtonEffects();
});