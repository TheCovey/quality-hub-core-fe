import React from 'react';

import HistoryReview from '../HistoryReview';
import CoachResponse from '../CoachResponse/CoachResponse';

export default function CoachHistoryReview({ booking }) {
	return (
		<div className='coach-history-review'>
			{booking.review ? (
				<>
					<HistoryReview booking={booking} />
					<CoachResponse uniqueBooking={booking.uniquecheck} />
				</>
			) : (
				<p className='coach-history-no-review'>
					{booking.seeker.first_name} has not yet submitted a review.
				</p>
			)}
		</div>
	);
}
