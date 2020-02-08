import React from 'react';

import EditReview from './5_EditReviewForm';
import CoachReply from './6_CoachReply';

export default function SeekerHistoryReview({ booking }) {
	console.log(booking);
	return (
		<div className='seeker-history-review'>
			<EditReview review={booking.review} />
			<CoachReply uniqueBooking={booking.uniquecheck} />
		</div>
	);
}
