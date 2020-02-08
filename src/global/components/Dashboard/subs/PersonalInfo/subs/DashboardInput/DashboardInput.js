// Libraries
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

// Styles & Icons
import './DashboardInput.scss';

import AccountIcon from './subs/AccountIcon';

//GraphQuail Mutation
import { EDIT_USER } from './Mutation';

// Functions & Utils
import { capitalize } from '../../../../../../utils/capitalize';

// Data
import { statesArray } from '../../../../../../data/States';

const DashboardInput = ({ userKey, userValue, isLink }) => {
	const [original, setOriginal] = useState(userValue);
	const [editing, setEditing] = useState(false);
	const [user, setUser] = useState({
		[userKey]: userValue,
	});

	//changeField runs the update mutation
	const [changeField] = useMutation(EDIT_USER);

	const handleChange = e => {
		setUser({
			[userKey]: e.target.value,
		});
	};

	useEffect(() => {
		if (editing) {
			document.getElementById(`dashboard-input-${userKey}`).focus();
		}
		// eslint-disable-next-line
	}, [editing]);

	const handleSubmit = e => {
		e.preventDefault();

		//this checks to see if the user pressed accept, but didn't make any changes.
		//if so, no mutation request is made
		if (original === user[userKey]) {
			setEditing(false);
			return;
		}

		//check if valid email
		const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		if (userKey === 'email') {
			if (!user[userKey].match(mailFormat)) {
				setUser({
					[userKey]: original,
				});
				setEditing(false);
				return;
			}
		}

		//Cannot leave state on Select
		if (userKey === 'state') {
			if (user[userKey] === 'Select') {
				setUser({
					[userKey]: original,
				});
				setEditing(false);
				return;
			}
		}

		//this makes sure any required fields are not submitted as blank strings
		if (
			(userKey === 'first_name' ||
				userKey === 'last_name' ||
				userKey === 'email' ||
				userKey === 'city' ||
				userKey === 'state') &&
			user[userKey] !== ''
		) {
			//if fields are not blank, run mutation to update
			changeField({ variables: user })
				.then(res => {
					setOriginal(user[userKey]);
					setEditing(false);
				})
				.catch(err => {
					console.log(err);
				});
		} else if (
			!(
				userKey === 'first_name' ||
				userKey === 'last_name' ||
				userKey === 'email' ||
				userKey === 'city' ||
				userKey === 'state'
			)
		) {
			//if fields are not blank, run mutation to update
			changeField({ variables: user })
				.then(res => {
					setOriginal(user[userKey]);
					setEditing(false);
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			//If fields are blank... cancel edit
			setUser({
				[userKey]: original,
			});
			setEditing(false);
		}
	};

	//if you cancel out of an edit, revert back to the original data
	const handleCancel = () => {
		setUser({
			[userKey]: original,
		});
		setEditing(false);
	};

	//when you click edit...
	//if the key name is state, use a dropdown menu instead of input form
	const checkKeyNameForEdit = () => {
		if (userKey === 'state') {
			return (
				<select
					id={`dashboard-input-${userKey}`}
					name='state'
					placeholder='State'
					value={user[userKey]}
					onChange={handleChange}
					required>
					<option>Select</option>
					{statesArray.map(state => (
						<option value={state} key={state}>
							{state}
						</option>
					))}
				</select>
			);
		} else if (userKey === 'bio') {
			return (
				<textarea
					className='post-desc'
					name={userKey}
					id={`dashboard-input-${userKey}`}
					// placeholder={original}
					onChange={handleChange}
					value={user[userKey]}
				/>
			);
		}

		return (
			//If it's not a states array, just render a normal input field
			<input
				name={userKey}
				id={`dashboard-input-${userKey}`}
				onChange={handleChange}
				value={user[userKey]}
			/>
		);
	};
	let newURL = user[userKey];
	if (user[userKey]) {
		let splitURL = user[userKey].split(':');
		if (splitURL.length === 1) {
			newURL = `http://${user[userKey]}`;
		}
	}

	return (
		<div className='dash-input'>
			<div className='dash-row'>
				<span className='dash-heading'>
					{userKey.includes('_url') && (
						<div className='account-icon'>
							<AccountIcon userKey={userKey} />
						</div>
					)}
					<h4>{userKey && capitalize(userKey.split('_url')[0])}</h4>
				</span>
				{/* <div> */}
				{editing ? (
					checkKeyNameForEdit() //when you click edit, check what kind of input field to return based on key name
				) : //When you're not in edit mode, render this
				isLink ? (
					<p>
						<a href={newURL} target='_blank' rel='noopener noreferrer'>
							{user[userKey]}
						</a>
					</p>
				) : (
					<p>{user[userKey]}</p>
				)}
				{/* </div> */}
			</div>
			<div className='update-btns'>
				{editing && (
					// Cancel out of editing mode
					<button onClick={() => handleCancel()} className='cancel-button'>
						Cancel
					</button>
				)}
				{editing && (
					// Save changes made in editing mode
					<button onClick={e => handleSubmit(e)} className='accept-button'>
						Save
					</button>
				)}
			</div>
			{!editing && (
				//button to click on to enter editing mode
				<button
					className='edit-button'
					onClick={() => setEditing(true)}
					data-testid='edit-button' //data-testid made explicitly for testing-purposes
				>
					Edit
				</button>
			)}
		</div>
	);
};

export default DashboardInput;
