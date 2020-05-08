// Libraries
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_COACH_POST } from './subs/Resolvers';

// Icons
// import Icon from '../../../global/icons/Icon';
// import { ICONS } from '../../../global/icons/iconConstants';

import becomecoach from '../../../global/icons/becomecoach.png';

// Components
import CoachDash from './subs/CoachDash';

export default function DashInterviewQ() {
	const { data: coachPost, loading } = useQuery(GET_COACH_POST, {
		variables: { coach_id: localStorage.getItem('id') },
	});
	//window.scrollTo(0, 0);
	return (
		<div className='lower-dashboard'>
			{loading ? null : coachPost && coachPost.postByCoach ? (
				<CoachDash />
			) : (
				<div className='not-a-coach'>
					{/* <div className='not-a-coach-header'>
						<h2>Settings</h2>
					</div> */}
					{/* <div>{spacecoach()}</div> */}
					<img alt='astronaut' src={becomecoach} />
					{/* <p>
						You aren't currently a coach! To become a coach, click{' '}
						<Link className='not-a-coach-here' to='/interviewq'>
							here
						</Link>
						.
					</p> */}
					<p>To become a coach, go to any QualityHub service and click the "Become a Coach" button.</p>
				</div>
			)}
		</div>
	);
}
