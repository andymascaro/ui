import { Builder, By, Key, until } from "selenium-webdriver";
import * as fs from 'fs';
import "chromedriver";
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const driver = new Builder().forBrowser("chrome").build();

async function openGoogle() {

  try {
    await driver.get('https://www.amascaro.com');
  } finally {
    // Uncomment the line below if you want to close the browser after running the script
    // await driver.quit();
    driver.takeScreenshot().then((data: string) => {
        fs.writeFileSync('example.png', data, 'base64');
    });
  }
}

openGoogle();


async function main() {
    console.log('Press Enter to exit.');
  
    const myPromise: Promise<void> = new Promise((resolve) => {
      rl.on('line', () => {
            driver.quit();
            resolve();
            process.exit();
      });
    });
  
    await myPromise;
  }
  
main();