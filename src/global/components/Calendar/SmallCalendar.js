import React, { useState } from 'react';
import '../Dashboard/subs/Schedule/Calendar.scss';
import {
	setMonth,
	getMonth,
	getYear,
	addMonths,
	subMonths,
	isBefore,
	getDate,
	isAfter,
} from 'date-fns';

import { nextArrow } from '../../icons/nextArrow';
import { backArrow } from '../../icons/backArrow';

import SmallCells from './SmallCells';

import { days, months, years } from '../../utils/TimeArrays';

const SmallCalendar = ({
	selectedCell,
	setSelectedCell,
	availabilities,
	refetchAvails,
}) => {
	const [currentMonth, setCurrentMonth] = useState(new Date());

	const nextMonth = () => {
		setSelectedCell(addMonths(currentMonth, 1));
		setCurrentMonth(addMonths(currentMonth, 1));
	};
	const lastMonth = () => {
		if (isAfter(currentMonth, new Date())) {
			setSelectedCell(subMonths(currentMonth, 1));
			setCurrentMonth(subMonths(currentMonth, 1));
		}
	};

	const onDateClick = day => {
		if (isBefore(new Date(), day) || getDate(new Date()) === getDate(day)) {
			setSelectedCell(day);
		}
	};

	// useEffect(()=>{
	// 	setOpen(true);
	// },[selectedCell])

	const onMonthChange = e => {
		const year = getYear(new Date(currentMonth));
		if (isAfter(new Date(year, e.target.value, 1), new Date())) {
			setSelectedCell(
				setMonth(new Date(year, 1, getDate(new Date())), e.target.value),
			);
			setCurrentMonth(
				setMonth(new Date(year, 1, getDate(new Date())), e.target.value),
			);
			// if (format(currentMonth, 'Myyyy') === format(new Date(), 'Myyyy')) {
			// 	// setSelectedCell(new Date());
			// 	//setSelectedCell(new Date(year, e.target.value, 1))
			// }
		}
	};

	const onYearChange = e => {
		const month = getMonth(new Date(currentMonth));
		if (isAfter(new Date(e.target.value, month, 31), new Date())) {
			setSelectedCell(
				setMonth(new Date(e.target.value, 1, getDate(new Date())), month),
			);
			setCurrentMonth(
				setMonth(new Date(e.target.value, 1, getDate(new Date())), month),
			);
		}
	};

	return (
		<div className='small-calendar-container'>
			<div className='calendar'>
				<header className='calendar-header'>
					<div className='cal-header row flex-middle'>
						<div className='col col-start'></div>
						<div className='col small-calendar-select'>
							<div className='cal-arrow-container'>
								<button
									className='calendar-button back-arrow'
									onClick={lastMonth}>
									{backArrow()}
								</button>
								<button
									className='calendar-button next-arrow'
									onClick={nextMonth}>
									{nextArrow()}
								</button>
							</div>
							<select
								onChange={e => onMonthChange(e)}
								value={getMonth(new Date(currentMonth))}>
								{months.map(month => {
									return (
										<option key={month.num} value={month.num}>
											{month.name}
										</option>
									);
								})}
							</select>
							<select
								onChange={e => onYearChange(e)}
								value={getYear(new Date(currentMonth))}>
								{years.map(year => {
									return (
										<option key={year} value={year}>
											{year}
										</option>
									);
								})}
							</select>
						</div>
					</div>
				</header>

				<div className='calendar-days'>
					<div className='small-days row'>
						{days.map(day => {
							return (
								<div className='col small-col-center small-cal' key={day}>
									<p>{day}</p>
								</div>
							);
						})}
					</div>
				</div>

				<div className='calendar-cells'></div>
				<SmallCells
					refetchAvails={refetchAvails}
					availabilities={availabilities}
					onDateClick={onDateClick}
					currentMonth={currentMonth}
					selectedDate={selectedCell}
				/>
			</div>
		</div>
	);
};

export default SmallCalendar;
