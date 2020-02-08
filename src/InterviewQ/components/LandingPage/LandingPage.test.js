import React from 'react'
import LandingPage, {GET_USER} from './LandingPage'
import CoachList from '../CoachList/CoachList'
import * as rtl from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { Router, NavLink, BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

afterEach(rtl.cleanup);
afterEach(rtl.cleanup);
const container = document.body;

const mocks = [
	{
		request: {
			query: GET_USER,
		},
		result: {
			data: {
				me: {
					id: '1',
					post: {
                        id: '1'
                    }
				},
			},
		},
	},
];

// gets rid of act() warning when called after render
async function wait(ms = 0) {
  await rtl.act(() => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  });
} 

it('renders w/o crashing', async () => {
    const history = createMemoryHistory({ initialEntries: ["/interviewq"] });
    rtl.render(
        <Router history={history}>
            <MockedProvider mocks={mocks} addTypename={false}>
                <LandingPage />
            </MockedProvider>
        </Router>
    ) 
    await wait();
})

it('renders header', async () => {
    const history = createMemoryHistory({ initialEntries: ["/interviewq"] });
    rtl.render(
        <Router history={history}>
            <MockedProvider mocks={mocks} addTypename={false}>
                <LandingPage />
            </MockedProvider>
        </Router>
    )
    await wait();
    rtl.getAllByText(container, "InterviewQ")
})

it('buttons show', async () => { 
    const history = createMemoryHistory({ initialEntries: ["/interviewq"] });
    rtl.render(
        <Router history={history}>
            <MockedProvider mocks={mocks} addTypename={false}>
                <LandingPage />
            </MockedProvider>
        </Router>
    )
    await wait();
    rtl.getByText(container, "Become a coach")
    rtl.getByText(container, "Filters")
    rtl.fireEvent.click(rtl.getByText(container, "Become a coach"))
})

it('filter works', async () => {
    const history = createMemoryHistory({ initialEntries: ["/interviewq"] });
    rtl.render(
        <Router history={history}>
            <MockedProvider mocks={mocks} addTypename={false}>
                <LandingPage> 
                    <CoachList />
                </LandingPage>
            </MockedProvider>
        </Router>
    )
    await wait();
    // testing filter functionality 
    rtl.fireEvent.click(rtl.getByText(container, "Filters"))
    // rtl.fireEvent.change(rtl.getByLabelText(container, "Keywords"))
})