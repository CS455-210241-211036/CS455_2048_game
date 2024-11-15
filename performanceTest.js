/* eslint-disable no-undef */
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function performanceTest() {
  // Configure Chrome options for headless mode
  const options = new chrome.Options();
  options.addArguments('--headless'); // Run in headless mode
  options.addArguments('--disable-gpu'); // Disable GPU for compatibility
  options.addArguments('--no-sandbox'); // Required for some CI environments
  options.addArguments('--disable-dev-shm-usage'); // Optimize memory usage

  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .usingServer('http://localhost:4444/wd/hub') // Connect to the Selenium service
    .build();

  try {
    // Load the Game Page and Measure Performance
    console.log('Loading Game Page...');
    await driver.get('https://cs4552048game-production.up.railway.app/'); 

    // Get Performance Navigation Timing API data for Game Page
    let gameTiming = await driver.executeScript(() => {
      const [navigationTiming] = performance.getEntriesByType('navigation');
      return navigationTiming ? {
        loadEventEnd: navigationTiming.loadEventEnd,
        navigationStart: navigationTiming.startTime
      } : null;
    });

    if (gameTiming) {
      const gameLoadTime = gameTiming.loadEventEnd - gameTiming.navigationStart;
      console.log(`Game Page Load Time: ${gameLoadTime} ms`);
    } else {
      console.log('Navigation timing data not available.');
    }

    // Get Network Resource Data to Identify Large Assets
    const resources = await driver.executeScript(() => {
      return performance.getEntriesByType('resource').map(resource => ({
        name: resource.name,
        duration: resource.duration,
        size: resource.transferSize,
        type: resource.initiatorType
      }));
    });

    console.log('Resource Load Details:', resources);

    if (resources.length > 0) {
      console.log('Assets Detected:');
      resources.forEach(asset => {
        console.log(`- ${asset.name} (Size: ${asset.size / 1024} KB, Duration: ${asset.duration} ms)`);
      });
    } else {
      console.log('No assets detected.');
    }
  } finally {
    await driver.quit();
  }
})();
