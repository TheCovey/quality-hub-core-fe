import React, { useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';

// import './Coach.scss';

import StripeButton from '../../../../../../../stripe_assets/light-on-light.png';

const UPDATE_STRIPEID = gql`
	mutation addCoachStripeId($code: String!) {
		addCoachStripeId(code: $code) {
			id
		}
	}
`;

export default function CoachSetup({ refetch }) {
	const { search } = useLocation();
	const [updateStripeId] = useMutation(UPDATE_STRIPEID);

	const code = search.match(/code=(.*?)&/)
		? search.match(/code=(.*?)&/)[1]
		: null;

	useEffect(() => {
		if (code !== null) {
			// console.log('YAS');
			console.log('code: ', code);
			updateStripeId({ variables: { code } }).then(res => refetch());
		}
		//eslint-disable-next-line
	}, [code]);

	return (
		<>
			<div className='dash-coach-connectstripe'>
				<h3>Set up Coach Dashboard on Stripe</h3>
				<div className='dash-coach-row'>
					<p>Click to set up your coach dashboard to receive payments.</p>
					<a href='https://connect.stripe.com/express/oauth/authorize?client_id=ca_GKVyZQTkuxAMwbF3TPVvax4ZBwoafQea&state={STATE_VALUE}'>
						<img src={StripeButton} alt='Stripe Button' />
					</a>
				</div>
			</div>
		</>
	);
}
