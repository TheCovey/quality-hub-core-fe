import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import RequestInteview from './subs/00_RequestInterview';
import ConfirmInterview from './subs/01_ConfirmInterview';
import Stripe from '../../../global/components/Stripe';

const BookingContainer = props => {
	// const coachName = props.history;
	//console.log(history)
	const [booking, setBooking] = useState({});
	const [selectedCell, setSelectedCell] = useState(new Date());
	return (
		<>
			<Route
				path='/interviewq/booking/:coachId/confirm'
				render={props => (
					<ConfirmInterview
						{...props}
						booking={booking}
						selectedCell={selectedCell}
						history={props.history}
					/>
				)}
			/>
			<Route
				exact
				path='/interviewq/booking/:coachId'
				render={props => (
					<RequestInteview
						{...props}
						history={props.history}
						setSelectedCell={setSelectedCell}
						selectedCell={selectedCell}
						booking={booking}
						setBooking={setBooking}
					/>
				)}
			/>
			<Route path='/interviewq/booking/:coachId/payment'>
				<Stripe />
			</Route>
		</>
	);
};

export default BookingContainer;
