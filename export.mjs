#!/usr/bin/env zx
import { UTCDate } from "@date-fns/utc";
import { endOfQuarter, startOfQuarter, subMonths, getUnixTime } from 'date-fns';
import { writeFileSync } from 'fs';

const sq = startOfQuarter(subMonths(new UTCDate(), 3))
const eq = endOfQuarter(subMonths(new UTCDate(), 3))

console.log('Creating tax report...');
const pendingReportInfo = JSON.parse(await $`stripe reporting report_runs create --live --report-type=tax.filing.itemized.3 --parameters.interval-end=${getUnixTime(eq)} --parameters.interval-start=${getUnixTime(sq)}`)

console.log('Waiting for report to complete...');
let reportInfo
while (true) {
	reportInfo = JSON.parse(await $`stripe reporting report_runs retrieve --live ${pendingReportInfo.id}`)
	console.log(`Report status: ${reportInfo.status}`)
	if (reportInfo.status === "succeeded") {
		break;
	}
	await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before checking again
}

console.log('Downloading report...');
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
	console.error('STRIPE_SECRET_KEY environment variable is required');
	process.exit(1);
}

const response = await fetch(reportInfo.result.url, {
	headers: {
		'Authorization': `Bearer ${stripeSecretKey}`
	}
});

if (!response.ok) {
	console.error(`Failed to download report: ${response.status} ${response.statusText}`);
	process.exit(1);
}

const csvData = await response.text();
writeFileSync('output.csv', csvData);
console.log('Report downloaded successfully to output.csv');
