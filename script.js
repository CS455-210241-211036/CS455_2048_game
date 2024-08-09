const gridItems = Array.from(document.querySelectorAll(".grid-item"));
let curr_grid = [];
let row = [];
let grid_row_size = 4;
let grid_col_size = 4;
let i;
for(i=1; i<=gridItems.length; i++)
{
    let item = gridItems[i-1];
    item.firstElementChild.innerText = "";
    row.push(item);
    if(i%grid_row_size == 0)
    {
        curr_grid.push(row);
        row = [];
    }
}

let row_index_1 = Math.floor(Math.random() * grid_col_size);
let row_index_2 = Math.floor(Math.random() * grid_col_size);
let col_index_1 = Math.floor(Math.random() * grid_row_size);
let col_index_2 = Math.floor(Math.random() * grid_row_size);

while(col_index_1 == col_index_2 && row_index_1 == row_index_2)
{
    let row_index_2 = Math.floor(Math.random() * grid_col_size);
    let col_index_2 = Math.floor(Math.random() * grid_row_size);
}

matrix[row_index_1][col_index_1].firstElementChild.textContent = 2; 
matrix[row_index_2][col_index_2].firstElementChild.textContent = 2;
