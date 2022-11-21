
const gridContainer = document.querySelector(".grid-container");
const gridBtn = document.querySelector(".generate-grid");
const slider = document.querySelector("#range")
const value = document.querySelector("#value");
const resetBtn = document.querySelector(".reset");

createDefaultGrid = () => {
  value.textContent = "Grid size: " + 16 +"x"+16;                 
  for (let i = 0; i < 16; i++) {
    const column = document.createElement("div");
    column.classList.add("column");

    for (let j = 0; j < 16; j++) {
      const row = document.createElement("div");
      row.classList.add("row");
      column.appendChild(row);
    };
    gridContainer.appendChild(column);
  };
  document.body.appendChild(gridContainer);

  const gridCells = document.querySelectorAll(".row");
  gridCells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      cell.classList.add("cell-hover");
    });
  });

  resetBtn.addEventListener("click", () => {
    gridCells.forEach((cell) => {
      cell.classList.remove("cell-hover");
    });
  });
};
createDefaultGrid();

slider.addEventListener("change", () => {
  let userInput = slider.value;
  value.textContent = `Grid size: ${userInput}x${userInput}`;
  gridContainer.innerHTML = "";

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
  gridCells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      cell.classList.add("cell-hover");
    });
  });

  resetBtn.addEventListener("click", () => {
    gridCells.forEach((cell) => {
      cell.classList.remove("cell-hover");
    });
  });
});
