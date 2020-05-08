// Libraries
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

// Styles & Icons
import '../../SignUpForm.scss';
import Icon from '../../../../../global/icons/Icon';
import { ICONS } from '../../../../../global/icons/iconConstants';

// Components
import Loading from '../../../../../global/components/Loading';

const CHECK_EMAIL = gql`
	mutation checkEmail($email: String!) {
		checkEmail(email: $email)
	}
`;

export default function SignUp({
	user,
	setUser,
	setProgress,
	setEmailTouched,
	setPasswordTouched,
	progress,
	valError,
	emailTouched,
	firstTouched,
	lastTouched,
	cityTouched,
	stateTouched,
	passwordTouched,
}) {
	const [verifyEmail, { loading }] = useMutation(CHECK_EMAIL);
	const [error, setError] = useState(false);
	const [showPassword, setShowPassword] = useState(true);

	const handleChange = e => {
		if (e.target.name === 'email') {
			setError(false);
		}
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		verifyEmail({ variables: { email: user.email } })
			.then(res => {
				setProgress(0);
			})
			.catch(err => {
				setError('Email address unavailable, please try again');
			});
	};

	return (
		<div className='initial-sign-up-container'>
			<img alt='signup' src='/images/signup.svg' className='sign-up-image' />

			<div className='sign-up'>
				<div>
					<h1>Welcome to QualityHub!</h1>
					{/* <h2>Welcome!</h2> */}
				</div>
				{/* <br /> */}
				{/* Insert Google Login Button Here */}
				{/* <h2 className="sign-up-or">
        <span>OR</span>
      </h2> */}
				<form onSubmit={handleSubmit}>
					<div className='input-label'>
						<label htmlFor='sign-up-email'>Email address</label>
						<br />
						<input
							onBlur={() => setEmailTouched(true)}
							id='sign-up-email'
							name='email'
							type='email'
							value={user.email}
							onChange={handleChange}
							required
						/>
						<div className='signup-icon'>
							<Icon icon={ICONS.EMAIL} width={22} height={18} color='#5f6368' />
						</div>
					</div>
					<br />
					<div className='input-label'>
						<label htmlFor='password'> Password </label>
						<br />
						<input
							onBlur={() => setPasswordTouched(true)}
							id='sign-up-password'
							type={showPassword ? 'password' : 'text'}
							name='password'
							value={user.password}
							onChange={handleChange}
							required
						/>
						<p className='password-minlength'>Minimum length is 6 characters</p>
						<div
							className='signup-icon-pw'
							style={{
								bottom: !showPassword && '5.4rem',
								left: !showPassword && 'calc(100% - 4.6rem)',
							}}
							onClick={() => setShowPassword(!showPassword)}>
							{showPassword && (
								<Icon
									icon={ICONS.PASSWORD_Y}
									width={24}
									height={24}
									color='#5f6368'
								/>
							)}
							{!showPassword && (
								<Icon
									icon={ICONS.PASSWORD_N}
									width={24}
									height={24}
									color='#5f6368'
								/>
							)}
						</div>
					</div>
					{error && <p className='email-address-taken'>{error}</p>}
					{progress === -1 && valError
						? valError.map(message => {
								if (message.includes('email') && !emailTouched) {
									return null;
								}
								if (message.includes('first') && !firstTouched) {
									return null;
								}
								if (message.includes('last') && !lastTouched) {
									return null;
								}
								if (message.includes('city') && !cityTouched) {
									return null;
								}
								if (message.includes('state') && !stateTouched) {
									return null;
								}
								if (
									(message.includes('password') ||
										message.includes('Password')) &&
									!passwordTouched
								) {
									return null;
								}
								return (
									<p key={message} className='validation-error-message'>
										{message}
									</p>
								);
						  })
						: null}
					<br />
					{!loading &&
						(user.email !== '' &&
						user.password !== '' &&
						user.password.length >= 6 ? (
							<button className='submit-btn sign-up-button'>Sign Up</button>
						) : (
							<button className='submit-btn sign-up-button' disabled>
								Sign Up
							</button>
						))}

					{!loading && (
						<p className='signin-link'>
							Already have an account? <Link to='/signin'>Sign In</Link>
						</p>
					)}
					{loading && <Loading />}
				</form>
			</div>
		</div>
	);
}
