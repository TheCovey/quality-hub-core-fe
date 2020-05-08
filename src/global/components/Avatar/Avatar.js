// Libraries
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import axios from 'axios';
import './Avatar.scss';

// Icons
import Icon from '../../icons/Icon';
import { ICONS } from '../../icons/iconConstants';

// Queries/Mutations: Remember to export for testing
export const GET_IMG = gql`
	query {
		me {
			id
			image_url
		}
	}
`;

export const EDIT_IMG = gql`
	mutation EditImage($image_url: String) {
		update(image_url: $image_url) {
			image_url
		}
	}
`;

// export const axiosWithAuth = () => {
// 	const token = localStorage.getItem('token');

// 	return axios.create({
// 		baseURL: `https://us1.pusherplatform.io/services/chatkit/v6/5526fd62-fe46-429a-a138-79bac026c3ff/users/`,
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization: `Bearer ${token}`,
// 		},
// 	});
// };

export default function Avatar() {
	const [picture, setPicture] = useState(null);

	const { data } = useQuery(GET_IMG);

	// The editImage mutation sends the profile picture URL to the backend database and also updates the cache (application state)
	const [editImage] = useMutation(EDIT_IMG, {
		update(
			cache,
			{
				data: {
					update: { image_url },
				},
			},
		) {
			const { me } = cache.readQuery({ query: GET_IMG });
			cache.writeQuery({
				query: GET_IMG,
				data: { me: { ...me, image_url } },
			});
		},
	});

	// Use FormData to upload profile picture to Cloudinary and then send the returned URL to the backend database
	// Both 'file' and 'upload_preset' are required for Cloudinary!
	useEffect(() => {
		if (picture) {
			const formData = new FormData();
			formData.append('file', picture);
			formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);

			axios
				.post(
					`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
					formData,
				)
				.then(res => {
					editImage({ variables: { image_url: res.data.secure_url } });
					// axios
					// 	.put(
					// 		`https://us1.pusherplatform.io/services/chatkit/v6/5526fd62-fe46-429a-a138-79bac026c3ff/users/ck43dd34v021n0794b1ebnvqk`,
					// 		{
					// 			avatar_url:
					// 				'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjF65LSx-7mAhWHtlkKHYzAAigQjRx6BAgBEAQ&url=https%3A%2F%2Fsupport.gliffy.com%2Fhc%2Fen-us%2Farticles%2F218653427-Unauthorized-to-Access-Drive-401-Error-&psig=AOvVaw16PDJEiIiHmTAl7gFHdiUJ&ust=1578385851360658',
					// 		},
					// 	)
					// 	.then(response => {
					// 		console.log(response);
					// 	});
				})
				.catch(err => {
					console.log(err);
				});
		}
		//eslint-disable-next-line
	}, [picture]);

	return (
		<div>
			<input
				className='image-input'
				type='file'
				id='imageInput'
				onChange={e => setPicture(e.target.files[0])}
			/>
			<div className='dashboard-avatar-image-button'>
				<label htmlFor='imageInput'>
					<div className='img-wrapper'>
						<div
							className='profile-img'
							style={{
								backgroundImage: `url('${data && data.me.image_url}')`,
							}}>
							{!data && <p className='add-image'>Add Image</p>}
							{data && !data.me.image_url && (
								<Icon
									icon={ICONS.PERSONALINFOBIG}
									width={26}
									height={28}
									color='white'
								/>
							)}
						</div>
						<div className='edit-image'>
							<p>Edit Image</p>
						</div>
					</div>
				</label>
				{data && data.me.image_url && (
					<button
						className='avatar-delete-image-button'
						onClick={() => editImage({ variables: { image_url: null } })}>
						Remove Image
					</button>
				)}
			</div>
		</div>
	);
}
