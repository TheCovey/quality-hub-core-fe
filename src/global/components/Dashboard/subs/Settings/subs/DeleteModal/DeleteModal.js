// Libraries
import React from 'react';
import { createPortal } from 'react-dom';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

// Styles & Icons
import './DeleteModal.scss';
import Icon from '../../../../../../icons/Icon';
import { ICONS } from '../../../../../../icons/iconConstants';

// GraphQL Mutation
export const DELETE_USER = gql`
	mutation {
		deleteUser {
			first_name
			last_name
			id
		}
	}
`;

const DeleteModal = ({ isShowing, hide, setLoggedin }) => {
	const [deleteThatUser, { client }] = useMutation(DELETE_USER);
	const history = useHistory();

	const deleteAccount = () => {
		deleteThatUser().then(res => {
			client.clearStore();
			localStorage.clear();
			setLoggedin(false); // GOAL: Have this be a state variable held in Apollo Client cache
			history.push('/');
		});
	};

	return (
		<div>
			{isShowing &&
				createPortal(
					<div className='del-modal-container'>
						<div id='overlay-delete-account-modal'></div>
						<div
							className='del-modal-wrapper'
							aria-modal
							aria-hidden
							role='dialog'>
							<div className='del-modal-header'>
								<Icon
									icon={ICONS.QUESTIONMARK}
									width={24}
									height={24}
									color='#096dd9'
								/>
								<h2> Do you want to delete your account?</h2>
							</div>
							<p>
								Deleting your account will remove all of your content and data
								associated with it.
							</p>
							<div className='del-modal-button-cont'>
								<button className='cancel' onClick={hide}>
									Cancel
								</button>
								<button className='ok-button' onClick={deleteAccount}>
									Delete
								</button>
							</div>
						</div>
					</div>,
					document.body,
				)}
		</div>
	);
};

export default DeleteModal;
