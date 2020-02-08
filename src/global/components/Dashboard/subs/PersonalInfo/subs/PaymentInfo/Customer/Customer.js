// Libraries
import React from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import './Customer.scss';

import StripeButton from '../../../../../../../stripe_assets/light-on-light.png';

export default function Customer() {
	return (
		<div className='dash-customer-connectstripe'>
			<h3>Set up Customer Account on Stripe</h3>
			<div className='dash-payment-row'>
				<p>
					Click to set up your Stripe account to pay for QualityHub services
				</p>
				<a href='#'>
					<img src={StripeButton} alt='Connect with Stripe' />
				</a>
			</div>
		</div>
	);
}
