import React, { useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import './Coach.scss';

import CoachSetup from './CoachSetup';
import CoachStripeDashboard from './CoachStripeDashboard';

const CHECK_COACH_STATUS = gql`
	query user($id: ID!) {
		user(id: $id) {
			stripeCoachConnected
		}
	}
`;

export default function Coach() {
	const { data, loading, refetch } = useQuery(CHECK_COACH_STATUS, {
		variables: { id: localStorage.getItem('id') },
	});

	if (loading) return null;



	return (
		<div className='dash-coach'>
			{data && data.user.stripeCoachConnected ? (
				<CoachStripeDashboard />
			) : (
				<CoachSetup refetch={refetch} />
			)}
		</div>
	);
}
