import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { ALL_BOOKINGS } from './Queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
	format,
	differenceInHours,
	isAfter,
	isBefore,
	addHours,
} from 'date-fns';
import { clock } from '../../../../../global/icons/Clock';
import { document } from '../../../../../global/icons/document.js';
import { paperclip } from '../../../../../global/icons/paperclip.js';
import { interviewQtie } from '../../../../../global/icons/interviewqtie.js';
import { ICONS } from '../../../../../global/icons/iconConstants';
import Icon from '../../../../../global/icons/Icon';
import { convertToLocal } from '../../../../../global/utils/TZHelpers.js';
import { gql } from 'apollo-boost';

const CalendarDetail = ({ selectedDate, setOpen, open }) => {
	const DELETE_BOOKING = gql`
		mutation deleteBooking($uniquecheck: String!) {
			deleteBooking(uniquecheck: $uniquecheck) {
				id
				uniquecheck
			}
		}
	`;

	const history = useHistory();

	const { data } = useQuery(ALL_BOOKINGS, {
		variables: {
			seekerId: localStorage.getItem('id'),
			coachId: localStorage.getItem('id'),
		},
	});

	const [booking, setBooking] = useState([]);
	const [allBookings, setAllBookings] = useState();
	const [deleteBook] = useMutation(DELETE_BOOKING);

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
	useEffect(() => {
		if (data) {
			let bookingArray = sortBookingsFunction([
				...data.bookingsByCoach,
				...data.bookingsBySeeker,
			]);

			setAllBookings(bookingArray);
		}
	}, [data]);

	useEffect(() => {
		let selectedDay = format(selectedDate, 'd');
		let selectedMonth = format(selectedDate, 'M');
		if (allBookings) {
			let convertedBookings = allBookings.map(booking =>
				convertToLocal(booking),
			);
			setBooking(
				sortBookingsFunction(
				convertedBookings.filter(month => {
					return (
						month.day === Number(selectedDay) &&
						month.month === Number(selectedMonth)
					);
				}))
			);
		}
		//eslint-disable-next-line
	}, [allBookings]);


	// useEffect(()=>{
	// 	if(booking){
	// 		console.log('sort booking')
	// 		setBooking(sortBookingsFunction(booking));
	// 	}
	// },[booking])

	// const localTime = Intl.DateTimeFormat().resolvedOptions().timeZone;

	var canDelete = true;

	const lessThan24 = time => {
		if (differenceInHours(time, new Date()) < 24) {
			canDelete = false;
			return 'disabled-delete-booking-btn';
		} else {
			return '';
		}
	};

	// const moreThan1 = time => {
	// 	if (differenceInHours(new Date(), time) < 1) {
	// 		return false;
	// 	} else {
	// 		return true;
	// 	}
	// };

	const handleDelete = (id, event) => {
		event.stopPropagation();
		deleteBook({ variables: { uniquecheck: id } })
			.then(res => {
				window.location.reload(true);
				// client.clearStore();
				// client.resetStore();
				//refetch();
				setOpen(false);
				console.log(res);
			})
			.catch(err => {
				console.log(err.message);
			});
	};

	return (
		<div className="booking-container">
			<span className="cal-detail-header" onClick={() => setOpen(false)}>
				<Icon icon={ICONS.CLOSE} width={24} height={24} color="silver" />
			</span>
			{booking[0] ? (
				<div>
					{booking.map((info, index) => {
						console.log(info)
						const uniquecheckToLocalStorage = id => {
							window.localStorage.setItem('uniquecheckid', info.uniquecheck);
							if (info.coach.id === localStorage.getItem('id')) {
								// history.push(
								// 	`/interviewq/history/coachreport/${info.uniquecheck}`,
								// );
								// history.pushState({firstName: "Hello"}, `/interviewq/history/coachreport/${info.uniquecheck}`)
								history.push({
									pathname: `/interviewq/history/coachreport/${info.uniquecheck}`,
									search: '?query=abc',
									state: { firstName: info.seeker.first_name }
								  })
							} else {
								// history.push(`/interviewq/history/review/${info.uniquecheck}`);
								// history.pushState({firstName: "Hello2"}, `/interviewq/review/coachreport/${info.uniquecheck}`)
								history.push({
									pathname: `/interviewq/history/review/${info.uniquecheck}`,
									search: '?query=abc',
									state: { firstName: info.coach.first_name }
								  })
							}
						};

						// const isPast = (time) => differenceInMilliseconds(time, new Date()) < 0 ? "disabled-delete-booking-btn" : "";
						return info.coach.id === localStorage.getItem('id') ? (
							<div className="coach-detail" key={index}>
								<h3>
									<span className="detail-span">&#x25FC;</span> InterviewQ
								</h3>
								<p>
									<span className="detail-span">{interviewQtie()}</span>
									{info.seeker.first_name} {info.seeker.last_name} (Seeker)
								</p>
								<p>
									<span className="detail-span">{clock()} </span>
									{format(
										new Date(
											info.year,
											info.month - 1,
											info.day,
											info.hour,
											info.minute,
										),
										'PPPP - p ',
									)}
								</p>
								<p>
									<span className="detail-span">{paperclip()}</span>
									{info.resumeURL === null ? (
										<span>No resume provided</span>
									) : (
										<a
											target="_blank"
											rel="noopener noreferrer"
											href={info.resumeURL}>
											Download Resume
										</a>
									)}
								</p>
								<div>
									<p className="intres">
										<span className="detail-span">{document()}</span>
										What do you want to get out of your mock interview?
									</p>
									<p className="indented">{info.interviewGoals}</p>
									<p className="indented intres">
										What kind of questions do you want to focus on?
									</p>
									<p className="indented last-cal-detail">
										{info.interviewQuestions}
									</p>
								</div>
								{console.log('jargon', info)}
								{info.id && (
									<div className="calandar-detail-modal-button-grouping">
										{isAfter(
											new Date(),
											new Date(
												info.year,
												info.month - 1,
												info.day,
												info.hour,
												info.minute,
											),
										) &&
											isBefore(
												new Date(),
												addHours(
													new Date(
														info.year,
														info.month - 1,
														info.day,
														info.hour,
														info.minute,
													),
													1,
												),
											) && (
												<NavLink
													to="/interviewq/meeting"
													target="_blank"
													className="go-to-meeting-button calandar-detail-modal-buttons"
													onClick={uniquecheckToLocalStorage}>
													Go to Meeting
												</NavLink>
											)}
										<button
											className={`${
												info.id
											} calandar-detail-modal-buttons delete-booking-btn ${lessThan24(
												new Date(
													info.year,
													info.month - 1,
													info.day,
													info.hour,
													info.minute,
												),
											)}`}
											data-id={`${info.uniquecheck}`}
											data-year={info.year}
											data-month={info.month}
											data-day={info.day}
											data-hour={info.hour}
											data-minute={info.minute}
											onClick={event => handleDelete(info.uniquecheck, event)}>
											Cancel Appointment
										</button>
									</div>
								)}
							</div>
						) : (
							<div className="seeker-detail" key={index}>
								<h3>
									<span className="detail-span">&#x25FC;</span> InterviewQ
								</h3>
								<p>
									<span className="detail-span">{interviewQtie()}</span>
									{info.coach.first_name} {info.coach.last_name} (Coach)
								</p>

								<p className="last-cal-detail">
									<span className="detail-span">{clock()} </span>
									{format(
										new Date(
											info.year,
											info.month - 1,
											info.day,
											info.hour,
											info.minute,
										),
										'PPPP - p ',
									)}
								</p>
								{info.id && (
									<div className="calandar-detail-modal-button-grouping">
										{/* <NavLink
											className="go-to-meeting-button calandar-detail-modal-buttons"
											onClick={uniquecheckToLocalStorage}
											to={{
												pathname: '/interviewq/meeting',
												meetingProps: {
													date: new Date(
														info.year,
														info.month - 1,
														info.day,
														info.hour,
														info.minute,
													),
												},
											}}>
											{' '}
											Go to Meeting{' '}
										</NavLink> */}

										{isAfter(
											new Date(),
											new Date(
												info.year,
												info.month - 1,
												info.day,
												info.hour,
												info.minute,
											),
										) &&
											isBefore(
												new Date(),
												addHours(
													new Date(
														info.year,
														info.month - 1,
														info.day,
														info.hour,
														info.minute,
													),
													1,
												),
											) && (
												<NavLink
													to="/interviewq/meeting"
													target="_blank"
													className="go-to-meeting-button calandar-detail-modal-buttons"
													onClick={uniquecheckToLocalStorage}>
													Go to Meeting
												</NavLink>
											)}

										<button
											className={`${
												info.id
											} calandar-detail-modal-buttons delete-booking-btn ${lessThan24(
												new Date(
													info.year,
													info.month - 1,
													info.day,
													info.hour,
													info.minute,
												),
											)}`}
											data-id={`${info.uniquecheck}`}
											data-year={info.year}
											data-month={info.month}
											data-day={info.day}
											data-hour={info.hour}
											data-minute={info.minute}
											onClick={event =>
												canDelete
													? handleDelete(info.uniquecheck, event)
													: event.preventDefault
											}>
											Cancel Appointment
										</button>
									</div>
								)}
							</div>
						);
					})}
				</div>
			) : (
				// console.log('its working???')
				<div className="coach-detail">
					<h3 className="no-bookings">No bookings</h3>
					{/* // )} */}
				</div>
			)}
		</div>
	);
};

export default CalendarDetail;
