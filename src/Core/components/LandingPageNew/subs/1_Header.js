import React from 'react';

import CallToActionButton from './6_CallToActionButton';

export default function Header() {
	return (
		<div className='landing-page-header'>
			<div className='landing-page-header-content'>
				<h2 className='landing-page-header-text'>
					Power up your career <br />
					with help from the best.
				</h2>
				<CallToActionButton />
			</div>
		</div>
	);
}
