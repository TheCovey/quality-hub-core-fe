// Libraries
import React from 'react';

// Styles
import './DeleteCoachPost.scss';

// Modal
import DeletePostModal from './DeletePostModal/DeletePostModal';
import useModal from '../../../../../global/utils/useModal';

export default function DeletePost() {
	const { isShowing, toggle } = useModal();

	return (
		<div>
			<div className='delete-coach-post'>
				<h2>Delete Coach Post</h2>
				<div className='delete-post'>
					<span className='delete-warning'>
						<p>If you delete your post, you can't reverse this action.</p>
					</span>
					<button className='delete-post-btn' onClick={toggle}>
						<p>Delete Post</p>
					</button>
				</div>
			</div>
			<DeletePostModal isShowing={isShowing} hide={toggle} />
		</div>
	);
}
