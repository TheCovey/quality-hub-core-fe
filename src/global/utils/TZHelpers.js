import { format } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

export const convertToLocal = obj => {
	const localTime = Intl.DateTimeFormat().resolvedOptions().timeZone;
	let rawDate = new Date(
		Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute),
	);
	let rawIso = rawDate.toISOString();
	let zoned = utcToZonedTime(rawIso, localTime);
	let zonedArr = format(zoned, 'yyyy M d H mm').split(' ');
	let zonedDate = {
		...obj,
		year: Number(zonedArr[0]),
		month: Number(zonedArr[1]),
		day: Number(zonedArr[2]),
		hour: Number(zonedArr[3]),
		minute: Number(zonedArr[4]),
	};
	return zonedDate;
};

export const convertToUTC = obj => {
	const localTime = Intl.DateTimeFormat().resolvedOptions().timeZone;
	let localAvail = new Date(
		obj.year,
		obj.month - 1,
		obj.day,
		obj.hour,
		obj.minute,
	);
	let utc = zonedTimeToUtc(localAvail, localTime);
	let utcArr = utc.toISOString().split(/[T:-]/g);
	let UTCdate = {
		...obj,
		year: Number(utcArr[0]),
		month: Number(utcArr[1]),
		day: Number(utcArr[2]),
		hour: Number(utcArr[3]),
		minute: Number(utcArr[4]),
	};
	return UTCdate;
};
