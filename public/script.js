let gridItems = Array.from(document.querySelectorAll(".grid-item"));
let prev_grid = [];
let curr_grid = [];
let row = [];
let grid_row_size = 4;
let grid_col_size = 4;
let i;
let score;
let playerName;
const score_val = document.querySelector(".score-value");
const result = document.querySelector(".result");

function updateLeaderboard(leaderboardData) {
    leaderboardTableBody.innerHTML = "";
    leaderboardData.forEach((entry, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.playerName}</td>
            <td>${entry.score}</td>
        `;
        leaderboardTableBody.appendChild(row);
    });
}

function gameResult(status)
{
    if(status === 1)
    {
        result.innerText = "You Win!";
    }
    else
    {
        result.innerText = "You Lost the Game";
    }
    fetch('/api/save-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({playerName, score}),
      })
        .then(response => response.json())
        .then(data => {
            updateLeaderboard(data);
        })
        .catch(error => console.error('Error:', error));
}

 function getTileColor(value) {
    const colorMap = {
        2: "#FAE3D9",
        4: "#FFC4C4",
        8: "#FFAAA5",
        16: "#FFD3B6",
        32: "#FF8C94",
        64: "#FF847C",
        128: "#E7B4B4",
        256: "#E9B0E5",
        512: "#CC99C9",
        1024: "#CDB4DB",
        2048: "#A4B5A4"
    };
    return colorMap[value] || "#DCD3CB";
}

function updateTileColors() {
    for (let row of curr_grid) {
        for (let tile of row) {
            let value = parseInt(tile.firstElementChild.innerText);
            let color = getTileColor(value);
            tile.style.backgroundColor = color;
        }
    }
}
  
function startTheGame()
{
    playerName = document.getElementById('playerName').value;
    if (!playerName) {
      alert('Please enter your name to start the game.');
      return;
    }
    gridItems = Array.from(document.querySelectorAll(".grid-item"));
    result.innerText = "";
    score=0;
    score_val.innerText = score;
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
            row_index_2 = Math.floor(Math.random() * grid_col_size);
            col_index_2 = Math.floor(Math.random() * grid_row_size);
        }
        
        curr_grid[row_index_1][col_index_1].firstElementChild.innerText = 2; 
        curr_grid[row_index_2][col_index_2].firstElementChild.innerText = 2;
        console.log(row_index_1,col_index_1,row_index_2,col_index_2);
        
        updateTileColors();
    
}
  function addStartButtonListener() {
	const startButton = document.querySelector(".start-btn");
	if (startButton) {
	  startButton.addEventListener("click", startTheGame);
	}
  }
  addStartButtonListener();

function getCurrentValues(){
    let gridItems = Array.from(document.querySelectorAll(".grid-item"));
    let matrix = []
    let row = []; 
    for(i=1; i<=gridItems.length; i++){
        if(i % grid_row_size === 0){
            let item = gridItems[i-1];
            row.push(item);
            matrix.push(row);
            row = [];
        }

        else {
            let item = gridItems[i-1];
            row.push(item);
        }

    }
    return matrix;
}

function getCurrentNumericalValues(){
    let gridItems = Array.from(document.querySelectorAll(".grid-item"));
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
            if(curr_grid[i][j].firstElementChild.innerText == "")
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

function check_matrix_equal(grid,mat_2)
{
    for(let i=0;i<grid_col_size;i++)
    {
        for(let j =0;j<grid_row_size;j++)
        {
            if(grid[i][j].firstElementChild.innerText != mat_2[i][j])
            {
                return 0;
            }
        }
    }
    return 1;
}

function generateNewBlock() { 
    let available_cells = getAvailableValues();

	if (available_cells.length !== 0) { 
		let randCoord = Math.floor(Math.random() * available_cells.length); 
		let coords = available_cells[randCoord]; 
		let randNum = (Math.floor(Math.random() * 2) + 1)*2;

		let tile = curr_grid[coords[0]][coords[1]].firstElementChild; 
		tile.innerText = randNum; 
        updateTileColors();
	}
    else
    {
        gameResult(0);
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
            score = score + curr_val + prev_val;
            if(curr_val + prev_val === 2048)
                {
                    gameResult(1);
                }
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
            score = score + curr_val + prev_val;
            if(curr_val + prev_val === 2048)
            {
                gameResult(1);
            }
        }
    }

    shiftRight(arr);
}

const arrayColumn = (arr,n) => arr.map((x) => x[n]);

function moveBlocks(e)
{
    curr_grid = getCurrentValues();
    prev_grid = getCurrentNumericalValues();
    let col1 = arrayColumn(curr_grid, 0); 
	let col2 = arrayColumn(curr_grid, 1); 
	let col3 = arrayColumn(curr_grid, 2); 
	let col4 = arrayColumn(curr_grid, 3); 
	let row1 = curr_grid[0]; 
	let row2 = curr_grid[1]; 
	let row3 = curr_grid[2]; 
	let row4 = curr_grid[3]; 
    switch(e.key)
    {
        case "ArrowLeft": moveLeft(row1);
                          moveLeft(row2);
                          moveLeft(row3);
                          moveLeft(row4);
                          break;
        case "ArrowRight": moveRight(row1);
                           moveRight(row2);
                           moveRight(row3);
                           moveRight(row4);
                           break;
        case "ArrowUp": moveLeft(col1);
                        moveLeft(col2);
                        moveLeft(col3);
                        moveLeft(col4);
                        break;
        case "ArrowDown": moveRight(col1);
                          moveRight(col2);
                          moveRight(col3);
                          moveRight(col4);
                          break;
        default: return;
    }
    score_val.innerText = score;
    updateTileColors();
    curr_grid = getCurrentValues();
    if(!check_matrix_equal(curr_grid,prev_grid))
        {
            generateNewBlock();
            curr_grid = getCurrentValues();
        }
        else 
        {
            let available_cells = getAvailableValues();
            if(available_cells == 0)
            {
                gameResult(0);
            }
        }
}

document.addEventListener("keydown",moveBlocks);
/* eslint-disable no-undef */
module.exports = { startTheGame,updateTileColors, getTileColor };
/* eslint-enable no-undef */