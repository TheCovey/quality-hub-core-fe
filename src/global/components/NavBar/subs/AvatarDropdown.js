// Libraries
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import { Gear } from '../../../icons/gear';
import { Signout } from '../../../icons/signout';

// Icons
import { blankavatar } from '../../../icons/blankavatar';

// Queries
const GET_USER = gql`
	query dropdownMenu {
		me {
			id
			first_name
			last_name
			email
			image_url
		}
	}
`;

const AvatarDropdown = props => {
	const [getUser, { client, data }] = useLazyQuery(GET_USER);

	const [open, setOpen] = useState(false);

	const node = useRef();

	const logout = () => {
		client.clearStore(); //remove token from cache
		document.removeEventListener('mousedown', handleOutsideClick);
		setOpen(false);
		props.setLoggedin(false);
		props.logout();
	};

	//If you click outside the dropdown menu, the menu will close.
	const handleOutsideClick = e => {
		if (props.loggedin) {
			if (node.current) {
				if (node.current.contains(e.target)) {
					return;
				}
				setOpen(false);
			}
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	useEffect(() => {
		if (open) {
			document.addEventListener('mousedown', handleOutsideClick);
		} else {
			document.removeEventListener('mousedown', handleOutsideClick);
		}
		getUser();
	}, [open]);

	return (
		<div ref={node}>
			<div
				style={{
					backgroundImage: `url('${data && data.me.image_url}')`,
				}}
				className='avatar-menu'
				onClick={e => setOpen(!open)}>
				{data && !data.me.image_url && blankavatar()}
			</div>
			{open && (
				<div className='dropdown-content'>
					<div className='dropdown-avatar-camera'>
						<label htmlFor='imageInput-2'>
							<div className='img-wrapper-dropdown'>
								{data ? ( //ternary 1
									data.me.image_url ? ( //ternary 2
										<div
											className='profile-img-dropdown'
											style={{
												backgroundImage: `url('${data.me.image_url}')`,
											}}></div> //ternary 2
									) : (
										<div className='profile-img-dropdown2'>
											{blankavatar(81.25, 81.25)}
										</div>
									) //ternary 1
								) : (
									<div className='profile-img-dropdown3'>
										{blankavatar(81.25, 81.25)}
									</div>
								)}
							</div>
						</label>
					</div>
					{data && (
						<p className='dropdown-menu-name'>
							{data.me.first_name + ' ' + data.me.last_name}
						</p>
					)}
					{data && <p className='dropdown-menu-email'>{data.me.email}</p>}
					<hr className='hr-below-email' />
					<div className='avatar-dropdown-dashboard-link'>
						<Link to='/dashboard' onClick={() => setOpen(false)}>
							<div className='avatar-dropdown-lower-icons'>{Gear()}</div>{' '}
							<div>QualityHub Account</div>
						</Link>
					</div>
					<hr />
					<div className='avatar-dropdown-signout-link'>
						<Link to='/' onClick={() => logout()}>
							<div className='avatar-dropdown-lower-icons'>{Signout()}</div>{' '}
							<div>Sign Out</div>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default AvatarDropdown;
