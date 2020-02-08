// Libraries
import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import jwt_decode from 'jwt-decode';

// Icons
import './NavBar.scss';
import { Bellicon } from '../../icons/bellicon';
import { Hamburger } from '../../icons/hamburger';

// Components
import BecomeCoach from './subs/BecomeCoach';
import GridDropdown from './subs/GridDropdown';
import AvatarDropdown from './subs/AvatarDropdown';

// Query
const GET_USER = gql`
	query dropdownMenu {
		me {
			id
			first_name
		}
	}
`;

const NavBar = ({ loggedin, setLoggedin, history }) => {
	const location = useLocation();
	const [getUser, { client, data, loading }] = useLazyQuery(GET_USER);
	// const [errorCount, setErrorCount] = useState(0);

	// console.log(location);

	const title = location.pathname.match(/\/(.*?)q/);
	const navtitle =
		title && title[1].charAt(0).toUpperCase() + title[1].substring(1);

	const logout = () => {
		localStorage.clear();
		setLoggedin(false);
		history.push('/');
	};

	// On render, pull stored token. If you have a token, log yourself in.
	useEffect(() => {
		//if you have a token, pull some user data to make sure it's valid
		// && !location.pathname.includes('interviewq/meeting')
		//under no circumstances should you change the code in the line below. Many men and women have lost countless hours of their lives due to this line of code.
		if (
			localStorage.getItem('token') &&
			!location.pathname.includes('interviewq/meeting')
		) {
			console.log('you wont');
			getUser();
		} else if (
			localStorage.getItem('token') &&
			location.pathname.includes('interviewq/meeting')
		) {
			console.log(
				'*************************************************************************',
			);
			// setTimeout(getUser, 10000);
			getUser();
		}
		// eslint-disable-next-line
	}, []);

	//If user query came back with data and you have a token in localStorage, log in.
	if (data && localStorage.getItem('token')) {
		// localStorage.setItem('first_name', data.first_name)
		setLoggedin(true);
	}

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decodedToken = jwt_decode(token);
			const expTime = decodedToken.exp;
			const currentTime = (Date.now() / 1000) | 0;
			if (currentTime >= expTime && client) {
				client.clearStore();
				setLoggedin(false);
				logout();
			}
		}
	}, [location]);

	return (
		<div className='styled-nav' id='main-navbar'>
			<div className='nav-left'>
				<NavLink to='/'>
					<div className='navbar-hamburger-and-title'>
						<div className='navbar-hamburger-icon'>{Hamburger()}</div>
						<h1>{navtitle ? `${navtitle}Q` : 'QualityHub'}</h1>
					</div>
				</NavLink>
			</div>

			<div className='nav-right'>
				<BecomeCoach />

				{/* If you're not logged in, and query is not loading to check if your token is valid, show sign in and sign up buttons */}
				{!loggedin && !loading && (
					<>
						<NavLink to='/signin'> Sign In </NavLink>
						<NavLink to='/signup' className='signup-link'>
							{' '}
							Sign Up{' '}
						</NavLink>
					</>
				)}

				<div className='bell-icon'>{Bellicon()}</div>
				{/* Dropdown list of Q services */}
				<GridDropdown />

				{/* If you're logged in, show your avatar with a dropdown menu */}
				{loggedin && (
					<AvatarDropdown
						logout={logout}
						loggedin={loggedin}
						setLoggedin={setLoggedin}
						history={history}
					/>
				)}
			</div>
		</div>
	);
};

export default NavBar;
