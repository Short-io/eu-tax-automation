PUT https://tax-oss.mof.gov.cy/api/vatreturn/{{return_id}}/save/temporary
Accept: application/json, text/plain, */*
Connection: keep-alive
Referer: https://tax-oss.mof.gov.cy/vat-return/edit/12243
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36
sec-ch-ua: "Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "macOS"
x-access-token: {{access_token}}
{
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0,
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
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
      "taxable_amount": 0.0,
      "vat_amount": 0.0
    }
  ],
  "supplies_from_fixed_establishments": [],
  "vat_corrections": []
}

HTTP 200
