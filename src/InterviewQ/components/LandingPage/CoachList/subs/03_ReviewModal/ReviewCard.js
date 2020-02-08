// Libraries
import React, { useState } from 'react';
import { format } from 'date-fns';

// Styles & Icons
import './ReviewModal.scss';
import { star, greystar } from '../../../../../../global/icons/star';
import Icon from '../../../../../../global/icons/Icon';
import { ICONS } from '../../../../../../global/icons/iconConstants';

// Components
import CoachReply from '../../../../History/subs/SeekerHistory/6_CoachReply';

const ReviewCard = ({ review }) => {
	const [showReply, setShowReply] = useState(false);

	return (
		<div className='iq-review-card'>
			<div className='iq-review-card-header'>
				<div className='iq-review-seeker'>
					<span>{`${review.seeker.first_name} ${review.seeker.last_name}`}</span>
				</div>
				<div className='iq-review-time'>
					<span>{format(new Date(review.createdAt), 'PPP  p ')}</span>
				</div>
          {review.rating ? 
				<div className='iq-review-stars'>
					{review.rating >= 0.5 ? star() : greystar()}
					{review.rating >= 1.5 ? star() : greystar()}
					{review.rating >= 2.5 ? star() : greystar()}
					{review.rating >= 3.5 ? star() : greystar()}
          {review.rating >= 4.5 ? star() : greystar()}
				</div>
          :<div className='iq-review-stars'> No Rating </div> }
			</div>
			<div className='iq-review-content'>
				<p>{review.review}</p>
			</div>
			{review.response && (
				<div className='review-modal-coach-reply'>
					<div
						className='review-modal-reply-toggle'
						onClick={() => setShowReply(!showReply)}>
						{showReply ? 'Hide' : 'View'} Coach Reply
						<div
							className='arrow-icon'
							style={{ transform: `scaleY(${showReply ? '-1' : '1'})` }}>
							<Icon icon={ICONS.MORE} width={24} height={24} color='#757575' />
						</div>
					</div>
					{showReply && (
						<CoachReply uniqueBooking={review.booking.uniquecheck} />
					)}
				</div>
			)}
		</div>
	);
};

export default ReviewCard;
