import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';

// Import component and query for testing
import Avatar, { GET_IMG } from './Avatar';

// Test React components by mocking calls to the GraphQL endpoint; this allows tests to be run in isolation and removes dependence on remote data
const mocks = [
	{
		request: {
			query: GET_IMG,
		},
		result: {
			data: {
				me: {
					id: '1',
					image_url: 'test',
				},
			},
		},
	},
];

it('should render without error', () => {
	render(
		<MockedProvider mocks={mocks} addTypename={false}>
			<Avatar image_url='test' />
		</MockedProvider>,
	);
});
