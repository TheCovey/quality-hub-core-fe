import React, { useState, useEffect, useCallback } from 'react';
import SmallCalendar from '../../../../global/components/Calendar/SmallCalendar';
import { Link } from 'react-router-dom';
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
	formatDistanceStrict,
	differenceInMilliseconds
} from 'date-fns';
import { useQuery } from '@apollo/react-hooks';
import { GET_AVAILABILITIES } from './Resolvers';
import './00_RequestInterview.scss';
import axios from 'axios';
import { convertToLocal } from '../../../../global/utils/TZHelpers';
import Dropzone from 'react-dropzone';
import { DropzoneIcon } from '../../../../global/icons/dropzone';
import { checkcircle } from '../../../../global/icons/checkcircle';

const RequestInteview = props => {
	const coachId = props.match.params.coachId;
	const { data: availabilities, refetch } = useQuery(GET_AVAILABILITIES, {
		variables: { coach_id: coachId },
	});

	// const localTime = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const [resumeURL, setResumeURL] = useState(null);
	const [resume, setResume] = useState(null);
	const [currentSlots, setCurrentSlots] = useState();
	const [setter, setSetter] = useState(true);
	// const [selectedCell, setSelectedCell] = useState(new Date());
	const [dateAvails, setDateAvails] = useState();
	const [currentMonth, setCurrentMonth] = useState();
	const [currentDate, setCurrentDate] = useState();
	const [dragOver, setDragOver] = useState(false);
	const [dropped, setDropped] = useState(false);

	const validateFile = checkFile => {
		if (checkFile.type === 'application/pdf') {
			return true;
		} else {
			return false;
		}
	};

	useEffect(() => {
		if (resume) {
			if (validateFile(resume)) {
				let formData = new FormData();
				formData.append('file', resume);
				formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);

				axios
					.post(
						`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
						formData,
					)
					.then(res => {
						setResumeURL(res.data.secure_url);
						setDropped(true);
					})
					.catch(err => {
						console.log(err);
					});
			}
		}
		// eslint-disable-next-line
	}, [resume]);

	useEffect(() => {
		setCurrentMonth(getMonth(new Date(props.selectedCell)) + 1);
		setCurrentDate(Number(format(props.selectedCell, 'd')));
		setSetter(!setter);
		// eslint-disable-next-line
	}, [props.selectedCell]);

	const [prevId, setPrevId] = useState();

	const handleChange = e => {
		props.setBooking({
			...props.booking,
			[e.target.name]: e.target.value,
		});
	};
	const createBooking = (e, slot) => {
		setPrevId(e.target.id);
		let prevSlot = document.getElementById(prevId);
		if (prevId && prevSlot !== null) {
			prevSlot.className = 'interview-slot';
		}
		if (e.target.id === slot.id) {
			e.target.className = 'available-slot interview-slot';
		}

		props.setBooking({
			...props.booking,
			hour: slot.hour,
			minute: slot.minute,
			coachName: `${availabilities.availabilitiesByCoach[0].coach.first_name} ${availabilities.availabilitiesByCoach[0].coach.last_name}`,
			price: availabilities.availabilitiesByCoach[0].coach.post.price,
			coach: coachId,
			year: Number(format(props.selectedCell, 'yyyy')),
			month: Number(format(props.selectedCell, 'M')),
			day: Number(format(props.selectedCell, 'd')),
			availId: slot.id,
		});
	};

	useEffect(() => {
		if (resumeURL) {
			props.setBooking({
				...props.booking,
				resumeURL: resumeURL,
			});
		}
	}, [resumeURL]);

	useEffect(() => {
		const bookedSlot = document.getElementById(props.booking.availId);
		if (bookedSlot) {
			bookedSlot.classList.add('available-slot');
		}
	}, [currentSlots]);

	useEffect(() => {
		availabilities
			? setDateAvails(
					availabilities.availabilitiesByCoach
						.map(avail => convertToLocal(avail))
						.filter(
							avail =>
								// avail.year === getYear(props.selectedCell) &&
								// avail.day === currentDate &&
								// avail.month === currentMonth &&
								avail.isOpen === true,
						),
			  )
			: setDateAvails([]);
		// eslint-disable-next-line
	}, [setter || availabilities]);

	useEffect(() => {
		if (dateAvails) {
			getAvailableSlots();
		}
		// eslint-disable-next-line
	}, [dateAvails]);

	const getAvailableSlots = () => {
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
				if (distanceInMinutes == '30 minutes') {
					if (isBefore(date1, date2)) {
						bookingArray.push(dateAvails[x])
						break;
					}
				}
			}
		}

		// const convertMinute = oldMinute => {
		// 	return oldMinute === 0 ? '00' : '50';
		// };
		// for (let x = 0; x < dateAvails.length; x++) {
		// 	for (let y = 0; y < dateAvails.length; y++) {
		// 		if (dateAvails[x].year === dateAvails[y].year) {
		// 			if (dateAvails[x].day === dateAvails[y].day) {
		// 				if (
		// 					`${dateAvails[x].hour}${convertMinute(dateAvails[x].minute)}` -
		// 						`${dateAvails[y].hour}${convertMinute(
		// 							dateAvails[y].minute,
		// 						)}` ===
		// 					-50
		// 				) {
		// 					bookingArray.push(dateAvails[x]);
		// 					break;
		// 				}
		// 			}
		// 		}
		// 	}
		// }
		setCurrentSlots(bookingArray);
	};

	if (currentSlots) {
		// let test = [...currentSlots];
		currentSlots.sort((a, b) => {
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
	}

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const dragFunction = () => {
		setDragOver(true);
	};

	const offDragFunction = () => {
		setDragOver(false);
	};

	return (
		<div className="booking-content-section">
			<div className="formsection">
				<div className="booking-header-container">
					<h2 className="booking-first-header">
						Select a Date - Coach{' '}
						{props.history.location.state &&
						props.history.location.state.coachName
							? props.history.location.state.coachName
							: props.history.location.state &&
							  props.history.location.state.bookingCoach
							? props.history.location.state.bookingCoach
							: ' '}
					</h2>
				</div>
				<div className="booking-subheading">
					<p>Please select a date and timeslot for your mock interview</p>
				</div>
				<div className="interviewq-content-container">
					<div className="coach-availability">
						<SmallCalendar
							availabilities={availabilities}
							selectedCell={props.selectedCell}
							setSelectedCell={props.setSelectedCell}
							refetchAvails={refetch}
						/>
						<div className='request-interview-slot-list'>
							{currentSlots ? (
								currentSlots.map(time => {
									if(time.day == currentDate && time.month == currentMonth && time.year == getYear(props.selectedCell)){

									
									if (time.isOpen === true) {
										const isPast = time =>
											differenceInMilliseconds(time, new Date()) < 0
												? 'disabled-interview-slot'
												: '';
										const inPast = e =>
											differenceInMilliseconds(
												new Date(
													time.year,
													time.month - 1,
													time.day,
													time.hour,
													time.minute,
												),
												new Date(),
											) < 0
												? console.log('true')
												: createBooking(e, time);

										return (
											<div
												key={time.id}
												id={time.id}
												className={`interview-slot ${isPast(
													new Date(
														time.year,
														time.month - 1,
														time.day,
														time.hour,
														time.minute,
													),
												)}`}
												onClick={inPast}>
												{/* inPast ? "" : createBooking(e, time) */}
												{time.hour === 0
													? 12
													: time.hour > 12
													? time.hour - 12
													: time.hour}
												:{time.minute === 0 ? '00' : '30'}{' '}
												{time.hour >= 12 ? 'PM' : 'AM'}
											</div>
										);
									}
								}
									return null;
								})
							) : (
								<p>No availabile bookings today</p>
							)}
						</div>
					</div>

					{/* {props.booking && props.booking.minute !== undefined ? (
				<p>You've selected {format(new Date(props.booking.year, props.booking.month - 1, props.booking.day, props.booking.hour, props.booking.minute), "PPPP - p ")}</p>
			) : (
				<p> Please select a time slot</p>
			)} */}
				</div>
			</div>
			<div className="formsection">
				<div className="booking-header-container">
					<h2>Additional Information</h2>
				</div>
				<div className="booking-subheading">
					<p>
						Please respond to these prompts to give your interview coach a
						better sense of who you are and what your goals and motivations are.
					</p>
				</div>
				<div className="interviewq-content-container">
					<div className="interviewq-booking-input">
								<h3>Resume Upload</h3>
						<Dropzone
							onDrop={acceptedFiles => {
								setResume(acceptedFiles[0]);
								offDragFunction();
							}}>
							{({ getRootProps, getInputProps }) => (
								<section>
									<div {...getRootProps()}>
										<input {...getInputProps()} accept="application/pdf"/>
										<div
											className={`interviewq-create-booking-dropzone ${dragOver ? 'interviewq-dropped-file' : ''}`}
											onDragOver={() => dragFunction()}
											onMouseLeave={() => offDragFunction()}
											onDragLeave={() => offDragFunction()}
											>
												
												{dropped ? checkcircle() : DropzoneIcon()}
											<p className="interviewq-dropzone-text">
												{'Click or drag PDF file to this area to upload your resume'}
											</p>
											{dropped && `Attached file: ${resume.name}`}
										</div>
									</div>
								</section>
							)}
						</Dropzone>
					</div>
					<div className="interviewq-booking-input">
						<h3>What do you want to get out of mock interviews?</h3>
						<textarea
							placeholder="e.g. More confidence, preparation for upcoming interview etc...."
							name="interviewGoals"
							value={props.booking.interviewGoals}
							onChange={handleChange}
						/>
					</div>
					<div className="interviewq-booking-input">
						<h3>What kind of interview questions do you want to focus on?</h3>
						<textarea
							placeholder="e.g. Technical questions, soft skill questions etc"
							name="interviewQuestions"
							value={props.booking.interviewQuestions}
							onChange={handleChange}
						/>
					</div>
				</div>
			</div>
			{/* <div className='formsection'>
    <div className='interviewq-header-container'>
   
      <h2>Payment Info</h2>
      <div className='interviewq-content-container'>
      </div>
      </div>
    </div> */}

			{props.booking && props.booking.minute !== undefined ? (
				<div className="booking-button-container">
					<Link
						className="book-interview-button"
						to={{
							pathname: `/interviewq/booking/${coachId}/confirm`,
							state: {
								price: props.location.state.price
							}
							}}>

						<button>
							<p>Next</p>
						</button>
					</Link>
				</div>
			) : (
				<div className="booking-bottom">
					<p> Please select a time slot above to continue</p>
				</div>
			)}
		</div>
	);
};
export default RequestInteview;
