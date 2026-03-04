const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');
const chalk = require('chalk');

const base = path.join(__dirname, 'temp.js');

const getContent = () => `\n\r${process.argv[2] ?? ''}`;

async function start() {
  try {
    if (fsSync.existsSync(base)) {
      await fs.appendFile(path.join(base, 'logs.txt'), getContent());
      const data = await fs.readFile(path.join(base, 'logs.txt'), {
        encoding: 'utf-8',
      });
      console.log(chalk.bgRedBright(data));
    } else {
      await fs.mkdir(base);
      console.log('Folder created');
      await fs.writeFile(path.join(base, 'logs.txt'), process.argv[2] ?? '');
    }
  } catch (error) {
    console.log('error', error);
  }
}

start();
