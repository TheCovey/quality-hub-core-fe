import React from 'react';
import Icon from '../../../../../../global/icons/Icon';
import { ICONS } from '../../../../../../global/icons/iconConstants';
import './UnpublishModal.scss';

const UnpublishModal = ({ handleSubmit, setOpen, node }) => {
	return (
		<div className='unpublish-post-modal' ref={node}>
			<div className='unpublish-modal-header'>
				<span>
					<Icon
						icon={ICONS.QUESTIONMARK}
						width={24}
						height={24}
						color='#096DD9'
					/>
				</span>
				<h3>Do you want to unpublish your coach post?</h3>
			</div>

			<p>
				Clicking ‘Unpublish’ will remove your coach posting from search results.
			</p>
			<div className='unpublish-button-container'>
				<button className='unpublish-modal-cancel'>
					<span onClick={() => setOpen(false)}>Cancel</span>
				</button>
				<button className='unpublish-modal-confirm'>
					<span onClick={handleSubmit}>Unpublish</span>
				</button>
			</div>
		</div>
	);
};

export default UnpublishModal;