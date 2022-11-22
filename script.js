
const gridContainer = document.querySelector(".grid-container");
const gridBtn = document.querySelector(".generate-grid");
const slider = document.querySelector("#range")
const value = document.querySelector("#value");
const resetBtn = document.querySelector(".reset");

createGrid = () => {
  let userInput = slider.value;
  gridContainer.textContent = "";
  
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
  document.body.appendChild(gridContainer);

  const gridCells = document.querySelectorAll(".row");

  resetBtn.addEventListener("click", () => {
    gridCells.forEach((cell) => {
      cell.classList.remove("cell-hover");
    });
  });
  
  gridCells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      cell.classList.add("cell-hover");
    });
  });
};
createGrid();

slider.addEventListener("change", () => {
  createGrid();
});



