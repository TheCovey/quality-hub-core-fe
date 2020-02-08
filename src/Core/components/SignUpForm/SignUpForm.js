// Libraries
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

// Styles
import './SignUpForm.scss';

// Components
import SignUpNav from './subs/1_SignupNav/SignUpNav';
import ProgressBar from './subs/2_SignupForms/0_ProgressBar';
import InitialSignUp from './subs/2_SignupForms/1_InitialSignUp';
import GetStarted from './subs/2_SignupForms/2_GetStarted';
import GeneralSignUp from './subs/2_SignupForms/3_GeneralSignUp';
import AccountsSignUp from './subs/2_SignupForms/4_AccountsSignUp';
import CompletedSignUp from './subs/2_SignupForms/5_CompletedSignUp';

// Mutation
import { SIGN_UP, CREATE_CHATUSER } from './subs/Mutation';

// User Schema
import { userSchema } from './subs/UserSchema';
import { responsePathAsArray } from 'graphql';

const SignUpForm = props => {
	const [signup, error] = useMutation(SIGN_UP);
	const [newChatUser] = useMutation(CREATE_CHATUSER);

	// Validation
	const [emailTouched, setEmailTouched] = useState(false);
	const [firstTouched, setFirstTouched] = useState(false);
	const [lastTouched, setLastTouched] = useState(false);
	const [cityTouched, setCityTouched] = useState(false);
	const [stateTouched, setStateTouched] = useState(false);
	const [passwordTouched, setPasswordTouched] = useState(false);
	const [valError, setValError] = useState();

	// Set form step
	const [progress, setProgress] = useState(-1);

	// Set user object
	const [user, setUser] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		city: '',
		state: '',
		bio: '',
		personal_url: '',
		portfolio_url: '',
		twitter_url: '',
		linkedin_url: '',
		github_url: '',
	});

	// Form management/validation
	useEffect(() => {
		validateUser();
	}, [user]);

	const validateUser = () => {
		userSchema
			.validate(user, { abortEarly: false })
			.then(res => {
				setValError();
			})
			.catch(err => {
				setValError(err.errors);
			});
	};

	const handleChange = e => {
		// console.log(e.target.value);
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();

		//if URL is left as default, just remove http:// and submit as empty string
		const urlArray = [
			'personal_url',
			'portfolio_url',
			'twitter_url',
			'linkedin_url',
			'github_url',
		];

		let submitUser = { ...user };

		urlArray.forEach(item => {
			if (submitUser[item] === 'http://') {
				submitUser[item] = '';
			}
		});

		signup({ variables: submitUser })
			.then(results => {
				// console.log(results);
				newChatUser({
					variables: {
						userName: `${submitUser.first_name} ${submitUser.last_name}`,
						userId: results.data.signup.user.id.toString(),
					},
				});
				let token = results.data.signup.token;
				localStorage.setItem('token', token);
				localStorage.setItem('id', results.data.signup.user.id);
				props.setLoggedin(true);
				setProgress(progress + 1);
				// setTimeout(() => {
				// 	props.history.push('/dashboard');
				// }, 3000);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const handleNext = e => {
		e.preventDefault();
		setProgress(progress + 1);
	};

	const handleBack = e => {
		e.preventDefault();
		setProgress(progress - 1);
	};

	return (
		<div>
			{progress === -1 && (
				<InitialSignUp
					user={user}
					setUser={setUser}
					setProgress={setProgress}
					setEmailTouched={setEmailTouched}
					setPasswordTouched={setPasswordTouched}
					progress={progress}
					valError={valError}
					emailTouched={emailTouched}
					firstTouched={firstTouched}
					lastTouched={lastTouched}
					cityTouched={cityTouched}
					stateTouched={stateTouched}
					passwordTouched={passwordTouched}
				/>
			)}

			{progress === 0 && <GetStarted setProgress={setProgress} />}

			{progress > 0 && (
				<div className='sign-up-form'>
					<ProgressBar progress={progress} />
					<form>
						{(function() {
							switch (progress) {
								case 1:
									return (
										<>
											<GeneralSignUp
												setFirstTouched={setFirstTouched}
												setLastTouched={setLastTouched}
												setCityTouched={setCityTouched}
												setStateTouched={setStateTouched}
												user={user}
												handleChange={handleChange}
											/>
											<SignUpNav
												handleBack={handleBack}
												handleNext={handleNext}
											/>
											{valError
												? valError.map(message => {
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
														return (
															<p
																key={message}
																className='validation-error-message'>
																{message}
															</p>
														);
												  })
												: null}
										</>
									);
								case 2:
									return (
										<>
											<AccountsSignUp user={user} handleChange={handleChange} />
											<SignUpNav
												handleBack={handleBack}
												handleNext={handleSubmit}
											/>
											{error.error ? (
												<p>
													This email address is already in use- please enter a
													unique email address
												</p>
											) : null}
										</>
									);
								case 3:
									return <CompletedSignUp />;
								default:
									return;
							}
						})()}
						<br />
					</form>
				</div>
			)}
		</div>
	);
};

export default SignUpForm;
