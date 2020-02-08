import React from 'react';
import Icon from '../../../../global/icons/Icon';
import { ICONS } from '../../../../global/icons/iconConstants';
import { checkcircle } from '../../../../global/icons/checkcircle';
import { HashLink as Link } from 'react-router-hash-link';

const DoneModal = ({ closeWindow, setAvailability }) => {
	return (
		<div className='done-modal'>
			<button className='close-coach-form-button' onClick={() => closeWindow()}>
				<Icon
					icon={ICONS.CLOSE}
					width={24}
					height={24}
					color='rgba(0, 0, 0, 0.54)'
				/>
			</button>
			<div className='done-modal-content'>
			<img className = 'done-modal-img' src='/images/confirmed.svg' />
				<div className='done-modal-all-text'>
					<p className='done-modal-text-1'>Your coach post is live!</p>
					<p className='done-modal-text-2'>
						You can edit your coach post and set your availability in your
						dashboard.
					</p>
				</div>
				<div className='done-modal-buttons'>
					<button onClick={() => closeWindow()}>Skip for now</button>
					<Link
						scroll={el => {
							el.scrollIntoView(true);
							window.scrollBy(0, -70);
						}}
						smooth
						to='/interviewq/settings#interviewq-availability-header'
						className='add-coach-set-availability-link'>
						<button
							onClick={() => setAvailability()}
							className='done-modal-set-availability-btn'>
							Set Availability
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default DoneModal;
