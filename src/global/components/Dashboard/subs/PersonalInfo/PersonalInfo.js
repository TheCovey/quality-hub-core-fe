// Libraries
import React from 'react';

// Components
import BasicInfo from './subs/BasicInfo';
import Accounts from './subs/Accounts';
// import PaymentInfo from './subs/PaymentInfo';

export default function PersonalInfo() {
	return (
		<div className='dash-personalinfo'>
			<div className='personalinfo-header'>
				<h2>Personal Info</h2>
			</div>
			<BasicInfo />
			<Accounts />
			{/* <PaymentInfo /> */}
		</div>
	);
}
