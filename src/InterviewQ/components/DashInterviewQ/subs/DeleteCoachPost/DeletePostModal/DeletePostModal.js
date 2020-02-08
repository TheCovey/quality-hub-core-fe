// Libraries
import React from 'react';
import { createPortal } from 'react-dom';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

// Styles & Icons
import './DeletePostModal.scss';
import Icon from '../../../../../../global/icons/Icon';
import { ICONS } from '../../../../../../global/icons/iconConstants';
import { DELETE_POST } from '../../Resolvers';

export default function DeletePostModal({ isShowing, hide }) {
	const history = useHistory();
	const [deleteCoachPost, { client }] = useMutation(DELETE_POST, {
		refetchQueries: ['GET_POST'],
		awaitRefetchQueries: true,
	});

	const deletePost = () => {
		deleteCoachPost().then(res => {
			client.clearStore();
			client.resetStore();
			history.push('/dashboard');
		});
	};

	return (
		<div>
			{isShowing &&
				createPortal(
					<div className='modal-container'>
						<div id='overlay-delete-post-modal'></div>
						<div className='modal-wrapper' aria-modal aria-hidden role='dialog'>
							<div className='modal-header'>
								<Icon
									icon={ICONS.QUESTIONMARK}
									width={24}
									height={24}
									color='#096DD9'
								/>
								<h2> Do you want to delete your coach post?</h2>
							</div>
							<p>
								Deleting your post will remove all of the contents of the post
								and data associated with it.
							</p>
							<div className='modal-button-cont'>
								<button className='cancel' onClick={hide}>
									<span>Cancel</span>
								</button>
								<button className='delete-button' onClick={deletePost}>
									<span>Delete</span>
								</button>
							</div>
						</div>
					</div>,
					document.body,
				)}
		</div>
	);
}
