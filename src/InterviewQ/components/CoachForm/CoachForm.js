import React, { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';

// Styles && Icons
import './CoachForm.scss';
import { lightbulb } from '../../../global/icons/lightbulb';
// import { lightbulb2 } from '../../../global/icons/lightbulb2';

// Query
import { GET_USER, INDUSTRIES, ADD_POST } from './subs/CoachFormQueries';

//Modal that pops up when done filling out coach form
import DoneModal from './subs/DoneModal';

import StepOne from './subs/StepOne';
import CloseButton from './subs/CloseButton';
import StepTwo from './subs/StepTwo';
import StepThree from './subs/StepThree';
import BottomButtons from './subs/BottomButtons';
import TopText from './subs/TopText';
import { handleChange, handleSubmit, handleSave } from './subs/Functions';

const CoachForm = props => {
	const { data } = useQuery(GET_USER);
	const { data: industriesData } = useQuery(INDUSTRIES);

	//false sets the default to not show the Done modal
	const [open, setOpen] = useState(false);

	//Done is the second modal that pops up after you publish a coach form
	const [done, setDone] = useState(false);

	

	const [addPost] = useMutation(ADD_POST, {
		// after a post is added, refetch the data with the current filter parameters
		refetchQueries: ['GET_POSTS'],
		awaitRefetchQueries: true,
	});

	//This sets the darkened overlay behind the modals
	useEffect(() => {
		if (open) {
			document.getElementById('overlay-coach-form').style.display = 'block';
		} else if (done) {
			document.getElementById('overlay-coach-form').style.display = 'block';
		} else {
			document.getElementById('overlay-coach-form').style.display = 'none';
		}
	}, [open, done]);

	// This is the avatar image in the preview post section
	let image;
	if (data) {
		if (data.me.image_url) {
			image = data.me.image_url;
		}
	}

	const [formState, setFormState] = useState({
		company: '',
		position: '',
		//We leave a default industry so users are FORCED to pick something
		industryName: 'Architecture and Construction',
		description: '',
		price: 30,
		tagString: '',
		isPublished: true,
	});

	const [requiredState, setRequiredState] = useState({
		company: false,
		position: false,
		description: false,
		any: false
	})

	const closeWindow = e => {
		props.refetch();
		setFormState({
			company: '',
			position: '',
			industryName: 'Architecture and Construction',
			description: '',
			price: 30,
			tagString: '',
			isPublished: true,
		});
		setOpen(false);
		setDone(false);
		setRequiredState({
			company: false,
			position: false,
			description: false,
			any: false
		})
	};

	const setAvailability = e => {
		//Get new data
		props.refetch();
		//turn off overlay
		document.getElementById('overlay-coach-form').style.display = 'none';
		//close 2nd modal
		setDone(false);
	};

	return (
		<div>
			{/* Overlay is the darkened area behind the popup modal */}
			<div id='overlay-coach-form' onClick={e => closeWindow(e)}></div>

			{/* This is the Button that is rendered on the landing page */}
			<button onClick={() => setOpen(!open)} className='become-a-coach-btn'>
				{/* {lightbulb2()} */}
				<span className='add-coach-form-button'>Become a coach</span>
			</button>

			{/* This is the 2nd modal that pops up after you publish a post */}
			{done && (
				<DoneModal
					closeWindow={closeWindow}
					setAvailability={setAvailability}
				/>
			)}

			{/* The create coach post form */}
			{open && (
				<>
					<div className='add-coach-form-background'>
						<div className='add-coach-form'>
							<CloseButton closeWindow={closeWindow} />
							<TopText lightbulb={lightbulb} />
							<StepOne
								setFormState={setFormState}
								formState={formState}
								handleChange={handleChange}
								industriesData={industriesData}
								requiredState={requiredState}
								setRequiredState={setRequiredState}
							/>
							<StepTwo
								formState={formState}
								setFormState={setFormState}
								handleChange={handleChange}
							/>
							<StepThree data={data} image={image} formState={formState} />
							<BottomButtons
								handleSave={handleSave}
								handleSubmit={handleSubmit}
								formState={formState}
								setDone={setDone}
								setOpen={setOpen}
								addPost={addPost}
								closeWindow={closeWindow}
								requiredState={requiredState}
								setRequiredState={setRequiredState}
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default CoachForm;
