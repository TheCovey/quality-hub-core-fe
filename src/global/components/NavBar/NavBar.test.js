import React from 'react'

import { render, cleanup, fireEvent } from '@testing-library/react'
import NavBar from './NavBar'

import {Router, NavLink, BrowserRouter} from 'react-router-dom'
import {createMemoryHistory} from 'history'


//router stuff we really weird in these tests

afterEach(cleanup);

test('is rendering', () => { // this test made me bring router in becasue it didnt like <NavLink> out side of a <Router> god testing is lame

const history = createMemoryHistory({ initialEntries: ["/"] })
    render(
        <Router history={history}>
            <NavBar />
        </Router>
    )
})

test('checks for QualityHub, Sign In and Sign Up', () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getByText } = render(
        <Router history={history}>
            <NavBar />
        </Router>
    )
    const QualityHub = getByText('QualityHub');
    const signIn = getByText('Sign In');
    const signUp = getByText('Sign Up');
})

test('router works', () => {
    const history = createMemoryHistory({ initialEntries: ["/"] })
    const renderResult = render(
        <Router history={history}>
            <NavBar>
                <NavLink to={{pathname: "/example"}}>Home</NavLink>
            </NavBar>
        </Router>
    );
    fireEvent.click(renderResult.getByText("QualityHub"));
    expect(history.location.pathname).toBe('/');
    fireEvent.click(renderResult.getByText("Sign In"));
    expect(history.location.pathname).toBe('/signin');
    fireEvent.click(renderResult.getByText("Sign Up"));
    expect(history.location.pathname).toBe('/signup');
})

