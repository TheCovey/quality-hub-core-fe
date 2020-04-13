// Libraries
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

// Styles & Icons
import './CoachCard.scss';
import Icon from '../../../../../../global/icons/Icon';
import { ICONS } from '../../../../../../global/icons/iconConstants';
import { star, greystar } from '../../../../../../global/icons/star';
import { message } from '../../../../../../global/icons/message';
//Component
import CoachModal from '../2_CoachCardModal/CoachCardModal';
import ReviewModal from '../03_ReviewModal/ReviewModal';
import MessageCoachButton from '../2_CoachCardModal/MessageCoachButton';

const GET_COACHRATING = gql`
	query RatingByCoach($coach_id: String!) {
		ratingByCoach(coach_id: $coach_id)
	}
`;

const GET_COACHREVIEWS = gql`
	query reviewsByCoach($coach_id: String!) {
		reviewsByCoach(coach_id: $coach_id) {
			id
			seeker {
				first_name
				last_name
			}
			createdAt
			review
			rating
			booking {
				uniquecheck
			}
			response {
				id
			}
		}
	}
`;

const CoachCard = ({ post }) => {
	const [reviewModal, openReviewModal] = useState(false);
	const node = useRef();

	useEffect(() => {
		if (reviewModal) {
			document.addEventListener('mousedown', handleOutsideClick);
		} else {
			document.removeEventListener('mousedown', handleOutsideClick);
		}
	}, [reviewModal]);

	const handleOutsideClick = e => {
		if (node.current) {
			if (node.current.contains(e.target)) {
				return;
			} else {
				openReviewModal(false);
			}
		} else {
			openReviewModal(false);
		}
	};

	let { coach } = post;
	let maxWidth = 100;

	const { data } = useQuery(GET_COACHRATING, {
		variables: { coach_id: coach.id },
		fetchPolicy: 'network-only',
	});

	const { data: coachReviews } = useQuery(GET_COACHREVIEWS, {
		variables: { coach_id: coach.id },
		fetchPolicy: 'network-only',
	});

	const linkedin =
		coach.linkedin_url &&
		(coach.linkedin_url.startsWith('http')
			? coach.linkedin
			: `http://${coach.linkedin_url}`);
	const twitter =
		coach.twitter_url &&
		(coach.twitter_url.startsWith('http')
			? coach.linkedin
			: `http://${coach.twitter_url}`);
	const fullName = `${coach.first_name} ${coach.last_name}`;

	return (
		<div className="coach-card">
			<div id="overlay-confirm-interview"></div>
			<div className="coachcard-header">
				<div className="coachcard-header-txt">
					<h3>
						{fullName.length > 25
							? `${fullName.substring(0, 25)}...`
							: fullName}
					</h3>
					<h4 className="coach-price">
						{post.price === 0 ? 'Free' : `$${post.price} per hour`}
					</h4>
				</div>
				<div className="coach-photo">
					{coach.image_url ? (
						<img src={coach.image_url} alt="Coach Profile Pic" />
					) : (
						<div className="blank-image">
							<Icon
								icon={ICONS.BLANK_AVATAR}
								color="white"
								width={80}
								height={90}
							/>

						</div>
					)}
				
				</div>
					{/* <div className='message-icon'>{message()}</div> */}
					{/* <MessageCoachButton coach={coach} post={post}/> */}
			</div>
			<div className="coachcard-info">
				<p>
					<span className="coachcard-icon industry">
						<Icon icon={ICONS.BAG} width={18} height={18} color="#595959" />
					</span>
					<span className="text">{`${post.company} - ${post.position}`}</span>
				</p>
				<p>
					<span className="coachcard-icon">
						<Icon
							icon={ICONS.LOCATION}
							width={18}
							height={18}
							color="#595959"
						/>
					</span>
					<span className="coachcard-posloc">
						{coach.city}, {coach.state}
					</span>
				</p>
			
				{/* <p>
					<span className='coachcard-icon'>
						<Icon icon={ICONS.STAR} width={19} height={20} color='#595959' />
					</span>
					<span>{data && data.ratingByCoach ? data.ratingByCoach : '-'}</span>
				</p> */}
			</div>
			<div className="coachcard-description">
				<div className="p-ellipsis">
					{post.description.substring(0, maxWidth)}
					<span>
						{post.description.length >= maxWidth ? '...' : ''}{' '}
						<CoachModal post={post} openReviewModal={openReviewModal} />
					</span>
				</div>
			</div>
			<div className="coachcard-rating" onClick={() => openReviewModal(true)}>
				{data && data.ratingByCoach ? (
					<span className="coachcard-stars">
						{data.ratingByCoach >= 0.5 ? star() : greystar()}
						{data.ratingByCoach >= 1.5 ? star() : greystar()}
						{data.ratingByCoach >= 2.5 ? star() : greystar()}
						{data.ratingByCoach >= 3.5 ? star() : greystar()}
						{data.ratingByCoach >= 4.5 ? star() : greystar()}
					</span>
				) : (
					<span className='text rating-score'>
						{/* {star()}
						{star()}
						{star()}
						{star()}
						{star()} */}
						No Rating
					</span>
				)}
				<span className="text rating-score">
					{data && data.ratingByCoach ? data.ratingByCoach : '--'}
					<span>{` (${
						coachReviews && coachReviews.reviewsByCoach
							? coachReviews.reviewsByCoach.length
							: ' '
					} Reviews)`}</span>
				</span>
			</div>
			
			<div className="coachcard-footer">
				<div className="coachcard-links">
					{post.coach.linkedin_url && (
						<a href={linkedin} target="_blank" rel="noopener noreferrer">
							<Icon icon={ICONS.LINKEDIN} width={24} height={24} />
						</a>
					)}
					{post.coach.twitter_url && (
						<a href={twitter} target="_blank" rel="noopener noreferrer">
							<Icon icon={ICONS.TWITTER} width={24} height={24} />
						</a>
					)}
				</div>
				{coach.id === localStorage.getItem('id') ? (
					<button className="interview-button-disabled">Request</button>
				) : (
					<>
						{localStorage.getItem('token') ? (
							
							<Link
								to={{
									pathname: `interviewq/booking/${coach.id}`,
									state: {
										coachName: `${post.coach.first_name} ${post.coach.last_name}`,
										price: post.price
									},
								}}>
									<button className="interview-button">
								Request
									</button>
							</Link>
						) : (
							<Link to="/signin"><button className="interview-button">
								Request
								</button>
								</Link>
						)}
</>
				)}
			</div>
			{reviewModal && (
				<ReviewModal
					reviewnode={node}
					openReviewModal={openReviewModal}
					reviewList={coachReviews.reviewsByCoach}
					rating={data.ratingByCoach}
					reviewModal={reviewModal}
				/>
			)}
		</div>
	);
};

export default CoachCard;
