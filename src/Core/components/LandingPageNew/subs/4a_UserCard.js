import React from 'react';

export default function UserCard({ user }) {
	const backgroundStyle = {
		backgroundImage: `url('/images/${user.img_file}')`,
	};

	return (
		<div className='landing-page-user-card'>
			<div className='landing-page-user-card-header'>
				<div
					className='landing-page-user-card-img'
					style={backgroundStyle}></div>
				<div className='landing-page-user-card-txt'>
					<h3>{user.name}</h3>
					<h4>{user.service} user</h4>
				</div>
			</div>
			<p>{user.text}</p>
		</div>
	);
}
