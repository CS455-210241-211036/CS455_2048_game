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
  
    const { startTheGame } = require('./script');
  
    // Reset the game before each test
   await startTheGame(); // Await if startTheGame is asynchronous
  });

  afterEach(() => {
    global.document = undefined;
    global.window = undefined;
  });

  test('start game correctly places two 2s on the grid', async () => {

    // Verify the grid state
    const tiles = Array.from(document.querySelectorAll('.grid-item'));
    let tileValues = tiles.map(tile => tile.firstElementChild.innerText);
    console.log('Tile values after initialization:', tileValues);

    // Count tiles with value '2'
    let twoCount = tileValues.filter(value => value === 2).length;
    expect(twoCount).toBe(2); // Expect exactly two tiles with value '2'
});
});
