
const gridContainer = document.querySelector(".grid-container");
const gridBtn = document.querySelector(".generate-grid");
const slider = document.querySelector("#range")
const value = document.querySelector("#value");




slider.addEventListener("change", () => {
  let userInput = slider.value;
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
});
