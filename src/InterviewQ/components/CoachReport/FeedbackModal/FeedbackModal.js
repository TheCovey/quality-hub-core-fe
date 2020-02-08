import React from 'react';
import { createPortal } from 'react-dom';
import { useHistory } from 'react-router-dom';

import './FeedbackModal.scss';
import Icon from '../../../../global/icons/Icon';
import { ICONS } from '../../../../global/icons/iconConstants';
import feedback from '../../../../global/icons/feedback.png';

export default function FeedbackModal({ isShowing }) {
	const history = useHistory();

	const close = () => {
		history.push('/interviewq/history');
	};

	return (
		<div className='feedback-modal-container'>
			{isShowing &&
				createPortal(
					<div>
						<div id='overlay-feedback-modal' onClick={close}></div>
						<div className='feedback-modal-wrapper'>
							<div className='feedback-modal-close' onClick={close}>
								<Icon
									icon={ICONS.CLOSE}
									width={24}
									height={24}
									color='#757575'
								/>
							</div>
							<img src={feedback} alt='feedback' />
							<h2>Your feedback has been delivered!</h2>
							<p>You can view your interview history in the "History" tab.</p>
						</div>
					</div>,
					document.body,
				)}
		</div>
	);
}
