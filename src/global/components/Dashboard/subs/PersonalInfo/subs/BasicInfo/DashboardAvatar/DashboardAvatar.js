// Libraries
import React from 'react';

// Styles
import './DashboardAvatar.scss';

// Components
import Avatar from '../../../../../../Avatar';

export default function DashboardAvatar() {
	return (
		<div className='dash-avatar-wrapper'>
			<h4 className='dash-heading'>Photo</h4>
			<Avatar />
		</div>
	);
}
