import React, { useState } from 'react';
import CoachCard from './CoachCardExpand';

//Styles
import '../../CoachCardModal.scss';

const CoachCardModal = ({ post, openReviewModal }) => {
	const [open, setOpen] = useState(false);

	return (
		<div className='coach-card-modal-text'>
			<button className='coach-card-modal-text' onClick={() => setOpen(!open)}>
				<p className='coach-card-modal-text coachcard-seemore'>See more </p>
			</button>
			{open && <CoachCard setOpen={setOpen} open={open} post={post} openReviewModal={openReviewModal}/>}
		</div>
	);
};

export default CoachCardModal;
