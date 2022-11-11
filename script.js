// 16x16 grid

let userInput;

const gridContainer = document.createElement("div");
gridContainer.classList = ("grid-container");

const gridGenerator = document.querySelector(".generate-grid");

grid16x16 = () => {                                                                       // Default 16x16 Grid
  let columns = 16;
  let rows = 16;

  for (let i = 0; i < columns; ++i) {
    const column = document.createElement("div");
    column.classList = "column";

    for (let j = 0; j < rows; ++j) {
      const row = document.createElement("div");
      row.classList = "row";
      column.appendChild(row);

      row.addEventListener("mouseover", (e) => {
        e.target.classList.add("grid-color");
      });
    };
    gridContainer.appendChild(column);
  };
  document.body.appendChild(gridContainer);
};
grid16x16();

customGrid = () => {                                                                 // Creates a custom grid selected by user
  for (let i = 0; i < userInput; ++i) {
    if (userInput <= 100) {
      const column = document.createElement("div");
      column.classList = "column";

      for (let j = 0; j < userInput; ++j) {
        const row = document.createElement("div");
        row.classList = "row";
        column.appendChild(row);

        row.addEventListener("mouseover", (e) => {
          e.target.classList.add("grid-color");
        });
      };
      gridContainer.appendChild(column);
    } else {break;};
  };
  document.body.appendChild(gridContainer);
};

removeAllChildren = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  };
};

gridGenerator.addEventListener("click", () => {
  removeAllChildren(gridContainer);
  userInput = parseInt(prompt("Enter a number of squares to create a grid:", 1));
  customGrid();
});
