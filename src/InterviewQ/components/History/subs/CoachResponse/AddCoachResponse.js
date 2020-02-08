import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

const GET_REVIEW = gql`
	query getReview($uniqueBooking: String!) {
		reviewByBooking(uniqueBooking: $uniqueBooking) {
			id
		}
	}
`;

const CREATE_RESPONSE = gql`
	mutation createResponse(
		$uniqueBooking: String!
		$reviewID: String!
		$text: String!
	) {
		createResponse(
			uniqueBooking: $uniqueBooking
			reviewID: $reviewID
			text: $text
		) {
			text
			createdAt
		}
	}
`;

export default function AddCoachResponse({
	setShowResponse,
	uniqueBooking,
	setHasResponse,
}) {
	const [response, setResponse] = useState('');
	const { data } = useQuery(GET_REVIEW, { variables: { uniqueBooking } });
	const [createResponse] = useMutation(CREATE_RESPONSE);

	const handleChange = e => {
		setResponse(e.target.value);
	};

	const handleCancel = e => {
		e.preventDefault();
		setShowResponse(false);
	};

	const handleResponse = e => {
		e.preventDefault();
		// console.log(response);
		createResponse({
			variables: {
				uniqueBooking,
				reviewID: data ? data.reviewByBooking.id : null,
				text: response,
			},
		});
		// window.location.reload(true);
		setHasResponse(true);
	};

	return (
		<div className='add-coach-response'>
			<form>
				<textarea
					className='add-coach-response-txtarea'
					value={response}
					placeholder='Reply here...'
					onChange={handleChange}
				/>
				<div className='add-coach-response-btns'>
					<button
						className='add-coach-response-cancel-btn'
						onClick={handleCancel}>
						Cancel
					</button>
					<button
						className='add-coach-response-reply-btn'
						onClick={handleResponse}>
						Reply
					</button>
				</div>
			</form>
		</div>
	);
}
