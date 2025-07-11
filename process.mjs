#!/usr/bin/env node

import { spawn } from 'child_process';
import fs from 'fs';

// Check for required environment variables
const requiredEnvVars = ['RETURN_ID', 'ACCESS_TOKEN'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error(`Error: Missing required environment variables: ${missingEnvVars.join(', ')}`);
  console.error('Please set the following environment variables:');
  missingEnvVars.forEach(varName => {
    console.error(`  ${varName}=<your_value>`);
  });
  process.exit(1);
}

// Check if output.csv file exists
if (!fs.existsSync('output.csv')) {
  console.error('Error: output.csv file not found');
  console.error('Please ensure the output.csv file exists in the current directory');
  process.exit(1);
}

const execCommand = (command, args) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'pipe' });
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => {
      stdout += data;
    });
    
    child.stderr.on('data', (data) => {
      stderr += data;
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(`Command failed with exit code ${code}: ${stderr}`));
      }
    });
    
    child.on('error', (error) => {
      reject(error);
    });
  });
};

const mlrOutput = await execCommand('mlr', [
  '--icsv',
  '--ojson',
  'cut',
  '-f',
  'country_code,filing_currency,filing_total_taxable_sales,filing_tax_payable',
  'then',
  'filter',
  '$filing_total_taxable_sales>0',
  'then',
  'stats1',
  '-f',
  'filing_total_taxable_sales,filing_tax_payable',
  '-g',
  'country_code',
  '-a',
  'sum',
  'output.csv'
]);

const res = JSON.parse(mlrOutput);
const resMap = Object.fromEntries(res.map(el => [el.country_code, el.filing_total_taxable_sales_sum]))
const vatMap = Object.fromEntries(res.map(el => [el.country_code, el.filing_tax_payable_sum]))
const taxJSON = {
  "supplies_from_member_state_of_identification": [
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 17,
      "consumer": "Austria",
      "vat_rate_id": 190,
      "vat_rate": 20,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["AT"],
      "vat_amount": vatMap["AT"],
      "vat_code": "STANDARD"
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 24,
      "consumer": "Belgium",
      "vat_rate_id": 191,
      "vat_rate": 21,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["BE"],
      "vat_amount": vatMap["BE"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 37,
      "consumer": "Bulgaria",
      "vat_rate_id": 192,
      "vat_rate": 20,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["BG"],
      "vat_amount": vatMap["BG"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 60,
      "consumer": "Croatia",
      "vat_rate_id": 187,
      "vat_rate": 25,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["HR"],
      "vat_amount": vatMap["HR"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 62,
      "consumer": "Cyprus",
      "vat_rate_id": 271,
      "vat_rate": 19,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["CY"],
      "vat_amount": vatMap["CY"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 63,
      "consumer": "Czech Republic",
      "vat_rate_id": 193,
      "vat_rate": 21,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["CZ"],
      "vat_amount": vatMap["CZ"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 64,
      "consumer": "Denmark",
      "vat_rate_id": 195,
      "vat_rate": 25,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["DK"],
      "vat_amount": vatMap["DK"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 73,
      "consumer": "Estonia",
      "vat_rate_id": 299,
      "vat_rate": 22,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["EE"],
      "vat_amount": vatMap["EE"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 78,
      "consumer": "Finland",
      "vat_rate_id": 197,
      "vat_rate": 24,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["FI"],
      "vat_amount": vatMap["FI"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 79,
      "consumer": "France",
      "vat_rate_id": 220,
      "vat_rate": 20,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["FR"],
      "vat_amount": vatMap["FR"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 86,
      "consumer": "Germany",
      "vat_rate_id": 199,
      "vat_rate": 19,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["DE"],
      "vat_amount": vatMap["DE"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 89,
      "consumer": "Greece",
      "vat_rate_id": 225,
      "vat_rate": 24,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["GR"],
      "vat_amount": vatMap["GR"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 103,
      "consumer": "Hungary",
      "vat_rate_id": 201,
      "vat_rate": 27,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["HU"],
      "vat_amount": vatMap["HU"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 109,
      "consumer": "Ireland",
      "vat_rate_id": 202,
      "vat_rate": 23,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["IE"],
      "vat_amount": vatMap["IE"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 112,
      "consumer": "Italy",
      "vat_rate_id": 203,
      "vat_rate": 22,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["IT"],
      "vat_amount": vatMap["IT"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 131,
      "consumer": "Lithuania",
      "vat_rate_id": 205,
      "vat_rate": 21,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["LT"],
      "vat_amount": vatMap["LT"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 139,
      "consumer": "Malta",
      "vat_rate_id": 207,
      "vat_rate": 18,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["MT"],
      "vat_amount": vatMap["MT"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 158,
      "consumer": "Netherlands",
      "vat_rate_id": 208,
      "vat_rate": 21,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["NL"],
      "vat_amount": vatMap["NL"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 179,
      "consumer": "Poland",
      "vat_rate_id": 254,
      "vat_rate": 23,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["PL"],
      "vat_amount": vatMap["PL"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 180,
      "consumer": "Portugal",
      "vat_rate_id": 210,
      "vat_rate": 23,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["PT"],
      "vat_amount": vatMap["PT"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 184,
      "consumer": "Romania",
      "vat_rate_id": 211,
      "vat_rate": 19,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["RO"],
      "vat_amount": vatMap["RO"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 209,
      "consumer": "Spain",
      "vat_rate_id": 214,
      "vat_rate": 21,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["ES"],
      "vat_amount": vatMap["ES"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 215,
      "consumer": "Sweden",
      "vat_rate_id": 215,
      "vat_rate": 25,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["SE"],
      "vat_amount": vatMap["SE"],
    },
    {
      "vat_return_supply_id": 0,
      "supply_type": "SERVICES",
      "supply_type_id": 2,
      "consumer_id": 125,
      "consumer": "Latvia",
      "vat_rate_id": 204,
      "vat_rate": 21,
      "vat_rate_type": "Standard VAT Rate",
      "taxable_amount": resMap["LV"],
      "vat_amount": vatMap["LV"],
    }
  ].filter(el => el.taxable_amount),
  "supplies_from_fixed_establishments": [],
  "vat_corrections": []
}

const uploadRes = await fetch(`https://tax-oss.mof.gov.cy/api/vatreturn/${process.env.RETURN_ID}/save/temporary`, {
	method: 'PUT',
	headers: {
		'Accept': 'application/json, text/plain, */*',
		'Connection': 'keep-alive',
		'Referer': `https://tax-oss.mof.gov.cy/vat-return/edit/${process.env.RETURN_ID}`,
		'Content-Type': 'application/json',
		'Sec-Fetch-Dest': 'empty',
		'Sec-Fetch-Mode': 'cors',
		'Sec-Fetch-Site': 'same-origin',
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
		'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"macOS"',
		'x-access-token': process.env.ACCESS_TOKEN
	},
	body: JSON.stringify(taxJSON),
});

console.log(await uploadRes.json());
