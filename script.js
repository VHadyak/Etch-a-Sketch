// Etch a Sketch by Vlad Hadyak (using flex-box layout instead of grid)

const gridContainer = document.querySelector(".grid-container");
const contentContainer = document.querySelector(".content-container");
const slider = document.querySelector("#range")
const value = document.querySelector("#value");
const resetBtn = document.querySelector(".reset");
const colorBtn = document.querySelectorAll(".colorBtn");
const eraserBtn = document.querySelector("#eraser");

const customColor = document.querySelector("#custom-color-picker");
const defaultColor = "#d9ff00";                                                             // Default color of the color picker

customColor.value = defaultColor;
customColor.select();

createGrid = () => {
  let userInput = slider.value;    
  slider.oninput = createGrid;
                                                                                            // Displays the grid size based on the value on the slider
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

  const gridCells = document.querySelectorAll(".row");
  
  resetGrid = () => {
    resetBtn.addEventListener("click", () => {
      gridCells.forEach((cell) => {
        cell.classList.remove("cell-hover", "rainbow-hover", "custom-color-hover");
        cell.style.backgroundColor = "";
      });
    });
  };
  resetGrid();

  createDefColor = () => {
    gridCells.forEach((cell) => {
      cell.addEventListener("mouseover", () => {
        cell.classList.add("cell-hover");
        cell.style.backgroundColor = "rgb(30, 11, 58)";
      });
    });
  };
  createDefColor();

  createCustomColor = () => {
    customColor.addEventListener("change", (e) => {
      gridCells.forEach((cell) => {
        cell.addEventListener("mouseover", () => {
          cell.classList.add("custom-color-hover");
          cell.style.backgroundColor = e.target.value;
        });
      });
    });
  };
  createCustomColor();

  createEraser = () => {
    eraserBtn.addEventListener("click", () => { 
      gridCells.forEach((cell) => {
        cell.addEventListener("mouseover", () => {
          cell.style.backgroundColor = "";
        });
      });
    });
  };
  createEraser();

  createColors = () => {
    colorBtn.forEach((color) => {
      color.addEventListener("click", (e) => {
        gridCells.forEach((cell) => {
          cell.addEventListener("mouseover", () => {     
            let colorPick = e.target.id;                                                    // Selects the id of the button, and chooses the correct option based on that id
            let randomColor = Math.floor(Math.random() * 16777215).toString(16);            // Randomizes the colors to create a 'rainbow button' option   

            switch (colorPick) {
              case "rainbow":
                cell.classList.add("rainbow-hover");
                cell.style.backgroundColor = "#" + randomColor;
                break;
              case "default":
                cell.style.backgroundColor = "rgb(30, 11, 58)";
                break;
            };         
          });
        });
      });
    });
  };
  createColors();
};
createGrid();

slider.addEventListener("change", () => {
  createGrid();
});

