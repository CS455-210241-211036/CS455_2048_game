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
