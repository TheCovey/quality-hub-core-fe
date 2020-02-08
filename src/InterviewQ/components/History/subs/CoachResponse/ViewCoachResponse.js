// Libraries
import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
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

const UPDATE_RESPONSE = gql`
	mutation updateResponse($id: String!, $text: String) {
		updateResponse(id: $id, text: $text) {
			id
			text
			lastUpdated
		}
	}
`;

export default function ViewCoachResponse({ uniqueBooking }) {
	const [isEditing, setIsEditing] = useState(false);
	const { data } = useQuery(GET_RESPONSE, { variables: { uniqueBooking } });
	const [updatedResponse, setUpdatedResponse] = useState(
		data && data.responseByBooking.text,
	);
	const [updateResponse] = useMutation(UPDATE_RESPONSE);

	const date = arg => format(new Date(arg), 'MM/dd/yyyy hh:mm');

	const toggleEdit = () => setIsEditing(!isEditing);

	const handleChange = e => setUpdatedResponse(e.target.value);

	const handleSave = () => {
		updateResponse({
			variables: { id: data.responseByBooking.id, text: updatedResponse },
		});
		setIsEditing(!isEditing);
	};

	return (
		<div className='view-coach-response'>
			<div className='view-coach-response-header'>
				<div className='view-coach-response-headerleft'>
					<h4>Reply</h4>
					<div className='view-coach-response-date'>
						{data && date(data.responseByBooking.lastUpdated)}
					</div>
				</div>
				<div className='view-coach-response-headerright'>
					{isEditing && (
						<>
							<div className='view-coach-response-save' onClick={handleSave}>
								Save
							</div>
							<div className='view-coach-response-cancel' onClick={toggleEdit}>
								Cancel
							</div>
						</>
					)}
					{!isEditing && (
						<div className='view-coach-response-edit' onClick={toggleEdit}>
							Edit
						</div>
					)}
				</div>
			</div>
			{!isEditing && <p>{data && data.responseByBooking.text}</p>}
			{isEditing && (
				<textarea
					className='edit-coach-response-txtarea'
					placeholder={data.responseByBooking.text}
					value={updatedResponse}
					onChange={handleChange}
				/>
			)}
		</div>
	);
}
