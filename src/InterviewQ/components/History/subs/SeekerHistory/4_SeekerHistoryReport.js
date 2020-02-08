import React from 'react';

import HistoryReport from '../HistoryReport';

export default function SeekerHistoryReport({ booking }) {
	return (
		<div className='seeker-history-report'>
			{booking.report ? (
				<HistoryReport booking={booking} />
			) : (
				<p>{booking.coach.first_name} has not yet submitted a report.</p>
			)}
		</div>
	);
}
