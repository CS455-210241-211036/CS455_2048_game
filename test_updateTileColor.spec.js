/* eslint-disable no-undef, no-global-assign */
const { JSDOM } = require('jsdom');
const { updateTileColors } = require('./public/script');


  describe('updateTileColors', () => {
    beforeEach(async () => {
        ({ document, window } = (new JSDOM('<!doctype html><html><body><div class="grid-container"></div></body></html>')).window);
        global.document = document;
        global.window = window;
      
        document.body.innerHTML = `
          <div class="grid-container">
            ${Array.from({ length: 16 }).map(() => `<div class="grid-item"><div></div></div>`).join('')}
          </div>
          <div class="score-value"></div>
          <div class="result"></div>
          <input type="text" id="playerName" value="Test Player" />
          <button class="reset-btn">Reset</button>
        `;
        const { startTheGame} = require('./public/script');
        // Reset the game before each test
        await startTheGame(); // Await if startTheGame is asynchronous
      });
    
      afterEach(() => {
        global.document = undefined;
        global.window = undefined;
      });

    test('should update tile color based on value', () => {
      /* eslint-enable no-undef */
      // Set up grid items
      const tiles = Array.from(document.querySelectorAll('.grid-item'));
      tiles[0].firstElementChild.innerText = 2;
      tiles[1].firstElementChild.innerText = 4;
  
      // Call the updateTileColors function
      updateTileColors();
      function rgbToHex(rgb) {
        // Match RGB value in string
        const result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(rgb);
        if (!result) return null;
        // Convert to hexadecimal format
        return "#" + ((1 << 24) + (parseInt(result[1]) << 16) + (parseInt(result[2]) << 8) + parseInt(result[3])).toString(16).slice(1).toUpperCase();
    }
    
      // Check if the background color was updated correctly
      expect(rgbToHex(tiles[0].style.backgroundColor)).toBe('#FAE3D9');
      expect(rgbToHex(tiles[1].style.backgroundColor)).toBe('#FFC4C4');
    });
  });
/* eslint-enable no-undef, no-global-assign */


