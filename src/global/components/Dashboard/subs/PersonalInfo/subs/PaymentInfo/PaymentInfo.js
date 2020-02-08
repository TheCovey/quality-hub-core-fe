// Libraries
import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

// Styles & Images
import './Payment.scss';
import StripeBadge from '../../../../../../stripe_assets/powered_by_stripe.png';

// Components
import Coach from './Coach';
// import Customer from './Customer';

export default function PaymentInfo() {
	return (
		<div className='dash-payment'>
			<div className='dash-payment-header'>
				<h2>Payments</h2>
				<img src={StripeBadge} alt='Powered by Stripe' />
			</div>
			<Coach />
			{/* <Customer /> */}
		</div>
	);
}
