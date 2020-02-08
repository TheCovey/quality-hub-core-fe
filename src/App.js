import React, { useState } from 'react';
import { Route, useLocation } from 'react-router-dom';
import './global/styles/index.scss';
import NavBar from './global/components/NavBar';
import InterviewQ from './global/routes/InterviewQ';
import Core from './global/routes/Core';

function App() {
	const [loggedin, setLoggedin] = useState(false);
	let { pathname } = useLocation();

	return (
		<div className='App'>
			{!pathname.includes('/meeting') && (
				<Route
					path='/'
					render={props => (
						<NavBar {...props} loggedin={loggedin} setLoggedin={setLoggedin} />
					)}
				/>
			)}
			<div className='not-nav'>
				<Core loggedin={loggedin} setLoggedin={setLoggedin} />
				<InterviewQ loggedin={loggedin} setLoggedin={setLoggedin} />
			</div>
		</div>
	);
}

export default App;
