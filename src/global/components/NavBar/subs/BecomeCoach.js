import React from 'react';
import { useLocation } from 'react-router-dom';

import BecomeCoachInterviewQ from '../../../../InterviewQ/components/BecomeCoachInterviewQ/BecomeCoachInterviewQ';

export default function BecomeCoach() {
	const { pathname } = useLocation();

	// Depending on pathname, include relevant "BecomeCoach" component
	return (
		<div className='become-coach-wrapper'>
			{pathname.includes('interviewq') && <BecomeCoachInterviewQ />}
		</div>
	);
}
