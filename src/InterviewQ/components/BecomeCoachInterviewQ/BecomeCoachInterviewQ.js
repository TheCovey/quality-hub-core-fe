// Libraries
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';

// Components
import CoachForm from '../CoachForm';

// Resolver
import { GET_USER } from '../LandingPage/Resolvers';

export default function BecomeCoachInterviewQ() {
	const [hasPost, setHasPost] = useState();

	const [getUser, { refetch, loading, data: userData }] = useLazyQuery(
		GET_USER,
	);

	useEffect(() => {
		//only check for current user if there is a token
		if (localStorage.getItem('token')) {
			getUser();
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (userData) {
			setHasPost(userData.me.post);
		}
	}, [userData]);

	return (
		<div>
			{localStorage.getItem('token') ? (
				//if user data is done loading...
				!loading ? (
					hasPost ? (
						//if you have a post made, show edit
						<Link
							to='/interviewq/settings'
							className='become-a-coach-reroute-to-signin'>
							<button className='become-a-coach-btn'>
								<span className='add-coach-form-button'>Edit Post</span>
							</button>
						</Link>
					) : (
						//if no post made, allow to create a post
						<CoachForm refetch={refetch} />
					)
				) : //while checking if user has a post, leave button off page
				null
			) : (
				//if no token link to signin
				<Link to='/signup' className='become-a-coach-reroute-to-signin'>
					<button className='become-a-coach-btn'>
						<span className='add-coach-form-button'>Become a coach</span>
					</button>
				</Link>
			)}
		</div>
	);
}
