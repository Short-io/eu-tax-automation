#!/usr/bin/env zx
import { UTCDate } from "@date-fns/utc";
import { endOfQuarter, startOfQuarter, subMonths, getUnixTime } from 'date-fns';
const sq = startOfQuarter(subMonths(new UTCDate(), 3))
const eq = endOfQuarter(subMonths(new UTCDate(), 3))
const pendingReportInfo = JSON.parse(await $`stripe reporting report_runs create --live --report-type=tax.filing.itemized.3 --parameters.interval-end=${getUnixTime(eq)} --parameters.interval-start=${getUnixTime(sq)}`)
const reportInfo = JSON.parse(await $`stripe reporting report_runs retrieve --live ${pendingReportInfo.id}`)
console.log(`Now you need to run curl -H 'Authorization: Bearer rk_live_XXXXXXXXXXXXX' ${reportInfo.result.url} > output.csv`);
