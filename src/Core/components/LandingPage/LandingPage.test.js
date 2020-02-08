import React from 'react'
import LandingPage from './LandingPage'
import { render, cleanup } from '@testing-library/react'
import { Router, NavLink, BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

afterEach(cleanup)

test('is rendering', () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
        <Router history={history}>
            <LandingPage />
        </Router>
    )
})

test('p exists and says the right thing', () => {

    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getByText } = render(
        <Router history={history}>
            <LandingPage />
        </Router>
    )
    getByText('QualityHub offers the opportunity for anyone to have experienced professionals assess the quality of anything.')
})

  