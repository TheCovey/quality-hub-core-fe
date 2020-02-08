import React from 'react';

const TopText = ({ lightbulb }) => {
	return (
		<div className='add-coach-form-top-fixed'>
			<div className='add-coach-form-row-1'>
				<div>{lightbulb()}</div>{' '}
				<div className='add-coach-form-header'>
					Create your coach posting here!
				</div>
			</div>
			<p className='add-coach-form-row-2'>
				Please fill the following fields to be listed as a coach on InterviewQ.
				<br />
				This information will help seekers decide which coaches to select, so be
				sure to sell yourself well!
			</p>
		</div>
	);
};

export default TopText;
