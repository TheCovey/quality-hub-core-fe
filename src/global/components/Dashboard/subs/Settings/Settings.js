import React from 'react';

import './Settings.scss';

import SettingsHeader from './subs/1_SettingsHeader';
import DeleteAccount from './subs/2_DeleteAccount';

export default function Setting({ setLoggedin }) {
	return (
		<div className='settings-wrapper'>
			<SettingsHeader />
			<DeleteAccount setLoggedin={setLoggedin} />
		</div>
	);
}
