// import React from 'react';

export const handleChange = (e, setFormState, formState) => {
	if (e.target.name === 'price') {
		//If you try to delete the last number, the price will change to $0
		if (e.target.value.length < 2) {
			setFormState({
				...formState,
				[e.target.name]: 0,
			});
			return;
		}

		//The input form MUST include a dollar sign and have a number after it.
		if (/^\$[0-9]*$/gm.test(e.target.value)) {
			let newPrice = e.target.value.split('$');

			//set a maximum price for the text input form
			//If price is greater than 200, don't accept those changes
			//If this number is changed, you can optionally allow a different price limit in the text-input than the range-slider
			if (newPrice[1] > 200) {
				return;
			}

			//If price is less than or equal to 200, make changes to state
			setFormState({
				...formState,
				[e.target.name]: parseInt(newPrice[1]),
			});
			return;
		} else {
			return;
		}
	}

	//price text input and slider input are both connected to the same state variable
	if (e.target.name === 'price-slider') {
		setFormState({
			...formState,
			price: parseInt(e.target.value),
		});
		return;
	}

	// If the input is not about hourly rates, just set the value to state
	setFormState({
		...formState,
		[e.target.name]: e.target.value,
	});
};

export const handleSubmit = (e, formState, setDone, setOpen, addPost) => {
	e.preventDefault();
	addPost({ variables: formState })
		.then(res => {
			//Open 2nd modal
			setDone(true);
			//Close first modal
			setOpen(false);
		})
		.catch(err => {
			console.log(err);
		});
};

//This is for when you hit "save and exit"
export const handleSave = (e, formState, closeWindow, addPost) => {
	e.preventDefault();
	let newFormState = { ...formState, isPublished: false };
	addPost({ variables: newFormState })
		.then(res => {
			//Don't reroute. Just close the modal, and check for new data
			closeWindow();
		})
		.catch(err => {
			console.log(err);
		});
};
