### Send Stripe transactions to EU Cyprus tax office using MOSS scheme

Our company needs to pay taxes in EU and works on automation this process. This is WIP set of scripts to send tax report to [Cyprus Tax Portal](https://tax-oss.mof.gov.cy/vat-return)

### Prerequisites

You need to have: 
1. zx (https://google.github.io/zx/cli) to run mjs files
2. miller (https://miller.readthedocs.io/en/6.12.0/) for CSV processing
3. stripe cli (https://github.com/stripe/stripe-cli)

### Run

```
> ./export.mjs
Now you need to run curl -H 'Authorization: Bearer rk_live_XXXXXXXXXXXXX' https://files.stripe.com/XXXXXXXXXX > output.csv
> curl -H 'Authorization: Bearer rk_live_XXXXXXXXXXXXX' https://files.stripe.com/XXXXXXXXXX > output.csv
> REPORT_ID=12345 ACCESS_TOKEN=<JWT_TOKEN> ./process.mjs
{
  status: 'SUCCESS',
  data: null,
  message: 'Vat Return saved temporary successfuly'
}
```
