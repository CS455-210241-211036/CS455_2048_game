function getTileColor(value) {
    switch (value) {
        case 2: return "#FAE3D9";
        case 4: return "#FFC4C4";
        case 8: return "#FFAAA5";
        case 16: return "#FFD3B6";
        case 32: return "#FF8C94";
        case 64: return "#FF847C";
        case 128: return "#E7B4B4";
        case 256: return "#E9B0E5";
        case 512: return "#CC99C9";
        case 1024: return "#CDB4DB";
        case 2048: return "#A4B5A4";
        default: return "#DCD3CB"; 
    }
}

export function updateTileColors() {
    for (let row of curr_grid) {
        for (let tile of row) {
            let value = parseInt(tile.firstElementChild.innerText);
            let color = getTileColor(value);
            tile.style.backgroundColor = color;
        }
    }
}