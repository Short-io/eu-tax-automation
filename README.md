### Send Stripe transactions to EU Cyprus tax office using MOSS scheme

Our company needs to pay taxes in EU and works on automation this process. This is WIP set of scripts to send tax report to [Cyprus Tax Portal](https://tax-oss.mof.gov.cy/vat-return)

### Prerequisites

You need to have:
1. Node.js to run mjs files

### Run

Set the required environment variables and run:

```
STRIPE_KEY=rk_live_XXXXXXXXXXXXX REPORT_ID=12345 ACCESS_TOKEN=<JWT_TOKEN> ./report.mjs
```

**Required environment variables:**
- `STRIPE_KEY`: Stripe restricted key with permissions to generate reports and download files
- `REPORT_ID`: Your tax report ID. You can get in from the URL: https://tax-oss.mof.gov.cy/vat-return/view/12345
- `ACCESS_TOKEN`: JWT token for Cyprus Tax Portal authentication. You need to use browser developer tools to extract x-access-token header from any authorized request

Expected output:
```
{
  status: 'SUCCESS',
  data: null,
  message: 'Vat Return saved temporary successfuly'
}
```
