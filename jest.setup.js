/* eslint-disable no-undef */
// jest.setup.js
const { JSDOM } = require('jsdom');
const { document } = (new JSDOM('<!doctype html><html><body><div class="score-value"></div><div class="result"></div><div class="grid-container"></div></body></html>')).window;

global.document = document;
global.window = document.defaultView;
global.HTMLElement = window.HTMLElement;
/* eslint-enable no-undef */