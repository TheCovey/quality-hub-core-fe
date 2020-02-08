import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const GET_BALANCE = gql`
	mutation {
		stripeBalance {
			available
			pending
		}
	}
`;

const PAY_OUT = gql`
	mutation stripePayout(
		$amount: Int!
		$currency: String
		$method: String
		$coachId: String!
	) {
		stripePayout(
			amount: $amount
			currency: $currency
			method: $method
			coachId: $coachId
		)
	}
`;

const GET_LINK = gql`
	mutation {
		createStripeLink
	}
`;

export default function CoachStripeDashboard() {
	const [balances, setBalances] = useState({
		available: 0,
		pending: 0,
	});
	const [link, setLink] = useState();

	const [getStripeBalances] = useMutation(GET_BALANCE);
	const [stripePayout] = useMutation(PAY_OUT);
	const [getStripeLink] = useMutation(GET_LINK);

	useEffect(() => {
		getStripeBalances().then(res => {
			// console.log(res);
			setBalances(res.data.stripeBalance);
		});
	}, []);

	useEffect(() => {
		getStripeLink().then(res => {
			// console.log(res);
			setLink(res.data.createStripeLink);
		});
	}, []);

	const handleClick = e => {
		e.preventDefault();
		stripePayout({
			variables: {
				amount: balances.available,
				currency: 'USD',
				method: 'instant',
				coachId: localStorage.getItem('id'),
			},
		}).then(res => {
			console.log(res);
			setBalances({ ...balances, available: 0 });
		});
	};

	return (
		<div className='coach-stripe-dashboard'>
			<h3>Coach Stripe Dashboard</h3>
			<div className='coach-stripe-dashboard-top'>
				<div className='coach-stripe-dashboard-balance'>
					<h4>Pending balance</h4>
					<div className='coach-stripe-dashboard-balance-amount'>
						${balances.pending / 100}
					</div>
				</div>
				<div className='coach-stripe-dashboard-balance'>
					<h4>Available balance</h4>
					<div className='coach-stripe-dashboard-balance-amount'>
						${balances.available / 100}
					</div>
				</div>
				<button
					onClick={handleClick}
					disabled={balances.available === 0 ? true : false}>
					Pay Out
				</button>
			</div>
			<a href={link} target='_blank' rel='noopener noreferrer'>
				View Stripe Account
			</a>
		</div>
	);
}
