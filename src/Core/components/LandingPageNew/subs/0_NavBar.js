// Libraries
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

// Components
import AvatarDropdown from '../../../../global/components/NavBar/subs/AvatarDropdown';
import GridDropdown from '../../../../global/components/NavBar/subs/GridDropdown';

// Query
const CHECK_TOKEN = gql`
	query {
		checkToken {
			token
			valid
		}
	}
`;

export default function NavBar({ loggedin, setLoggedin, history }) {
	const { data } = useQuery(CHECK_TOKEN);

	const logout = () => {
		localStorage.clear();
		setLoggedin(false);
		history.push('/');
	};

	useEffect(() => {
		console.log(data);
		if (data) {
			if (data.checkToken.valid) {
				localStorage.setItem('token', data.checkToken.token);
			} else {
				logout();
			}
		}
	}, [data]);

	return (
		<div className='landing-page-nav'>
			<h1>QualityHub</h1>
			<div className='landing-page-nav-right'>
				<a
					className='landing-page-nav-link landing-page-nav-about'
					href='#about'>
					About
				</a>
				<a
					className='landing-page-nav-link landing-page-nav-link'
					href='#services'>
					Services
				</a>
				{!localStorage.getItem('token') && (
					<>
						<NavLink
							className='landing-page-nav-link landing-page-nav-signin'
							to='/signin'>
							Sign in
						</NavLink>
						<NavLink
							className='landing-page-nav-link landing-page-nav-signup'
							to='/signup'>
							Sign up
						</NavLink>
					</>
				)}
				<div className='landing-page-nav-grid-dropdown'>
					<GridDropdown />
				</div>
				{localStorage.getItem('token') && (
					<div className='landing-page-nav-avatar'>
						<AvatarDropdown
							logout={logout}
							loggedin={loggedin}
							setLoggedin={setLoggedin}
							history={history}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
