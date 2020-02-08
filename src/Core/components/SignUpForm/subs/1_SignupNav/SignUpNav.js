import React from 'react';

export default function SignUpNav({ handleBack, handleNext }) {
	return (
		<div className='signup-nav'>
			<button className='signup-back' onClick={handleBack}>
				Back
			</button>
			<button className='signup-btn' onClick={handleNext}>
				Next
			</button>
		</div>
	);
}
