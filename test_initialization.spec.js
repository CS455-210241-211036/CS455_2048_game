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
  
    const { startTheGame } = require('./script');
  
    // Reset the game before each test
    startTheGame(); // Await if startTheGame is asynchronous
  });

  afterEach(() => {
    global.document = undefined;
    global.window = undefined;
  });

  
  test('shouldset the score and result', () => {

    expect(document.querySelector('.score-value').innerText).toBe(0);
    expect(document.querySelector('.result').innerText).toBe('');
  });

});

