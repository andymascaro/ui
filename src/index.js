"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var chalk_1 = require("chalk");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var options, selectedIndex, i, prefix, key;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = ['Option 1', 'Option 2', 'Option 3'];
                    selectedIndex = 0;
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    // Print the options
                    console.clear();
                    for (i = 0; i < options.length; i++) {
                        prefix = (i === selectedIndex) ? chalk_1.default.green('> ') : '  ';
                        console.log(prefix + options[i]);
                    }
                    return [4 /*yield*/, new Promise(function (resolve) {
                            rl.on('keypress', function (_, key) {
                                resolve(key.name);
                            });
                        })];
                case 2:
                    key = _a.sent();
                    // Handle the input from the user
                    switch (key) {
                        case 'up':
                            selectedIndex = Math.max(selectedIndex - 1, 0);
                            break;
                        case 'down':
                            selectedIndex = Math.min(selectedIndex + 1, options.length - 1);
                            break;
                        case 'return':
                            console.log('Performing action for', options[selectedIndex]);
                            return [2 /*return*/];
                    }
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
}
main().catch(function (error) {
    console.error(error);
});
/*import { Builder, By, Key, until, WebElement } from "selenium-webdriver";
import * as fs from 'fs';
import "chromedriver";
import * as readline from 'readline';


async function getElementUnderPixel(x: number, y: number) {
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
  
main();*/ 
