import React from 'react';

import Icon from '../../../../global/icons/Icon';
import { ICONS } from '../../../../global/icons/iconConstants';

export default function HistoryReview({ booking }) {
	const messages = [
		'',
		'Never again!',
		'Meh.',
		'Not bad.',
		'Solid!',
		'Super great!',
	];

	let starsfilled = [];
	let starsblank = [];

	for (let i = 1; i <= booking.review.rating; i++) {
		starsfilled.push(
			<Icon
				key={i}
				icon={ICONS.STAR_YELLOW}
				width={30}
				height={30}
				color='#fa8c16'
			/>,
		);
	}

	for (let i = 1; i <= 5 - booking.review.rating; i++) {
		starsblank.push(
			<Icon
				key={i}
				icon={ICONS.STAR_FILL}
				width={30}
				height={30}
				color='#efefef'
			/>,
		);
	}

	return (
		<div className='history-review'>
			<h4>Rating</h4>
			<div className='history-review-rating-container'>
				<div className={'history-review-stars-container'}>
					{starsfilled}
					{starsblank}
				</div>
				<p className='message'>{messages[booking.review.rating]}</p>
			</div>
			<h4>Review</h4>
			<p>{booking.review.review}</p>
		</div>
	);
}
