import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render, fireEvent } from '@testing-library/react';
import wait from 'waait';

// Import component and query for testing
import DashboardInput from './DashboardInput';
import { EDIT_USER } from './Mutation';

// Test React components by mocking calls to the GraphQL endpoint; this allows tests to be run in isolation and removes dependence on remote data
it('should render without error', () => {
	render(
		<MockedProvider mocks={[]}>
			<DashboardInput />
		</MockedProvider>,
	);
});

it('should update individual dashboard user input fields', async () => {
	const update = {
		first_name: 'Dan',
		// last_name: "Quail",
		// email: "dan@quail.com",
		// city: "Quailbec City",
		// state: "Quailbec",
		// gender: "male",
		// personal_url: "personal",
		// blog_url: "blog",
		// twitter_url: "twitter",
		// linkedin_url: "linkedin",
		// github_url: "github",
		// portfolio_url: "portfolio",
		// bio: "bio"
	};
	const mocks = [
		{
			request: {
				query: EDIT_USER,
				variables: {
					first_name: 'Dan',
					// last_name: "Quail",
					// email: "dan@quail.com",
					// city: "Quailbec City",
					// state: "Quailbec",
					// gender: "male",
					// personal_url: "personal",
					// blog_url: "blog",
					// twitter_url: "twitter",
					// linkedin_url: "linkedin",
					// github_url: "github",
					// portfolio_url: "portfolio",
					// bio: "bio"
				},
			},
			result: { data: { update } },
		},
	];

	const component = render(
		<MockedProvider mocks={mocks} addTypename={false}>
			<DashboardInput userKey={'first_name'} userValue={update.first_name} />
		</MockedProvider>,
	);

	const editbutton = component.getByTestId('edit-button');
	fireEvent.click(editbutton);

	const savebutton = component.getByText(/save/i);
	fireEvent.click(savebutton);

	await wait(0);

	component.getByText('Dan');
});
