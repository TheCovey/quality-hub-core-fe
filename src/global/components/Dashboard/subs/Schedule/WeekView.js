import React, { useEffect, useState, useRef } from 'react';
import { times as timeArray, months, years } from '../../../../utils/TimeArrays';

import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { ALL_BOOKINGS } from './Queries';
import {
	format,
	getWeek,
	getDate,
	getYear,
	getMonth,
	startOfWeek,
	endOfWeek,
	addDays,
	addWeeks,
	subWeeks,
	isAfter
} from 'date-fns';
import WeekBooking from './WeekBooking';
import CalendarDetail from './CalendarDetail';

import { nextArrow } from '../../../../icons/nextArrow';
import { backArrow } from '../../../../icons/backArrow';

import { convertToLocal } from '../../../../utils/TZHelpers'

const WeekView = ({  setSelectedDate, selectedDate }) => {
	const [open, setOpen] = useState(false);
	const node = useRef();

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

	useEffect(() => {
		if (open) {
			document.addEventListener('mousedown', handleOutsideClick);
		} else {
			document.removeEventListener('mousedown', handleOutsideClick);
		}
	}, [open]);
	
	const currentWeek = getWeek(selectedDate);
	const scheduleBody = document.getElementsByName('weekContainer');
	const { data } = useQuery(ALL_BOOKINGS, {
		variables: {
			seekerId: localStorage.getItem('id'),
			coachId: localStorage.getItem('id'),
		},
	});

	const allBookings =
		data && data.bookingsByCoach.concat(data.bookingsBySeeker);
	const filterBookings =
		data &&
		allBookings.filter(booking => {
			let bookingDate = new Date(booking.year, booking.month - 1, booking.day);
			let bookingWeek = getWeek(bookingDate);

			return currentWeek === bookingWeek;
		});
	const firstDay = startOfWeek(selectedDate);
	const lastDay = endOfWeek(selectedDate);
	const dateFormat = 'd';

	let day = firstDay;
	let days = [];
	let times = [];

	while (day <= lastDay) {
		for (let i = 0; i < 7; i++) {
			// eslint-disable-next-line
			let cellId = '';
			let formattedDate = format(day, dateFormat);
			let dayName = format(day, 'EEEE');
			cellId = format(day, 'Md');

			days.push(
				<div className={`week-day-header ${dayName}`} key={day}>
					<span className='week-day-title'>{dayName}</span>
					<span className='week-day-sub-title'>{formattedDate}</span>
				</div>,
			);
			day = addDays(day, 1);
		}
		timeArray.forEach((time, index) =>
			times.push(
				<div className='time-block' key={index}>
					{time}
				</div>,
			),
		);
	}

	// useEffect(() => {
	// 	if (filterBookings) {
	// 		const weekGrid = document.getElementById('weekContainer');
	// 		for (let i = 392 - 27 - 7 - filterBookings.length * 2; i > 0; i--) {
	// 			const div = document.createElement('div');
	// 			div.classList.add('sched-placeholder');
	// 			weekGrid.appendChild(div);
	// 		}
	// 	}
	// }, [filterBookings]);

	const onMonthChange = e => {
		const year = getYear(selectedDate);
		const month = e.target.value;
		const day = getDate(selectedDate);
		setSelectedDate(new Date(year, month, day));
	};

	const onYearChange = e => {
		const year = e.target.value;
		const month = getMonth(selectedDate);
		const day = getDate(selectedDate);
		setSelectedDate(new Date(year, month, day));
	};

	const handleNext = e => {
		setSelectedDate(addWeeks(selectedDate, 1));
	};
	
	const handleBack = e => {
		if(isAfter(selectedDate, new Date(2019, 0, 4))){
			setSelectedDate(subWeeks(selectedDate, 1));
		}
		};

		const onBookingClick = utcday => {
			let day =convertToLocal(utcday);
			console.log(day)
			setOpen(true);
			setSelectedDate(new Date(day.year, day.month -1, day.day, day.hour, day.minute));
			console.log(selectedDate)
		};

	useEffect(() => {
		scheduleBody[0].scrollTo(0, 480);
	}, []);

	return (
		<div className='calendar'>
				<header className='calendar-header'>
				<div className='cal-header row flex-middle'>
					<div className='col col-start'>
					</div>
					<div className='col calendar-select'>
						<div className='cal-arrow-container'>
						<button className='calendar-button back-arrow' onClick={handleBack}>{backArrow()}</button>
							<button className='calendar-button next-arrow' onClick={handleNext}>{nextArrow()}</button>
							</div>
						<select onChange={onMonthChange} value={getMonth(selectedDate)}>
					{months.map(month => {
						return (
							<option key={month.num} value={month.num}>
								{month.name}
							</option>
						);
					})}
				</select>
				<select onChange={onYearChange} value={getYear(selectedDate)}>
					{years.map(year => {
						return (
							<option key={year} value={year}>
								{year}
							</option>
						);
					})}
				</select>

						<Link className='calendar-button' to='/dashboard/schedule'>
				<button className='calendar-button'>
					<p>
					Month
					</p>
					</button>
					</Link>
					
					</div>
				</div>
			</header>
			<div className='top-row'>
					<div className='week-day-header time'></div>
					{days}
				</div>
			<div
				className='week-container'
				name='weekContainer'
				id='weekContainer'>
				<div className='time-column'>{times}</div>


				{data &&
					filterBookings.map(booking => (
						<WeekBooking booking={booking} key={booking} onBookingClick={onBookingClick}/>
					))}
					
			</div>
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

export default WeekView;
