import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { convertToLocal } from '../../../../../global/utils/TZHelpers';
import { isPast } from '../../../../../global/utils/isPast';

import SeekerHistoryRow from './2_SeekerHistoryRow';

const GET_SEEKERBOOKINGS = gql`
	query getSeekerHistory($seeker_id: String!) {
		bookingsBySeeker(seeker_id: $seeker_id) {
			id
			year
			month
			day
			hour
			minute
			price
			coach {
				id
				first_name
				last_name
			}
			uniquecheck
			report {
				id
				strengths
				growthAreas
				suggestions
				additionalComments
			}
			review {
				id
				rating
				review
			}
		}
	}
`;

export default function SeekerHistory() {
	const seeker_id = localStorage.getItem('id');

	const { loading, error, data } = useQuery(GET_SEEKERBOOKINGS, {
		variables: { seeker_id },
		fetchPolicy: 'network-only',
	});

	error && console.log(error);

	const headings = ['Coach', 'Date', 'Time', 'Price', 'Review', 'Report'];

	const filteredData = data
		? data.bookingsBySeeker
				.map(booking => convertToLocal(booking))
				.filter(booking => isPast(booking))
		: [];

	return (
		<div className="interviewq-seeker-history">
			<h2>Seeker History</h2>
			{filteredData && filteredData.length ? (
				<div className='seeker-history-headings'>
					{headings.map(heading => (
						<h3 key={heading}>{heading}</h3>
					))}
				</div>
			) : (
				<p>You have no previous bookings as a Seeker</p>
			)}
			{loading && <p>Loading...</p>}
			{filteredData &&
				filteredData.map(booking => (
					<SeekerHistoryRow key={booking.id} booking={booking} />
				))}
		</div>
	);
}
