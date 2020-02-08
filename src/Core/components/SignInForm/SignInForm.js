// Libraries
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

// Styles & Icons
import './SignInForm.scss';
import Icon from '../../../global/icons/Icon';
import { ICONS } from '../../../global/icons/iconConstants';

// Components
import Loading from '../../../global/components/Loading';

// Mutation
const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				first_name
				id
			}
		}
	}
`;


const SignInForm = props => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [login] = useMutation(LOGIN);

	const handleChange = e => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = e => {
		//Add validation checking here
		e.preventDefault();
		setLoading(true);
		let { email, password } = user;
		login({ variables: { email, password } })
			.then(res => {
				console.log(res);
				setLoading(false);
				let token = res.data.login.token;
				localStorage.setItem('token', token);
				localStorage.setItem('id', res.data.login.user.id);
				localStorage.setItem('first_name', res.data.login.user.first_name);
				props.history.push('/dashboard');
				props.setLoggedin(true);
			})
			.catch(err => {
				setLoading(false);
				setError('Invalid Credentials, please try again.');
			});
	};

	return (
		<div className='sign-in-form'>
			<div>
				<h1>Welcome Back!</h1>
				<h2>Please sign in to your account</h2>
			</div>
				<br />
			{/* Insert Google Login Button Here */}
			{/* <h2 className="sign-in-or">
        <span>OR</span>
      </h2> */}
			<form onSubmit={handleSubmit}>
				<div className='input-label'>
					<label htmlFor='email'>Email address</label>
						<br />
							<input
								name='email'
								value={user.email}
								onChange={handleChange}
								id='email'
							/>
						<div className='signin-icon'>
							<Icon icon={ICONS.EMAIL} width={22} height={18} color='#5f6368' />
						</div>
				</div>
					<br />
						<div className='input-label'>
							<label htmlFor='password'> Password </label>
							<br />
								<input
									name='password'
									type={showPassword ? 'password' : 'text'}
									id='password'
									value={user.password}
									onChange={handleChange}
								/>
							<p>
							<Link to='/forgotPassword'>Forgot password?</Link>
						</p>
					<div
						className='signin-icon-pw'
						style={{
							bottom: !showPassword && '5.4rem',
							left: !showPassword && 'calc(100% - 4.6rem)',
						}}
						// Allows user to see password typed in or to not see
						onClick={() => setShowPassword(!showPassword)}>
							{showPassword && (
								<Icon
									icon={ICONS.PASSWORD_Y}
									width={22}
									height={19}
									color='#5f6368'
								/>
							)}
							{!showPassword && (
								<Icon
									icon={ICONS.PASSWORD_N}
									width={22}
									height={19}
									color='#5f6368'
								/>
							)}
						</div>
					</div>
				{error && <p className='invalid-credentials'>{error}</p>}
				<br />
					{!loading &&
						(user.email !== '' && user.password !== '' ? (
							<button className='submit-btn sign-in-button'>Sign in</button>
						) : (
							<button className='submit-btn sign-in-button' disabled>
								Sign in
							</button>
						))}
					{!loading && (
						<p className='signup-link'>
							Don't have an account? <Link to='/signup'>Sign up</Link>
						</p>
					)}
				{loading && <Loading />}
			</form>
		</div>
	);
};

export default SignInForm;
