import React from 'react';
import './History.scss';

import CoachHistory from './subs/CoachHistory/1_CoachHistory';
import SeekerHistory from './subs/SeekerHistory/1_SeekerHistory';

export default function History() {
	//prevents page from loading w scroll position of previous component
	window.scrollTo(0, 0);
	return (
		<div className='history-wrapper'>
			<CoachHistory />
			<SeekerHistory />
		</div>
	);
}
