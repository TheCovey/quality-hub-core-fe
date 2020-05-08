import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import AddCoachResponse from './AddCoachResponse';
import ViewCoachResponse from './ViewCoachResponse';

const HAVE_RESPONSE = gql`
	query checkResponse($uniqueBooking: String!) {
		responseByBooking(uniqueBooking: $uniqueBooking) {
			id
		}
	}
`;

export default function CoachResponse({ uniqueBooking }) {
	const [hasResponse, setHasResponse] = useState(false);
	const [showResponse, setShowResponse] = useState(false);

	const { data, refetch } = useQuery(HAVE_RESPONSE, {
		variables: { uniqueBooking },
	});

	useEffect(() => {
		refetch();
		setShowResponse(!showResponse);
		//linter wants showResponse and refetch in dep arr
		//eslint-disable-next-line
	}, [hasResponse]);

	return (
		<div className='coach-response'>
			{data && data.responseByBooking ? (
				<ViewCoachResponse uniqueBooking={uniqueBooking} />
			) : (
				<>
					{!showResponse && (
						<button
							className='toggle-coach-response-btn'
							onClick={() => setShowResponse(true)}>
							Reply
						</button>
					)}
					{showResponse && (
						<AddCoachResponse
							setShowResponse={setShowResponse}
							uniqueBooking={uniqueBooking}
							setHasResponse={setHasResponse}
						/>
					)}
				</>
			)}
		</div>
	);
}
