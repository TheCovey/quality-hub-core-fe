import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { convertToLocal } from '../../../../../global/utils/TZHelpers';
import { isPast } from '../../../../../global/utils/isPast';

import CoachHistoryRow from './2_CoachHistoryRow';

const GET_COACHBOOKINGS = gql`
	query getCoachHistory($coach_id: String!) {
		bookingsByCoach(coach_id: $coach_id) {
			id
			year
			month
			day
			hour
			minute
			seeker {
				id
				first_name
				last_name
			}
			price
			uniquecheck
			review {
				id
				rating
				review
			}
			response {
				id
				text
			}
			report {
				id
				strengths
				growthAreas
				suggestions
				additionalComments
			}
		}
	}
`;

export default function CoachHistory() {
	const coach_id = localStorage.getItem('id');

	const { loading, error, data } = useQuery(GET_COACHBOOKINGS, {
		variables: { coach_id },
		fetchPolicy: 'network-only',
	});

	error && console.log(error);

	const headings = ['Seeker', 'Date', 'Time', 'Price', 'Report', 'Review'];

	const filteredData = data
		? data.bookingsByCoach
				.map(booking => convertToLocal(booking))
				.filter(booking => isPast(booking))
		: [];

	return (
		<div className='coach-history'>
			<h2>Coach History</h2>
			{filteredData && filteredData.length ? (
				<div className='coach-history-headings'>
					{headings.map((heading, index) => (
						<h3 key={index}>{heading}</h3>
					))}
				</div>
			) : (
				<p>You have no previous bookings as a Coach</p>
			)}
			{loading && <p>Loading...</p>}
			{filteredData &&
				filteredData.map(booking => (
					<CoachHistoryRow key={booking.id} booking={booking} />
				))}
		</div>
	);
}
