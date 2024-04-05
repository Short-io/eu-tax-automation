#!env zx
import { UTCDate } from "@date-fns/utc";
import { endOfQuarter, startOfQuarter, subMonths, getUnixTime } from 'date-fns';
const sq = startOfQuarter(subMonths(new UTCDate(), 3))
const eq = endOfQuarter(subMonths(new UTCDate(), 3))
await $`stripe reporting report_runs create --report-type=tax.filing.itemized.3 --parameters.interval-end=${getUnixTime(eq)} --parameters.interval-start=${getUnixTime(sq)}`
