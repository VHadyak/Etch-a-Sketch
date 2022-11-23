
const gridContainer = document.querySelector(".grid-container");
const slider = document.querySelector("#range")
const value = document.querySelector("#value");
const resetBtn = document.querySelector(".reset");
const colorBtn = document.querySelectorAll(".colorBtn");
const greenColor = document.querySelector("#green");

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
      cell.classList.remove("cell-hover", "red-hover", "blue-hover", "green-hover", "rainbow-hover");
      cell.style.backgroundColor = "";
    });
  });

  gridCells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      cell.classList.add("cell-hover");
      cell.style.backgroundColor = "rgb(23, 22, 31)";
    });
  });
  
  colorBtn.forEach((color) => {
    color.addEventListener("click", (e) => {
      gridCells.forEach((cell) => {
        cell.addEventListener("mouseover", () => {     
          let colorPick = e.target.id;
          let randomColor = Math.floor(Math.random() * 16777215).toString(16);            

          switch (colorPick) {
            case "red":
              cell.classList.add("red-hover");
              cell.style.backgroundColor = "red";
              break;
            case "blue":
              cell.classList.add("blue-hover");
              cell.style.backgroundColor = "blue";
              break;
            case "green":
              cell.classList.add("green-hover");
              cell.style.backgroundColor = "green";
              break;
            case "rainbow":
              cell.classList.add("rainbow-hover");
              cell.style.backgroundColor = "#" + randomColor;
              break;
            case "default":
              cell.style.backgroundColor = "rgb(23, 22, 31)";
              break;
          };         
        });
      });
    });
  });
};
createGrid();

slider.addEventListener("change", () => {
  createGrid();
});
