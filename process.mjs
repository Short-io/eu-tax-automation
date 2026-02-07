#!/usr/bin/env node

import { spawn } from 'child_process';
import fs from 'fs';

const SUPPORTED_REGIONS = ['EU', 'AU', 'CA', 'UK'];
const regions = process.argv.slice(2).map(r => r.toUpperCase());

if (regions.length === 0 || regions.some(r => !SUPPORTED_REGIONS.includes(r))) {
  console.error(`Usage: node process.mjs <region> [region...]`);
  console.error(`Supported regions: ${SUPPORTED_REGIONS.join(', ')}`);
  process.exit(1);
}

// EU portal upload requires these env vars
if (regions.includes('EU') && (!process.env.RETURN_ID || !process.env.ACCESS_TOKEN)) {
  console.error('Error: RETURN_ID and ACCESS_TOKEN environment variables are required for EU report');
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
  'country_code,state_code,filing_total_taxable_sales,filing_tax_payable,filing_total_sales_refunded',
  'then',
  'filter',
  '$filing_total_taxable_sales>0',
  'then',
  'stats1',
  '-f',
  'filing_total_taxable_sales,filing_tax_payable,filing_total_sales_refunded',
  '-g',
  'country_code,state_code',
  '-a',
  'sum',
  'output.csv'
]);

const res = JSON.parse(mlrOutput);

const round2 = (n) => Math.round(n * 100) / 100;
const netTaxable = (el) => round2(el.filing_total_taxable_sales_sum + (el.filing_total_sales_refunded_sum || 0));

// ---- EU Report ----

if (regions.includes('EU')) {
  const EU_COUNTRIES = [
    { code: 'AT', name: 'Austria', consumer_id: 17, vat_rate_id: 190, vat_rate: 20 },
    { code: 'BE', name: 'Belgium', consumer_id: 24, vat_rate_id: 191, vat_rate: 21 },
    { code: 'BG', name: 'Bulgaria', consumer_id: 37, vat_rate_id: 192, vat_rate: 20 },
    { code: 'HR', name: 'Croatia', consumer_id: 60, vat_rate_id: 187, vat_rate: 25 },
    { code: 'CY', name: 'Cyprus', consumer_id: 62, vat_rate_id: 271, vat_rate: 19 },
    { code: 'CZ', name: 'Czech Republic', consumer_id: 63, vat_rate_id: 193, vat_rate: 21 },
    { code: 'DK', name: 'Denmark', consumer_id: 64, vat_rate_id: 195, vat_rate: 25 },
    { code: 'EE', name: 'Estonia', consumer_id: 73, vat_rate_id: 299, vat_rate: 22 },
    { code: 'FI', name: 'Finland', consumer_id: 78, vat_rate_id: 197, vat_rate: 24 },
    { code: 'FR', name: 'France', consumer_id: 79, vat_rate_id: 220, vat_rate: 20 },
    { code: 'DE', name: 'Germany', consumer_id: 86, vat_rate_id: 199, vat_rate: 19 },
    { code: 'GR', name: 'Greece', consumer_id: 89, vat_rate_id: 225, vat_rate: 24 },
    { code: 'HU', name: 'Hungary', consumer_id: 103, vat_rate_id: 201, vat_rate: 27 },
    { code: 'IE', name: 'Ireland', consumer_id: 109, vat_rate_id: 202, vat_rate: 23 },
    { code: 'IT', name: 'Italy', consumer_id: 112, vat_rate_id: 203, vat_rate: 22 },
    { code: 'LT', name: 'Lithuania', consumer_id: 131, vat_rate_id: 205, vat_rate: 21 },
    { code: 'MT', name: 'Malta', consumer_id: 139, vat_rate_id: 207, vat_rate: 18 },
    { code: 'NL', name: 'Netherlands', consumer_id: 158, vat_rate_id: 208, vat_rate: 21 },
    { code: 'PL', name: 'Poland', consumer_id: 179, vat_rate_id: 254, vat_rate: 23 },
    { code: 'PT', name: 'Portugal', consumer_id: 180, vat_rate_id: 210, vat_rate: 23 },
    { code: 'RO', name: 'Romania', consumer_id: 184, vat_rate_id: 211, vat_rate: 19 },
    { code: 'ES', name: 'Spain', consumer_id: 209, vat_rate_id: 214, vat_rate: 21 },
    { code: 'SE', name: 'Sweden', consumer_id: 215, vat_rate_id: 215, vat_rate: 25 },
    { code: 'LV', name: 'Latvia', consumer_id: 125, vat_rate_id: 204, vat_rate: 21 },
  ];

  const euCodes = new Set(EU_COUNTRIES.map(c => c.code));
  const euData = res.filter(el => euCodes.has(el.country_code));
  const resMap = Object.fromEntries(euData.map(el => [el.country_code, netTaxable(el)]));
  const vatMap = Object.fromEntries(euData.map(el => [el.country_code, el.filing_tax_payable_sum]));

  const taxJSON = {
    supplies_from_member_state_of_identification: EU_COUNTRIES
      .map(country => ({
        vat_return_supply_id: 0,
        supply_type: "SERVICES",
        supply_type_id: 2,
        consumer_id: country.consumer_id,
        consumer: country.name,
        vat_rate_id: country.vat_rate_id,
        vat_rate: country.vat_rate,
        vat_rate_type: "Standard VAT Rate",
        taxable_amount: resMap[country.code],
        vat_amount: vatMap[country.code],
        vat_code: "STANDARD"
      }))
      .filter(el => el.taxable_amount),
    supplies_from_fixed_establishments: [],
    vat_corrections: []
  };

  fs.writeFileSync('eu-tax-report.json', JSON.stringify(taxJSON, null, 2));
  console.log('EU tax report saved to eu-tax-report.json');

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
  console.log('EU portal upload response:', await uploadRes.json());
}

// ---- AU Report (country-level GST) ----

if (regions.includes('AU')) {
  const auData = res.filter(el => el.country_code === 'AU');
  if (auData.length > 0) {
    const auReport = {
      region: 'AU',
      currency: 'AUD',
      total_taxable_amount: round2(auData.reduce((sum, el) => sum + netTaxable(el), 0)),
      total_tax_payable: round2(auData.reduce((sum, el) => sum + el.filing_tax_payable_sum, 0)),
    };
    fs.writeFileSync('au-tax-report.json', JSON.stringify(auReport, null, 2));
    console.log('AU tax report saved to au-tax-report.json');
  } else {
    console.log('No AU tax data found in report');
  }
}

// ---- CA Report (provincial breakdown) ----

if (regions.includes('CA')) {
  const caData = res.filter(el => el.country_code === 'CA');
  if (caData.length > 0) {
    const caReport = {
      region: 'CA',
      currency: 'CAD',
      provinces: caData
        .map(el => ({
          province: el.state_code,
          taxable_amount: netTaxable(el),
          tax_payable: round2(el.filing_tax_payable_sum),
        }))
        .filter(el => el.taxable_amount),
      total_taxable_amount: round2(caData.reduce((sum, el) => sum + netTaxable(el), 0)),
      total_tax_payable: round2(caData.reduce((sum, el) => sum + el.filing_tax_payable_sum, 0)),
    };
    fs.writeFileSync('ca-tax-report.json', JSON.stringify(caReport, null, 2));
    console.log('CA tax report saved to ca-tax-report.json');
  } else {
    console.log('No CA tax data found in report');
  }
}

// ---- UK Report (country-level VAT) ----

if (regions.includes('UK')) {
  const gbData = res.filter(el => el.country_code === 'GB');
  if (gbData.length > 0) {
    const gbReport = {
      region: 'GB',
      currency: 'GBP',
      total_taxable_amount: round2(gbData.reduce((sum, el) => sum + netTaxable(el), 0)),
      total_tax_payable: round2(gbData.reduce((sum, el) => sum + el.filing_tax_payable_sum, 0)),
    };
    fs.writeFileSync('uk-tax-report.json', JSON.stringify(gbReport, null, 2));
    console.log('UK tax report saved to uk-tax-report.json');
  } else {
    console.log('No UK tax data found in report');
  }
}
