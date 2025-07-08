#!/usr/bin/env node

import { spawn } from 'child_process';
import { exportReport } from './export.mjs';

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
    
    // Then run process.mjs using zx
    console.log('Running process.mjs...');
    await execCommand('zx', ['process.mjs']);
    
    console.log('All processes completed successfully!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();