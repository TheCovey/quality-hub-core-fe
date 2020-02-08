import React from 'react';
import { statesArray } from '../../../../../global/data/States';

const GeneralSignUp = ({
	user,
	handleChange,
	setFirstTouched,
	setLastTouched,
	setCityTouched,
	setStateTouched,
}) => {
	return (
		<div className='general-signup'>
			<div className='required'>
				<span>*</span> Required
			</div>
			<div className='two-inputs'>
				<div className='input-label'>
					<label htmlFor='sign-up-first-name'>
						First name <span>*</span>
					</label>
					<br />
					<input
						onBlur={() => setFirstTouched(true)}
						id='sign-up-first-name'
						name='first_name'
						value={user.first_name}
						onChange={handleChange}
						required
					/>
				</div>
				<br />

				<div className='input-label'>
					<label htmlFor='sign-up-first-name'>
						Last name <span>*</span>
					</label>
					<br />
					<input
						onBlur={() => setLastTouched(true)}
						id='sign-up-last-name'
						name='last_name'
						value={user.last_name}
						onChange={handleChange}
						required
					/>
				</div>
			</div>
			<br />
			<div className='two-inputs'>
				<div className='input-label'>
					<label htmlFor='sign-up-city'>
						City <span>*</span>
					</label>
					<br />
					<input
						onBlur={() => setCityTouched(true)}
						id='sign-up-city'
						name='city'
						value={user.city}
						onChange={handleChange}
						required
					/>
				</div>
				<br />

				<div className='input-label'>
					<label htmlFor='sign-up-state'>
						State <span>*</span>
					</label>
					<br />
					<select
						onBlur={() => setStateTouched(true)}
						id='sign-up-state'
						name='state'
						value={user.state}
						onChange={handleChange}
						required>
						<option>Select...</option>
						{statesArray.map(state => (
							<option value={state} key={state}>
								{state}
							</option>
						))}
					</select>
				</div>
			</div>
			<br />
			<div className='input-label'>
				<label htmlFor='sign-up-bio'>Bio</label>
				<br />
				<textarea
					className='bio-text'
					name='bio'
					placeholder="E.g. I'm learning UX design at Lambda School."
					value={user.bio}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
};

export default GeneralSignUp;
