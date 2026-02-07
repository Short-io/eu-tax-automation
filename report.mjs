#!/usr/bin/env node

import { spawn } from 'child_process';
import { exportReport } from './export.mjs';

const regions = process.argv.slice(2);

if (regions.length === 0) {
  console.error('Usage: node report.mjs <region> [region...]');
  console.error('Supported regions: EU, AU, CA, UK');
  process.exit(1);
}

const execCommand = (command, args) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
};

async function main() {
  try {
    // Call exportReport function from export.mjs
    await exportReport();

    // Then run process.mjs with the selected regions
    console.log(`Running process.mjs for regions: ${regions.join(', ')}...`);
    await execCommand('node', ['process.mjs', ...regions]);

    console.log('All processes completed successfully!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
