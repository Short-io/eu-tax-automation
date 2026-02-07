## EU Tax Automation

Extracts Stripe transaction data and generates tax reports for EU, AU, CA, and UK jurisdictions. For EU, uploads directly to the [Cyprus Tax Portal](https://tax-oss.mof.gov.cy/vat-return) via the MOSS (Mini One Stop Shop) scheme.

### How it works

Three-stage ETL pipeline:

1. **export.mjs** — Calls the Stripe Reporting API to generate a `tax.filing.itemized.3` report for the previous quarter, polls until ready, downloads the CSV to `output.csv`.
2. **process.mjs** — Parses `output.csv`, groups transactions by country/state, sums taxable sales, tax payable, and refunds. Outputs per-region JSON reports. For EU, also uploads to the Cyprus Tax Portal API.
3. **report.mjs** — Orchestrator that runs export then process. Takes region arguments from CLI.

```
Stripe API → output.csv → {eu,au,ca,uk}-tax-report.json
                                ↓ (EU only)
                        Cyprus Tax Portal API
```

### Supported regions

| Region | Output file | Tax type | Breakdown |
|--------|------------|----------|-----------|
| EU | `eu-tax-report.json` | VAT (MOSS) | Per-country (24 EU member states) |
| AU | `au-tax-report.json` | GST | Country-level |
| CA | `ca-tax-report.json` | GST/HST/PST | Per-province |
| UK | `uk-tax-report.json` | VAT | Country-level |

### Prerequisites

- Node.js
- `npm install`

### Usage

```bash
# Full pipeline: export from Stripe + process into reports
STRIPE_SECRET_KEY=rk_live_XXX RETURN_ID=12345 ACCESS_TOKEN=<JWT> ./report.mjs EU AU CA UK

# Process only (if output.csv already exists)
node process.mjs EU AU CA UK

# Export only (fetches from Stripe, writes output.csv)
node export.mjs
```

You can pass any combination of regions: `EU`, `AU`, `CA`, `UK`.

### Environment variables

| Variable | Required for | Description |
|----------|-------------|-------------|
| `STRIPE_SECRET_KEY` | All regions (export step) | Stripe restricted key with report generation and file download permissions |
| `RETURN_ID` | EU only | VAT return ID from the Cyprus Tax Portal URL (`https://tax-oss.mof.gov.cy/vat-return/view/<ID>`) |
| `ACCESS_TOKEN` | EU only | JWT token for Cyprus Tax Portal authentication (extract `x-access-token` header from browser dev tools) |

### EU countries covered

AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IE, IT, LT, LV, MT, NL, PL, PT, RO, ES, SE

### Dependencies

- [stripe](https://www.npmjs.com/package/stripe) — Stripe API client
- [csv-parse](https://www.npmjs.com/package/csv-parse) — CSV parsing
- [date-fns](https://www.npmjs.com/package/date-fns) + [@date-fns/utc](https://www.npmjs.com/package/@date-fns/utc) — Quarter date calculations in UTC
