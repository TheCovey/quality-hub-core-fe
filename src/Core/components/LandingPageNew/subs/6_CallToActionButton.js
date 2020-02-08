import React from 'react';
import { Link } from 'react-router-dom';

export default function CallToActionButton() {
	return (
		<Link to={localStorage.getItem('token') ? '/dashboard' : '/signup'}>
			<button className='landing-page-button'>
				{localStorage.getItem('token') ? 'Welcome back!' : 'Join now'}
			</button>
		</Link>
	);
}
