/* eslint-disable no-undef */
const { JSDOM } = require('jsdom');

describe('2048 Game', () => {
  let document;
  let window;

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
      <button class="reset-btn">Reset</button>
    `;
  
    const { startTheGame } = require('./public/script');
  
    // Reset the game before each test
    await startTheGame(); // Await if startTheGame is asynchronous
  });

  afterEach(() => {
    global.document = undefined;
    global.window = undefined;
  });

  
test('move left', () => {
    let tiles = Array.from(document.querySelectorAll('.grid-item'));

    // Set up initial state
 tiles[1].firstElementChild.innerText = 2;
 tiles[0].firstElementChild.innerText = 2;

    // Simulate pressing the left arrow key
    document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    tiles = Array.from(document.querySelectorAll('.grid-item'));
    let tileValues = tiles.map(tile => tile.firstElementChild.innerText);
    console.log('Tile values after move left:', tileValues);
    // Check immediately after the event
    expect(tiles[0].firstElementChild.innerText).toBe(4);
 
  });
});
/* eslint-enable no-undef */
