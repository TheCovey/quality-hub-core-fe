// Libraries
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Styles
import './ForgotPassword.scss';

const ForgotPassword = () => {
	const [forgotpass, setForgotPass] = useState({
		email: '',
	});

	const handleChange = e => {
		setForgotPass({
			...forgotpass,
			[e.target.name]: e.target.value,
		});
	};

	// const handleSubmit = e => {
	//     e.preventDefault();
	// };

	return (
		<div className='forgotPassForm'>
			<h1>QualityHub</h1>
			<h2>Welcome Back!</h2>
			<br></br>

			<h2>Reset your password</h2>

			<p>
				Enter your email address and we will send you a link to reset your
				password!
			</p>
			<br />
			<div className='forgotpass-sub'>
				<div className='input-box'>
					<label className='label' htmlFor='email'>
						Email address
					</label>
					<br></br>
					<input
						className='Input'
						placeholder='Email'
						name='email'
						value={forgotpass.email}
						onChange={handleChange}
						id='email'
					/>
					<br></br>
				</div>
				<button className='forgotPass'>Send reset link</button>
				<Link to='/signIn'>Back to sign in</Link>
			</div>
		</div>
	);
};

export default ForgotPassword;
