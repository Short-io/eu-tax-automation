#!/usr/bin/env node

import { parseArgs } from 'node:util';
import { spawn } from 'child_process';
import { exportReport } from './export.mjs';

const SUPPORTED_REGIONS = ['EU', 'AU', 'CA', 'UK'];

const { values: opts, positionals } = parseArgs({
  options: {
    year: { type: 'string', short: 'y' },
    quarter: { type: 'string', short: 'q' },
    'month-shift': { type: 'string', short: 'm' },
    help: { type: 'boolean', short: 'h' },
  },
  allowPositionals: true,
});

const regions = positionals.map(r => r.toUpperCase());

if (opts.help || regions.length === 0) {
  console.error('Usage: ./report.mjs [options] <region> [region...]');
  console.error('');
  console.error('Regions: EU, AU, CA, UK');
  console.error('');
  console.error('Options:');
  console.error('  -y, --year <year>      Tax year (e.g. 2025)');
  console.error('  -q, --quarter <1-4>    Tax quarter (1-4)');
  console.error('  -m, --month-shift <0-2>  Month shift added to end of quarter (default: 0)');
  console.error('  -h, --help             Show this help');
  console.error('');
  console.error('Defaults to the previous quarter if --year and --quarter are not specified.');
  process.exit(opts.help ? 0 : 1);
}

if (regions.some(r => !SUPPORTED_REGIONS.includes(r))) {
  console.error(`Error: unsupported region(s): ${regions.filter(r => !SUPPORTED_REGIONS.includes(r)).join(', ')}`);
  console.error(`Supported regions: ${SUPPORTED_REGIONS.join(', ')}`);
  process.exit(1);
}

const year = opts.year ? parseInt(opts.year, 10) : undefined;
const quarter = opts.quarter ? parseInt(opts.quarter, 10) : undefined;
const monthShift = opts['month-shift'] ? parseInt(opts['month-shift'], 10) : 0;

if ((year !== undefined) !== (quarter !== undefined)) {
  console.error('Error: --year and --quarter must be specified together');
  process.exit(1);
}

if (quarter !== undefined && (quarter < 1 || quarter > 4 || !Number.isInteger(quarter))) {
  console.error('Error: --quarter must be between 1 and 4');
  process.exit(1);
}

if (year !== undefined && (isNaN(year) || year < 2000)) {
  console.error('Error: --year must be a valid year (>= 2000)');
  process.exit(1);
}

if (monthShift < 0 || monthShift > 2 || !Number.isInteger(monthShift)) {
  console.error('Error: --month-shift must be 0, 1, or 2');
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
    await exportReport({ year, quarter, monthShift });

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
