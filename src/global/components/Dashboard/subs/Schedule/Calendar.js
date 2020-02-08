import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Calendar.scss';
import { setMonth, getMonth, getYear, addMonths, subMonths, format, isAfter } from 'date-fns';

import Cells from './Cells';
import CalendarDetail from './CalendarDetail';

import { nextArrow } from '../../../../icons/nextArrow';
import { backArrow } from '../../../../icons/backArrow';

import { days, months, years } from '../../../../utils/TimeArrays'

const Calendar = ({ selectedDate, setSelectedDate }) => {

	const [currentMonth, setCurrentMonth] = useState(new Date());
	const node = useRef();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (open) {
			document.addEventListener('mousedown', handleOutsideClick);
		} else {
			document.removeEventListener('mousedown', handleOutsideClick);
		}
	}, [open]);
	
	const handleOutsideClick = e => {
		if (node.current) {
			if (node.current.contains(e.target)) {
				return;
			} else {
				setOpen(false);
			}
		} else {
			setOpen(false);
		}
	};
	
	const nextMonth = () => {
		setCurrentMonth(addMonths(currentMonth, 1))
	}
	const lastMonth = () => {
		if (isAfter(currentMonth, new Date(2019, 0, 1))){
		 setCurrentMonth(subMonths(currentMonth, 1))
		}
	}

	const onDateClick = day => {
		setOpen(true);
		setSelectedDate(day);
	};

	const onMonthChange = e => {
		const year = getYear(new Date(currentMonth));
		setCurrentMonth(setMonth(new Date(year, 1, 1), e.target.value));
	};

	const onYearChange = e => {
		const month = getMonth(new Date(currentMonth));
		setCurrentMonth(setMonth(new Date(e.target.value, 1, 1), month));
	};

	return (	
		<div className='calendar'>
			<header className='calendar-header'>
				<div className='cal-header row flex-middle'>
					<div className='col col-start'>
						{/* <h2>{format(currentMonth, "MMMM")}</h2> */}
					</div >
					<div className='col calendar-select'>
						<div className='cal-arrow-container'>
						<button className='calendar-button back-arrow' onClick={lastMonth}>{backArrow()}</button>
						<button className='calendar-button next-arrow' onClick={nextMonth}>{nextArrow()}</button>
						</div>
						<select
							onChange={onMonthChange}
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
							onChange={onYearChange}
							value={getYear(new Date(currentMonth))}>
							{years.map(year => {
								return (
									<option key={year} value={year}>
										{year}
									</option>
								);
							})}
						</select>

						<Link className='calendar-button' to='/dashboard/schedule/week'>
						<button className='calendar-button'>
							<p>
							Week
							</p>
							</button>
							</Link>
					</div>
				</div>
			</header>

			<div className="calendar-days">
				<div className="days row">
					{days.map(day => {
						return (
							<div className="col col-center" key={day}>
								<p>
								{day}
								</p>
							</div>
						);
					})}
				</div>
			</div>

			<div className="calendar-cells"></div>
			<Cells
			
				onDateClick={onDateClick}
				currentMonth={currentMonth}
				selectedDate={selectedDate}
				// open={open}
			/>
			{open && (
				<div className='calendar-detail' ref={node}>
					<CalendarDetail
					open={open}
						setOpen={setOpen}
						selectedDate={selectedDate}
					/>
				</div>
			)}		
		</div>		
	);
};

export default Calendar;