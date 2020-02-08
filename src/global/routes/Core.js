import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import LandingPage from '../../Core/components/LandingPage';
import LandingPage from '../../Core/components/LandingPageNew';
import Dashboard from '../components/Dashboard';
import SignInForm from '../../Core/components/SignInForm';
import SignUpForm from '../../Core/components/SignUpForm';
import ForgotPassword from '../../Core/components/SignInForm/subs/ForgotPassword';
import PrivateRoute from '../../global/components/PrivateRoute';
import ChargeButton from '../../Core/components/Stripe/subs/ChargeButton';

function Core({ loggedin, setLoggedin }) {
	return (
		<Switch>
			<Route
				exact
				path='/'
				render={props => (
					<LandingPage
						{...props}
						loggedin={loggedin}
						setLoggedin={setLoggedin}
					/>
				)}
			/>
			<Route
				path='/signin'
				render={props => (
					<SignInForm
						{...props}
						loggedin={loggedin}
						setLoggedin={setLoggedin}
					/>
				)}
			/>
			<Route path='/forgotPassword' component={ForgotPassword} />
			<Route
				path='/signup'
				render={props => (
					<SignUpForm
						{...props}
						loggedin={loggedin}
						setLoggedin={setLoggedin}
					/>
				)}
			/>
			<PrivateRoute
				path='/dashboard'
				component={Dashboard}
				setLoggedin={setLoggedin}
			/>
			<Route path='/charge' component={ChargeButton} />
		</Switch>
	);
}

export default Core;
