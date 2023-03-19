import { Builder, By, Key, until, WebElement, WebDriver } from "selenium-webdriver";
import chrome from 'selenium-webdriver/chrome';
import * as fs from 'fs';
import "chromedriver";
import * as readline from 'readline';
import chalk from 'chalk';


//const driver = new Builder().forBrowser("chrome").build();

const chromeOptions = new chrome.Options();

// Set the User-Agent header to spoof a Google Chrome browser
chromeOptions.addArguments(
  '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
);

// Create a new WebDriver object with the ChromeOptions
const driver: WebDriver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(chromeOptions)
  .build();



let options = ['Option 1', 'Option 2', 'Option 3'];
let selectedIndex = 0;

const startingUrl: string = 'https://www.youtube.com/';

async function browsePage(url: string) {

  try {
    await driver.get(url);
  } finally {
    
    //driver.takeScreenshot().then((data: string) => {
    //    fs.writeFileSync('example.png', data, 'base64');
    //});

    
    const links = await driver.findElements(By.css('a'));

    // Extract the href attribute from each link
    options = await Promise.all(links.map(async (link) => {
        return await link.getAttribute('href');
    }));

    //console.log(hrefs);
    setUi();
  }
}

browsePage(startingUrl);

/* ------------------------------------------------------- */


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Make stdin emit 'keypress' events
readline.emitKeypressEvents(process.stdin);
if (process.stdin.setRawMode) {
  process.stdin.setRawMode(true);
} else {
  console.error('Raw mode is not supported in this environment.');
  process.exit(1);
}

async function waitForArrowKey(): Promise<string> {
  return new Promise((resolve) => {
    const handleKeyPress = (str: string, key: readline.Key) => {
      if (key.name === 'up' || key.name === 'down' || key.name === 'left' || key.name === 'right' || key.name === 'return') {
        // Remove the event listener once an arrow key is pressed
        process.stdin.off('keypress', handleKeyPress);

        // Resolve the promise with the arrow key name
        resolve(key.name);
      }

      // Exit the process on 'ctrl + c'
      if (key.ctrl && key.name === 'c') {
        process.exit();
      }
    };

    // Add the event listener for keypress events
    process.stdin.on('keypress', handleKeyPress);
  });
}


function setUi() {
    console.clear();
  for (let i = 0; i < options.length; i++) {
    const prefix = (i === selectedIndex) ? chalk.blue('> ') : '  ';
    const option = (i === selectedIndex) ? chalk.inverse(options[i]) : options[i];
    console.log(prefix + option);
  }
  getKey();
}

function getKey() {
  //while(true) {
    (async () => {
    console.log('Press an arrow key:');
    const key = await waitForArrowKey();
    console.log(`You pressed the '${key}'  key.`);


    switch (key) {
        case 'up':
        selectedIndex = Math.max(selectedIndex - 1, 0);
        break;
        case 'down':
        selectedIndex = Math.min(selectedIndex + 1, options.length - 1);
        break;
        case 'return':
        console.log('Performing action for', options[selectedIndex]);
        browsePage(options[selectedIndex])
        return;
    }
    setUi();

    //process.exit();
    })();
  }
  

/*async function getElementUnderPixel(x: number, y: number) {
    const driver = await new Builder().forBrowser('chrome').build();
  
    try {
      await driver.get('https://www.amascaro.com');
  
      // Inject JavaScript to get the element under the specified pixel
      /*const element = await driver.executeScript<WebElement | null>(`
        const x = arguments[0];
        const y = arguments[1];
        return document.elementFromPoint(x, y);
      `, x, y);
  
      if (element) {
        console.log(`Element under pixel (${x}, ${y}):`, await element.getTagName(), await element.getText());
        await element.click();
      } else {
        console.log(`No element found under pixel (${x}, ${y})`);
      }
    } finally {
     // await driver.quit();
    }

    
    // Find all the links on the page
    const links = await driver.findElements(By.css('a'));

    // Extract the href attribute from each link
    const hrefs = await Promise.all(links.map(async (link) => {
        return await link.getAttribute('href');
    }));

    console.log(hrefs);

    // Close the web browser
    await driver.quit();
  }
  finally {}
}
  
  // Specify the x and y coordinates of the pixel
  const x = 270;
  const y = 373;
  //document.elementFromPoint(270, 373);
  getElementUnderPixel(x, y);

/*
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
*/
