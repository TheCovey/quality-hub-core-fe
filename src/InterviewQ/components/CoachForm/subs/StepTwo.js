import React from 'react';

const StepTwo = ({ formState, handleChange, setFormState }) => {
	return (
		<>
			<p className='add-coach-form-step-title'>STEP 2</p>
			<p className='add-coach-form-sub-title'>
				Hourly Rate <span className='red-span'>*</span>
			</p>
			<p className='add-coach-form-description'>
				Please set a price per session. Usually a session is 1 hour long. To get
				the most clients, we recomment setting your rate between $20 and $50.
			</p>
			<div className='slider'>
				<div className='slider-inner-boxes'>
					<div className='slider-dollar-amounts'>
						<p>$0</p>
						<p>$200</p>
					</div>
					<input
						id='coach-form-price-slider'
						name='price-slider'
						type='range'
						min='0'
						max='200'
						// If we allowed the text-input for price to go higher than 200, the price slider will bump to 200 till the price drops below
						value={formState.price <= 200 ? formState.price : 200}
						onChange={e => handleChange(e, setFormState, formState)}
						step='1'
					/>
				</div>
			</div>
			<div className='add-coach-form-range-input'>
				<input
					type='text'
					name='price'
					placeholder='$'
					value={`$${formState.price}`}
					onChange={e => handleChange(e, setFormState, formState)}
				/>
			</div>
			<hr className='add-coach-form-hr-1' />
		</>
	);
};

export default StepTwo;
