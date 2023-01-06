// Etch a Sketch by Vlad Hadyak (using flex-box layout instead of grid)

const gridContainer = document.querySelector(".grid-container");
const contentContainer = document.querySelector(".content-container");
const slider = document.querySelector("#range")
const value = document.querySelector("#value");

const resetBtn = document.querySelector(".reset");
const eraserBtn = document.querySelector("#eraser");
const defaultColor = document.querySelector("#default");
const rainbowColor = document.querySelector("#rainbow");
const customColor = document.querySelector("#custom-color-picker");
const defaultColorPicker = "#d9ff00";                                                       // Default color of the color picker

customColor.value = defaultColorPicker;

let mouseDown = false;

let customEnabled = true;
let defEnabled = true;
let rainbowEnabled = true;

let defFocus = true;
let rainbowFocus = true;
let eraserFocus = true;

createGrid = () => {
  let userInput = slider.value;                                                             // Displays the grid size based on the value of the slider
  slider.oninput = createGrid;                                                                                    
  gridContainer.textContent = "";                                                           // Remove the previous grid after new grid has been selected by a user
  
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

  // Resets the grid

  resetGrid = () => {
    resetBtn.addEventListener("click", () => {
      gridCells.forEach((cell) => {
        cell.classList.remove("cell-hover", "rainbow-hover", "custom-color-hover");
        cell.style.backgroundColor = "";
      });
    });
  };
  resetGrid();

  // Add a Default Color and draw only when the mouse is clicked and held down (for all colors)

  createDefColor = () => {
    gridCells.forEach((cell) => {
      cell.addEventListener("mousedown", (e) => {                                           // Allows to highlight the very first cell
        if (defEnabled) {
          mouseDown = true;
          customEnabled = false;
          rainbowEnabled = false;
          e.target.style.backgroundColor = "rgb(30, 11, 58)";
        };
      });
    });
  
    gridCells.forEach((cell) => {
      cell.addEventListener("mouseup", () => {                                       
        mouseDown = false;
      });
    });

    gridContainer.addEventListener("mouseleave", () => {                                    // Makes sure mouse doesn't automatically hover over grid cells when it enters a grid container again, after it already left the grid container with mouse pressed down
      mouseDown = false;
    });

    mousemoveHandler = () => {
      gridCells.forEach((cell) => {
        cell.addEventListener("mouseenter", (e) => {                                        // Continues to hover over grid cells when mouse is pressed and held
          if (mouseDown) {
            let target = e.target; 
    
            if (target.matches("div")) {
              target.classList.add("cell-hover");
              target.style.backgroundColor = "rgb(30, 11, 58)";
            };
          };
        });
      });
    };
    mousemoveHandler();
  };
  createDefColor();

  defaultColor.addEventListener("click", (e) => {
    createDefColor();
    rainbowEnabled = false;
    defEnabled = true;
    if (defFocus) {
      e.target.style.cssText = "background-color: rgb(28, 18, 105); transform: scale(1.2); transition: 0.1s;";
      rainbowColor.style.cssText = 'background-color: ""; transform: ""; transition: "";';
      eraserBtn.style.cssText = 'background-color: ""; transform: ""; transition: "";';
    };
  });

  // Removes buttons' hover effect

  clearHoverButtonEffect = () => {
    eraserBtn.style.cssText = 'background-color: ""; transform: ""; transition: "";';
    defaultColor.style.cssText = 'background-color: ""; transform: ""; transition: "";';
    rainbowColor.style.cssText = 'background-color: ""; transform: ""; transition: "";';
  };

  // Add a Color Picker

  createCustomColor = () => {
    customColor.addEventListener("change", (e) => {
      gridCells.forEach((cell) => {
        cell.addEventListener("mousedown", () => {
          if (customEnabled) {
            mouseDown = true;
            cell.classList.add("custom-color-hover");
            cell.style.backgroundColor = e.target.value;
          };
        });
      });
    });

    gridCells.forEach((cell) => {
      cell.addEventListener("mouseup", () => {
        mouseDown = false;
      });
    });
    
    mousemoveHandler = () => {
      customColor.addEventListener("change", (e) => {
        gridCells.forEach((cell) => {
          cell.addEventListener("mouseenter", () => {
            if (mouseDown) {
              if (cell.matches("div")) {
                cell.classList.add("custom-color-hover");
                cell.style.backgroundColor = e.target.value;
              };
            };
          });
        });
      });
      customEnabled = true;
      rainbowEnabled = false;
      defEnabled = false;
    };
    mousemoveHandler();
    clearHoverButtonEffect();
  };
  customColor.addEventListener("input", createCustomColor);

  // Add an Eraser 

  createEraser = () => {
    gridCells.forEach((cell) => {
      cell.addEventListener("mousedown", (e) => {
        mouseDown = true;
        e.target.style.backgroundColor = "";
        e.target.classList.remove("cell-hover", "rainbow-hover", "custom-color-hover");
      });
    });

    gridCells.forEach((cell) => {
      cell.addEventListener("mouseup", () => {
        mouseDown = false;
      });
    });

    mousemoveHandler = () => {
      gridCells.forEach((cell) => {
        cell.addEventListener("mouseenter", (e) => {
          if (mouseDown) {
            let target = e.target;

            if (target.matches("div")) {
              target.style.backgroundColor = "";
              target.classList.remove("cell-hover", "rainbow-hover", "custom-color-hover");
            };
          };
        });
      });
    };
    mousemoveHandler();   
  };
  eraserBtn.addEventListener("click", (e) => {
    if (eraserFocus) {
      e.target.style.cssText = "background-color: rgb(28, 18, 105); transform: scale(1.2); transition: 0.1s;";
      defaultColor.style.cssText = 'background-color: ""; transform: ""; transition: "";';
      rainbowColor.style.cssText = 'background-color: ""; transform: ""; transition: "";';
    };
  });
  eraserBtn.addEventListener("click", createEraser);

  // Add a Rainbow Color

  createRainbow = () => {
    gridCells.forEach((cell) => {
      cell.addEventListener("mousedown", (e) => {
        if (rainbowEnabled) {
          mouseDown = true;
          let randomColor = Math.floor(Math.random() * 16777215).toString(16);              // Generates a random color for each grid cell that is hovered 
          e.target.style.backgroundColor = "#" + randomColor;                               // Inputs that random color              
        }; 
      });
    });
  
    gridCells.forEach((cell) => {
      cell.addEventListener("mouseup", () => {
        mouseDown = false;
      });
    });

    mousemoveHandler = () => {
      gridCells.forEach((cell) => {
        cell.addEventListener("mouseenter", (e) => {
          if (mouseDown) {
            let target = e.target;
            randomColor = Math.floor(Math.random() * 16777215).toString(16);
             
            if (target.matches("div")) {
              target.classList.add("rainbow-hover");
              target.style.backgroundColor = "#" + randomColor; 
            };
          };
        });  
      });
      rainbowEnabled = true;
      defEnabled = false;
      customEnabled = false;
    };
    mousemoveHandler();
  };

  rainbowColor.addEventListener("click", (e) => {
    if (rainbowFocus) {
      e.target.style.cssText = "background-color: rgb(28, 18, 105); transform: scale(1.2); transition: 0.1s;";
      defaultColor.style.cssText = 'background-color: ""; transform: ""; transition: "";';
      eraserBtn.style.cssText = 'background-color: ""; transform: ""; transition: "";';
    };
  });
  rainbowColor.addEventListener("click", createRainbow);
};
createToolbox();

// Resets toolbox and updates grid when value of the slider changes 

slider.addEventListener("change", () => {
  defEnabled = true;
  rainbowEnabled = false;
  customEnabled = false;
  clearHoverButtonEffect();
  createGrid();
  createToolbox();
});