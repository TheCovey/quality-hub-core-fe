import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ALL_BOOKINGS } from './Queries';
import { format } from 'date-fns';
import { convertToLocal } from '../../../../../global/utils/TZHelpers';


export const DisplayBookings = currentMonth => {
	
	console.log(currentMonth)
	const { data, refetch } = useQuery(ALL_BOOKINGS, {
		variables: {
			seekerId: localStorage.getItem('id'),
			coachId: localStorage.getItem('id'),
		},
	});

	const [renderBookings, setRenderBookings] = useState();

	useEffect(() => {
		refetch();
		console.log('running')
		if (data) {
			console.log('inner running')
			setRenderBookings([...data.bookingsByCoach, ...data.bookingsBySeeker]);
		}
		//eslint-disable-next-line
	}, [data, currentMonth]);

	const sortBookingsFunction = array => {
		array.sort((a, b) => {
			if (a.hour > b.hour) {
				return 1;
			} else if (b.hour > a.hour) {
				return -1;
			} else if (a.minute > b.minute) {
				return 1;
			} else {
				return -1;
			}
		});
		return array;
	};

	const renderPerCell = (array, i) => {
		let counter = 0;

		array.forEach(appt => {
			const localAppt = convertToLocal(appt);
			//eslint-disable-next-line
			if (Number(format(currentMonth, 'Myyyy')) == `${localAppt.month}${localAppt.year}`) {
				if (localAppt.day === i && counter < 2) {
					counter++;
					const apptId = `${localAppt.month}-${localAppt.day}`;
					const booking = document.getElementById(apptId);
					const div = document.createElement('div');
					div.setAttribute('class', 'coach-booking');
					div.textContent = `InterviewQ ${
						localAppt.hour === 0 ? 12 : localAppt.hour
					}:${localAppt.minute === 0 ? '00' : '30'}`;
					if (booking) {
						booking.appendChild(div);
					}
				} else if (appt.day === i && counter === 2) {
					const apptId = `${appt.month}-${appt.day}`;
					const booking = document.getElementById(apptId);
					const div = document.createElement('div');
					div.setAttribute('class', 'seeker-booking');
					div.textContent = `more..`;
					if (booking) {
						booking.appendChild(div);
					}
					counter++;
				}
			}
		});
	};

	useEffect(() => {
		let sortBookings;
		if (renderBookings) {
			sortBookings = sortBookingsFunction(renderBookings);
		}
		if (renderBookings && sortBookings) {
			// let counter = 0;
			for (let i = 1; i < 32; i++) {
				renderPerCell(sortBookings, i);
			}
		}
		//eslint-disable-next-line
	}, [renderBookings]);
};