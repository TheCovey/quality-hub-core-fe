// Libraries
import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { format } from 'date-fns';

const GET_RESPONSE = gql`
	query getResponse($uniqueBooking: String!) {
		responseByBooking(uniqueBooking: $uniqueBooking) {
			id
			text
			lastUpdated
		}
	}
`;

export default function CoachReply({ uniqueBooking }) {
	const { data } = useQuery(GET_RESPONSE, { variables: { uniqueBooking } });

	const date = arg => format(new Date(arg), 'MM/dd/yyyy hh:mm');

	return (
		<div className='coach-reply'>
			<div className='coach-reply-header'>
				{data && data.responseByBooking && <h4>Reply</h4>}
				<div className='coach-reply-date'>
					{data &&
						data.responseByBooking &&
						date(data.responseByBooking.lastUpdated)}
				</div>
			</div>
			<p>{data && data.responseByBooking && data.responseByBooking.text}</p>
		</div>
	);
}
