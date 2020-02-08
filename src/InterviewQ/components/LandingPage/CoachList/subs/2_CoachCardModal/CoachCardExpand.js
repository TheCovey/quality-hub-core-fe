// Libraries
import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

// Styles & Icons
import '../../CoachCardModal.scss';
import Icon from '../../../../../../global/icons/Icon';
import { ICONS } from '../../../../../../global/icons/iconConstants';
import { star, greystar } from '../../../../../../global/icons/star';
import MessageCoachButton from './MessageCoachButton';

const GET_COACHRATING = gql`
	query RatingByCoach($coach_id: String!) {
		ratingByCoach(coach_id: $coach_id)
	}
`;

const GET_COACHREVIEWS = gql`
	query reviewsByCoach($coach_id: String!) {
		reviewsByCoach(coach_id: $coach_id) {
			id
		}
	}
`;

const CoachCard = ({ post, setOpen, open, openReviewModal }) => {
	const { pathname } = useLocation();

	console.log(pathname);

	const node = useRef();
	let { coach } = post;

	const { data } = useQuery(GET_COACHRATING, {
		variables: { coach_id: coach.id },
	});
	const { data: coachReviews } = useQuery(GET_COACHREVIEWS, {
		variables: { coach_id: coach.id },
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

	useEffect(() => {
		if (open) {
			document.getElementById('overlay-coachcard-expand').style.display =
				'block';
		} else {
			document.getElementById('overlay-coachcard-expand').style.display =
				'none';
		}
	}, [open]);

	const swapModals = () => {
		if (!pathname.includes('settings')) {
			openReviewModal(true);
			setOpen(false);
		}
	};

	return (
		<div ref={node}>
			<div id='overlay-coachcard-expand' onClick={() => setOpen(false)}></div>
			<div className='coachcard-expand-background'>
				{/* <div className='coachcard-expand'> */}
				<button
					className='close-coachcard-expand'
					onClick={() => setOpen(false)}>
					<Icon
						icon={ICONS.CLOSE}
						width={24}
						height={24}
						color='rgba(0, 0, 0, 0.54)'
					/>
				</button>
				<div className='coachcard-expand'>
					<div className='coachcard-expand-inner'>
						<div
							className={
								coach.first_name.length > 25 || coach.last_name.length > 25
									? 'coachcard-header-expand coachcard-header-expand-longname'
									: 'coachcard-header-expand'
							}>
							<div className='coachcard-header-txt-expand'>
								<h3>
									{fullName.length > 25
										? `${fullName.substring(0, 25)}...`
										: fullName}
								</h3>
								<h4 className='coach-price'>
									{post.price === 0 ? 'Free' : `$${post.price} per hour`}
								</h4>
							</div>
							<div className='coach-photo-expand'>
								{coach.image_url ? (
									<img src={coach.image_url} alt='Coach Profile Pic' />
								) : (
									<div className='blank-image'>
										<Icon
											icon={ICONS.BLANK_AVATAR}
											color='white'
											width={80}
											height={90}
										/>
									</div>
								)}
									<MessageCoachButton coach={coach} post={post}/>
							</div>
						
						</div>
						<div className='coachcard-info-expand'>
							<p className='coachcard-icon-and-company-position'>
								<span className='coachcard-icon-industry'>
									<Icon
										icon={ICONS.BAG}
										width={16}
										height={20}
										color='#595959'
									/>
								</span>
								<span className='text'>
									{post.company} - {post.position}
								</span>
							</p>
							<p className='text'>
								<span className='coachcard-icon-expand'>
									<Icon
										icon={ICONS.LOCATION}
										width={16}
										height={22}
										color='#595959'
									/>
								</span>
								<span className='text'>
									{coach.city}, {coach.state}
								</span>
								{/* <span className='coachcard-posloc'>
							{coach.city}, {coach.state}
							</span> */}
							</p>
						</div>
						<div className='coachcard-description-expand preview-desc'>
							<p>{post.description}</p>
						</div>
						<div className='coachcard-tags-container-expand'>
							{post.tags.map(tag => (
								<p className='coachcard-tag-button-expand' key={tag.id}>
									{tag.name}
								</p>
							))}
						</div>

						<div className='coachcard-footer-expand'>
							<div
								className='coachcard-expand-rating'
								style={{ cursor: pathname.includes('settings') && 'default' }}>
								<span className='coachcard-expand-stars'>
									{data && data.ratingByCoach ? (
										<div className='coachcard-stars' onClick={swapModals}>
											{data.ratingByCoach >= 0.5 ? star() : greystar()}
											{data.ratingByCoach >= 1.5 ? star() : greystar()}
											{data.ratingByCoach >= 2.5 ? star() : greystar()}
											{data.ratingByCoach >= 3.5 ? star() : greystar()}
											{data.ratingByCoach >= 4.5 ? star() : greystar()}
										</div>
									) : (
										<div className='text rating-score' onClick={swapModals}>
											{/* {star()}
										{star()}
										{star()}
										{star()}
										{star()} */}
											No Rating
										</div>
									)}
								</span>
								<span className='text rating-score' onClick={swapModals}>
									{data && data.ratingByCoach}
									<span>{` (${
										coachReviews && coachReviews.reviewsByCoach
											? coachReviews.reviewsByCoach.length
											: ' '
									} Reviews)`}</span>
								</span>
							</div>
							<div className='coachcard-links-expand'>
								{post.coach.linkedin_url && (
									<a href={linkedin} target='_blank' rel='noopener noreferrer'>
										<Icon
											icon={ICONS.LINKEDIN}
											width={24}
											height={24}
											color={'#5F6368'}
										/>
									</a>
								)}
								{post.coach.twitter_url && (
									<a href={twitter} target='_blank' rel='noopener noreferrer'>
										<Icon
											icon={ICONS.TWITTER}
											width={24}
											height={24}
											color={'#5F6368'}
										/>
									</a>
								)}
							</div>
							{coach.id === localStorage.getItem('id') ? (
								<button className='interview-button-disabled-expand'>
									Request Interview
								</button>
							) : (
								<>
									{localStorage.getItem('token') ? (
										<Link
											to={{
												pathname: `interviewq/booking/${coach.id}`,
												state: {
													coachName: `${post.coach.first_name} ${post.coach.last_name}`,
												},
											}}>
											<button className='interview-button-expand'>
												Request Interview
											</button>
										</Link>
									) : (
										<Link to='/signin'>
											<button className='interview-button-expand'>
												Request Interview
											</button>
										</Link>
									)}
								</>
							)}
						
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CoachCard;
