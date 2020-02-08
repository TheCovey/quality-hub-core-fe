export const isPast = ({ year, month, day, hour, minute }) => {
	const now = new Date();
	const currentYr = now.getFullYear();
	const currentMonth = now.getMonth() + 1;
	const currentDay = now.getDate();
	const currentHr = now.getHours();
	const currentMin = now.getMinutes();

	return year > currentYr
		? false
		: year === currentYr && month > currentMonth
		? false
		: year === currentYr && month === currentMonth && day > currentDay
		? false
		: year === currentYr &&
		  month === currentMonth &&
		  day === currentDay &&
		  hour > currentHr
		? false
		: year === currentYr &&
		  month === currentMonth &&
		  day === currentDay &&
		  hour === currentHr &&
		  minute > currentMin
		? false
		: true;
};
