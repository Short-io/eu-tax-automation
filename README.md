### Send Stripe transactions to EU Cyprus tax office using MOSS scheme

Our company needs to pay taxes in EU and works on automation this process. This is WIP set of scripts to send tax report to [Cyprus Tax Portal](https://tax-oss.mof.gov.cy/vat-return)

### Run

```
zx export.mjs
# TODO - download exported report
# TODO - populate values in eu.hurl
# TODO - sign in to VAT tax office
HURL_report_id=12345 HURL_access_token=<JWT_TOKEN> hurl eu.hurl
```
