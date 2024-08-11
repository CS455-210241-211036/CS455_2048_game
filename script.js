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
    if(i%grid_row_size === 0)
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

function getCurrentValues(){
    let matrix = []
    let row = []; 
    for(i=1; i<=gridItems.length; i++){
        if(i % grid_row_size === 0){
            let item = gridItems[i-1];
            row.push(item.firstElementChild.innerText);
            matrix.push(row);
            row = [];
        }

        else {
            let item = gridItems[i-1];
            row.push(item.firstElementChild.innerText);
        }

    }
    return matrix;
}

function getAvailableValues()
{
    curr_grid = getCurrentValues();
    let available_cells = [];
    for(let i = 0; i < grid_col_size; i++)
    {
        for(let j =0; j < grid_row_size; j++)
        {
            if(curr_grid[i][j] == "")
            {
                available_cells.push([i,j]);
            }
        }
    }
    return available_cells;
}

function shiftLeft(arr)
{
    let curr_val;
    let prev_val;
    for(let j=0; j<arr.length; j++)
    {
        for(let i=0; i<arr.length-1; i++)
        {
            curr_val = arr[i+1].firstElementChild;
            prev_val = arr[i].firstElementChild;
            if(prev_val.innerText == 0)
            {
                prev_val.innerText = curr_val.innerText;
                curr_val.innerText = "";
            }
        }
    }
}

function moveLeft(arr)
{
    let curr_cell;
    let prev_cell;
    let curr_val;
    let prev_val;
    shiftLeft(arr);
    
    for(let i=0; i<arr.length-1; i++)
    {
        curr_cell = arr[i+1].firstElementChild;
        prev_cell = arr[i].firstElementChild;
        curr_val = parseInt(curr_cell.innerText);
        prev_val = parseInt(prev_cell.innerText);
        if(curr_val === prev_val && curr_val !== 0)
        {
            prev_cell.innerText = curr_val + prev_val;
            curr_cell.innerText = "";
        }
    }

    shiftLeft(arr);
}

function shiftRight(arr) {
    let curr_val;
    let prev_val;
    for(let j=0; j<arr.length; j++)
    { 
        for(let i = arr.length - 1; i > 0; i--) {
            curr_val = arr[i].firstElementChild;
            prev_val = arr[i-1].firstElementChild;
            if(curr_val.innerText == 0) {
                curr_val.innerText = prev_val.innerText;
                prev_val.innerText = "";
            }
        }

    }
}

function moveRight(arr) {
    let curr_cell;
    let prev_cell;
    let curr_val;
    let prev_val;
    shiftRight(arr);
    
    for(let i = arr.length - 1; i > 0; i--) {
        curr_cell = arr[i].firstElementChild;
        prev_cell = arr[i-1].firstElementChild;
        curr_val = parseInt(curr_cell.innerText);
        prev_val = parseInt(prev_cell.innerText);
        if(curr_val === prev_val && curr_val !== 0) {
            curr_cell.innerText = curr_val + prev_val;
            prev_cell.innerText = "";
        }
    }

    shiftRight(arr);
}
