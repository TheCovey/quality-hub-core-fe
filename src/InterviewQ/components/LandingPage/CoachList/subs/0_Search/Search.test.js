import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import * as rtl from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Search, { GET_INDUSTRIES } from './Search';

afterEach(rtl.cleanup);
const container = document.body;

const mocks = [
	{
		request: {
			query: GET_INDUSTRIES,
		},
		result: {
			data: {
				industries: [
					{
						name: 'test industry',
					},
				],
			},
		},
	},
];

async function wait(ms = 0) {
	await rtl.act(() => {
		return new Promise(resolve => {
			setTimeout(resolve, ms);
		});
	});
}

it('renders w/o crashing', async () => {
	const history = createMemoryHistory({ initialEntries: ['/interviewq'] });
	rtl.render(
		<Router history={history}>
			<MockedProvider mocks={mocks} addTypename={false}>
				<Search
					fields={{ tags: '', price: '', industry: '', orderBy: 'id_ASC' }}
				/>
			</MockedProvider>
		</Router>,
	);
	await wait();
});

it('renders Industry label', async () => {
	const history = createMemoryHistory({ initialEntries: ['/interviewq'] });
	rtl.render(
		<Router history={history}>
			<MockedProvider mocks={mocks} addTypename={false}>
				<Search
					fields={{ tags: '', price: '', industry: '', orderBy: 'id_ASC' }}
				/>
			</MockedProvider>
		</Router>,
	);
	await wait();
	rtl.getAllByText(container, 'Industry');
});

it('renders Price label', async () => {
	const history = createMemoryHistory({ initialEntries: ['/interviewq'] });
	rtl.render(
		<Router history={history}>
			<MockedProvider mocks={mocks} addTypename={false}>
				<Search
					fields={{ tags: '', price: '', industry: '', orderBy: 'id_ASC' }}
				/>
			</MockedProvider>
		</Router>,
	);
	await wait();
	rtl.getAllByText(container, 'Price');
});

it('renders Sort label', async () => {
	const history = createMemoryHistory({ initialEntries: ['/interviewq'] });
	rtl.render(
		<Router history={history}>
			<MockedProvider mocks={mocks} addTypename={false}>
				<Search
					fields={{ tags: '', price: '', industry: '', orderBy: 'id_ASC' }}
				/>
			</MockedProvider>
		</Router>,
	);
	await wait();
	rtl.getAllByText(container, 'Sort results by');
});

it('renders Keywords label', async () => {
	const history = createMemoryHistory({ initialEntries: ['/interviewq'] });
	rtl.render(
		<Router history={history}>
			<MockedProvider mocks={mocks} addTypename={false}>
				<Search
					fields={{ tags: '', price: '', industry: '', orderBy: 'id_ASC' }}
				/>
			</MockedProvider>
		</Router>,
	);
	await wait();
	rtl.getAllByText(container, 'Keywords');
});

it('renders Reset Filters button', async () => {
	const history = createMemoryHistory({ initialEntries: ['/interviewq'] });
	rtl.render(
		<Router history={history}>
			<MockedProvider mocks={mocks} addTypename={false}>
				<Search
					fields={{ tags: '', price: '', industry: '', orderBy: 'id_ASC' }}
				/>
			</MockedProvider>
		</Router>,
	);
	await wait();
	rtl.getAllByText(container, 'Reset Filters');
});

it('renders Apply button', async () => {
	const history = createMemoryHistory({ initialEntries: ['/interviewq'] });
	rtl.render(
		<Router history={history}>
			<MockedProvider mocks={mocks} addTypename={false}>
				<Search
					fields={{ tags: '', price: '', industry: '', orderBy: 'id_ASC' }}
				/>
			</MockedProvider>
		</Router>,
	);
	await wait();
	rtl.getAllByText(container, 'Search');
});

it('renders Industries array', async () => {
	const history = createMemoryHistory({ initialEntries: ['/interviewq'] });
	rtl.render(
		<Router history={history}>
			<MockedProvider mocks={mocks} addTypename={false}>
				<Search
					fields={{ tags: '', price: '', industry: '', orderBy: 'id_ASC' }}
				/>
			</MockedProvider>
		</Router>,
	);
	await wait();
	rtl.getAllByText(container, 'test industry');
});
