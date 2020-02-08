import React from 'react';
import Icon from '../../../../../../global/icons/Icon';
import { ICONS } from '../../../../../../global/icons/iconConstants';

const PublishedModal = ({ node, setSuccess, handleSubmit }) => {
	// const [loading, setLoading] = useState(true);

	// const handleLoad = () => {
	// 	setLoading(false);
	// };

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
				<h3>Do you want to publish your coach post?</h3>
			</div>

			<p>
				Clicking ‘Publish’ will add your coach posting to the search results.
			</p>
			<div className='unpublish-button-container'>
				<button className='unpublish-modal-cancel'>
					<span onClick={() => setSuccess(false)}>Cancel</span>
				</button>
				<button className='unpublish-modal-confirm'>
					<span onClick={handleSubmit}>Publish</span>
				</button>
			</div>
		</div>
	);
};

export default PublishedModal;
