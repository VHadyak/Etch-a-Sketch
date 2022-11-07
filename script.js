// 16x16 grid

let columns = 16;
let rows = 16;

const gridContainer = document.createElement("div");
gridContainer.classList = ("grid-container");

getGrid = () => {
  for (let i = 0; i < columns; ++i) {
    const column = document.createElement("div");
    column.classList = "column";

    for (let j = 0; j < rows; ++j) {
      const row = document.createElement("div");
      row.classList = "row";
      column.appendChild(row);
    };
    gridContainer.appendChild(column);
  };
  document.body.appendChild(gridContainer);
};
getGrid();