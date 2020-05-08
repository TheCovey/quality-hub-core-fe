import React, { useEffect } from 'react';
import { star, greystar } from '../../../../../../global/icons/star';
import ReviewCard from './ReviewCard';
import './ReviewModal.scss';

const ReviewModal = ({
	reviewnode,
	openReviewModal,
	reviewModal,
	reviewList,
	rating,
}) => {
	useEffect(() => {
		if (reviewModal) {
			document.addEventListener('mousedown', handleOutsideClick);
		} else {
			document.removeEventListener('mousedown', handleOutsideClick);
		}
		//eslint-disable-next-line
	}, [reviewModal]);

	const handleOutsideClick = e => {
		if (reviewnode.current) {
			if (reviewnode.current.contains(e.target)) {
				return;
			} else {
				openReviewModal(false);
			}
		} else {
			openReviewModal(false);
		}
	};

	return (
		<div>
			<div id='iq-review-modal-overlay'></div>
			<div className='iq-review-modal' ref={reviewnode}>
				<div
					id='overlay-coachcard-expand'
					onClick={() => openReviewModal(false)}></div>
				<div className='iq-review-modal-header'>
					<h2>Reviews</h2>
				</div>
				<div className='iq-review-modal-subheader'>
					<div className='iq-review-modal-subheader-left'>
						<p className='average'>{rating}</p>
						{rating ? (
							<p className='badge'>
								{rating <= 1.4
									? 'Never Again!'
									: rating <= 2.4
									? 'Meh'
									: rating <= 3.4
									? 'Not Bad'
									: rating <= 4.4
									? 'Solid!'
									: rating > 4.4
									? 'Super Great!'
									: ''}
							</p>
						) : (
							<p className='badge'>No Rating</p>
						)}
					</div>
					<div className='iq-review-modal-subheader-right'>
						<div className='iq-review-modal-stars'>
							{rating >= 0.5 ? star() : greystar()}
							{rating >= 1.5 ? star() : greystar()}
							{rating >= 2.5 ? star() : greystar()}
							{rating >= 3.5 ? star() : greystar()}
							{rating >= 4.5 ? star() : greystar()}
						</div>
						<div className='iq-review-modal-total'>
							{reviewList.length} Reviews
						</div>
					</div>
				</div>
				<div className='iq-review-modal-review-list'>
					{reviewList.map(review => (
						<ReviewCard key={review.id} review={review} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ReviewModal;
