import React from 'react';

export default function HistoryReport({ booking }) {
	return (
		<div className='history-report'>
			<h4>Strengths</h4>
			<p>{booking.report.strengths}</p>
			<h4>Areas of Growth</h4>
			<p>{booking.report.growthAreas}</p>
			<h4>Suggestions</h4>
			<p>{booking.report.suggestions}</p>
			<h4>{booking.report.additionalComments && 'Additional Feedback'}</h4>
			<p>{booking.report.additionalComments}</p>
		</div>
	);
}
