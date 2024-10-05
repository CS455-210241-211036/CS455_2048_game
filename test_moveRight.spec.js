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
      <input type="text" id="playerName" value="Test Player" />
      <button class="start-btn">Start</button>
    `;
  
    const { startTheGame } = require('./public/script');
  
    // Reset the game before each test
    await startTheGame(); // Await if startTheGame is asynchronous
  });

  afterEach(() => {
    global.document = undefined;
    global.window = undefined;
  });

  
  test('move right', () => {
    let tiles = Array.from(document.querySelectorAll('.grid-item'));
             tiles[2].firstElementChild.innerText = 2;
             tiles[3].firstElementChild.innerText = 2;
    
    document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowRight' }));

    expect(tiles[3].firstElementChild.innerText).toBe(4);
  });
});
/* eslint-enable no-undef */
