import React, { useState, useEffect } from 'react';
import {
	format,
	isSameMonth,
	isSameDay,
	toDate,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	addDays,
	startOfMonth,
	getDate,
	getMonth,
	isBefore,
	isAfter,
	getYear,
	getHours,
	getMinutes,
	formatDistanceStrict
} from 'date-fns';
import { convertToLocal } from '../../../global/utils/TZHelpers';

const SmallCells = ({
	onDateClick,
	currentMonth,
	selectedDate,
	availabilities,
}) => {
	const [allTheAvails, setAllTheAvails] = useState();
	let integerMonth = getMonth(currentMonth) + 1;
	let integerYear = getYear(currentMonth);
	const monthStart = startOfMonth(currentMonth);
	const monthEnd = endOfMonth(monthStart);
	const startDate = startOfWeek(monthStart);

	const endDate = endOfWeek(monthEnd);
	const dateFormat = 'd';
	const rows = [];
	let days = [];
	let day = startDate;
	let formattedDate = '';
	let cellId = '';

	const getAvailableSlots = dateAvails => {
		let bookingArray = [];
		for (let x = 0; x < dateAvails.length; x++) {
			for (let y = 0; y < dateAvails.length; y++) {
				let date1 = new Date(
					dateAvails[x].year,
					dateAvails[x].month - 1,
					dateAvails[x].day,
					dateAvails[x].hour,
					dateAvails[x].minute,
					0,
				);
				let date2 = new Date(
					dateAvails[y].year,
					dateAvails[y].month - 1,
					dateAvails[y].day,
					dateAvails[y].hour,
					dateAvails[y].minute,
					0,
				);
				let distanceInMinutes = formatDistanceStrict(date1, date2, {
					unit: 'minute',
				});
				if (distanceInMinutes === '30 minutes') {
					if (isBefore(date1, date2)) {
						bookingArray.push(dateAvails[x])
						break;
					}
				}
			}
		}
		setAllTheAvails(bookingArray);
	};

	useEffect(() => {
		if (availabilities) {
			let someArray = availabilities.availabilitiesByCoach
				.map(avail => convertToLocal(avail))
				.filter(avail => avail.isOpen === true);
			getAvailableSlots(someArray);
		}
	}, [availabilities, currentMonth]);

	const availsExist = someDate => {
		let currentHour = getHours(new Date());
		let currentMin = getMinutes(new Date());
		let currentDay = format(new Date(), 'Mdyyyy');
		let availDay = format(someDate, 'Mdyyyy');
		let integerDate = getDate(someDate);
		let match = false;

		if (allTheAvails) {
			for (let i = 0; i < allTheAvails.length; i++) {
				if (
					currentDay === availDay &&
					currentDay ===
						`${allTheAvails[i].month}${allTheAvails[i].day}${allTheAvails[i].year}`
				) {
					if (allTheAvails[i].hour >= currentHour) {
						if (
							(allTheAvails[i].hour === currentHour &&
								allTheAvails[i].minute > currentMin) ||
							allTheAvails[i].hour > currentHour
						) {
							match = true;
							break;
						}
					}
				} else if (
					allTheAvails[i].year === integerYear &&
					allTheAvails[i].month === integerMonth &&
					allTheAvails[i].day === integerDate
				) {
					match = true;
					break;
				}
			}
			return match;
		}
	};

	while (day <= endDate) {
		for (let i = 0; i < 7; i++) {
			formattedDate = format(day, dateFormat);
			cellId = format(day, 'Md');
			const cloneDay = day;
			days.push(
				<div
					id={cellId}
					className={`small-col  ${
						isBefore(addDays(day, 1), new Date()) ? 'past-day' : isSameMonth(day, monthStart) ? 'small-cell' : 'small-cell-disabled'
					} ${format(day, 'Mdyyyy') === format(new Date(), 'Mdyyyy') ? 'today' : ' '}`}
					key={day}
					onClick={() => onDateClick(toDate(cloneDay))}>
					<div
						className={`${
							!isSameMonth(day, monthStart)
								? 'disabled'
								: isSameDay(day, selectedDate)
								? 'small-selected'
								: availsExist(day) && isAfter(addDays(day, 1), new Date())
								? 'match-light-blue'
								: ''
						}`}>
						<p>{formattedDate}</p>
					</div>
				</div>,
			);
			day = addDays(day, 1);
		}
		rows.push(
			<div className='row' key={day}>
				{days}
			</div>,
		);
		days = [];
	}

	return (
		<>
			<div className='calendar-body'>{rows}</div>
		</>
	);
};

export default SmallCells;
