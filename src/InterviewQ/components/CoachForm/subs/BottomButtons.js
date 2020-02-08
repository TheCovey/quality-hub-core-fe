import React from 'react';

const BottomButtons = ({ handleSave, handleSubmit, formState, setDone, setOpen, addPost, closeWindow, requiredState, setRequiredState }) => {

	function requiredMet(e) {
		(formState.company.length === 0 || formState.position.length === 0 || formState.description.length === 0) ? setRequiredState({...requiredState, any: true}) : handleSubmit(e, formState, setDone, setOpen, addPost)
	}

	return (
		<div>
			<div className="add-coach-form-bottom-buttons">
				<button
					className="add-coach-form-save-and-exit"
					onClick={e => handleSave(e, formState, closeWindow, addPost)}>
					Save and exit
				</button>
				<button className="add-coach-form-publish" onClick={requiredMet}>
					Publish
				</button>
			</div>
			{requiredState.any && <p className="missing-required-fields">Missing required fields</p>}
		</div>

	);
};

export default BottomButtons;
