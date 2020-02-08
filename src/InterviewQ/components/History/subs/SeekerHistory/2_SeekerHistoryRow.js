import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Icon from '../../../../../global/icons/Icon';
import { ICONS } from '../../../../../global/icons/iconConstants';

import SeekerHistoryReview from './3_SeekerHistoryReview';
import SeekerHistoryReport from './4_SeekerHistoryReport';

export default function SeekerHistoryRow({ booking }) {
	const [showReview, setShowReview] = useState(false);
	const [showReport, setShowReport] = useState(false);

	return (
		<div>
			<div className='seeker-history-row'>
				<div className='history-col'>
					{booking.coach.first_name} {booking.coach.last_name}
				</div>
				<div className='history-col'>
					{booking.month}/{booking.day}/{booking.year}
				</div>
				<div className='history-col'>
					{booking.hour}:{booking.minute}
					{booking.minute === 0 && '0'}
				</div>
				<div className='history-col'>${booking.price}</div>
				<div className='history-col'>
					{booking.review ? (
						<div
							className='view-review'
							onClick={() => setShowReview(!showReview)}>
							<div>{showReview ? 'Hide' : 'View'} Review</div>
							<div
								className='arrow-icon'
								style={{ transform: `scaleY(${showReview ? '-1' : '1'})` }}>
								<Icon
									icon={ICONS.MORE}
									width={24}
									height={24}
									color='#757575'
								/>
							</div>
						</div>
					) : (
						<Link
							to={{
								pathname: `/interviewq/history/review/${booking.uniquecheck}`,
								state: { firstName: booking.coach.first_name },
							}}>
							Write Review
						</Link>
					)}
				</div>
				{!booking.report ? (
					<div className='history-col'>Pending Report</div>
				) : (
					<div
						className='history-col history-content-toggle'
						onClick={() => setShowReport(!showReport)}>
						{showReport ? 'Hide' : 'View'} Report{' '}
						<div
							className='arrow-icon'
							style={{ transform: `scaleY(${showReport ? '-1' : '1'})` }}>
							<Icon icon={ICONS.MORE} width={24} height={24} color='#757575' />
						</div>
					</div>
				)}
			</div>
			{showReview && <SeekerHistoryReview booking={booking} />}
			{showReport && <SeekerHistoryReport booking={booking} />}
		</div>
	);
}
