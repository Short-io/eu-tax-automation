import { UTCDate } from "@date-fns/utc";
import { addMonths, endOfQuarter, startOfQuarter, subMonths, getUnixTime } from 'date-fns';
import { writeFileSync } from 'fs';
import Stripe from 'stripe';

export async function exportReport({ year, quarter, monthShift = 0 } = {}) {
	let sq, eq;
	if (year !== undefined && quarter !== undefined) {
		sq = new UTCDate(year, (quarter - 1) * 3, 1);
		eq = addMonths(endOfQuarter(sq), monthShift);
	} else {
		sq = startOfQuarter(subMonths(new UTCDate(), 3));
		eq = addMonths(endOfQuarter(subMonths(new UTCDate(), 3)), monthShift);
	}

	console.log(`Report period: ${sq.toISOString().slice(0, 10)} to ${eq.toISOString().slice(0, 10)}`);
	console.log('Creating tax report...');
	const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
	if (!stripeSecretKey) {
		console.error('STRIPE_SECRET_KEY environment variable is required');
		process.exit(1);
	}

	const stripe = new Stripe(stripeSecretKey);

	const pendingReportInfo = await stripe.reporting.reportRuns.create({
		report_type: 'tax.filing.itemized.3',
		parameters: {
			interval_end: getUnixTime(eq),
			interval_start: getUnixTime(sq)
		}
	});

	console.log('Waiting for report to complete...');
	let reportInfo
	while (true) {
		reportInfo = await stripe.reporting.reportRuns.retrieve(pendingReportInfo.id);
		console.log(`Report status: ${reportInfo.status}`);
		if (reportInfo.status === "succeeded") {
			break;
		}
		await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before checking again
	}

	console.log('Downloading report...');

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
}
