import * as readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  let selectedIndex = 0;

  while (true) {
    // Print the options
    console.clear();
    for (let i = 0; i < options.length; i++) {
      const prefix = (i === selectedIndex) ? chalk.green('> ') : '  ';
      console.log(prefix + options[i]);
    }

    // Wait for input from the user
    const key = await new Promise<string>((resolve) => {
      rl.on('keypress', (_, key) => {
        resolve(key.name);
      });
    });

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
        return;
    }
  }
}

main().catch((error) => {
  console.error(error);
});
