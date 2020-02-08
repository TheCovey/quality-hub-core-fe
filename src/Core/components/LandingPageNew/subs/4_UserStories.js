import React from 'react';

import { users_info } from './4b_UserData';

import UserCard from './4a_UserCard';

export default function UserStories() {
	return (
		<div className='landing-page-users'>
			<h2>
				Hear more about how
				<br /> QualityHub has kickstarted careers
			</h2>
			<div className='landing-page-user-cards-wrapper'>
				{users_info.map(user => (
					<UserCard key={user.name} user={user} />
				))}
			</div>
		</div>
	);
}
