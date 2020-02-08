import React from 'react';
import PostButtons from './01_PostButtons';

const PositionInput = ({ editing, setEditing, original, post, handleChange, handleCancel, handleSubmit}) => {
	return (
		<div className='IQ-dash-input'>
			<div className='IQ-dash-row post-row'>
				<span className='IQ-dash-heading'>
					<h4 className='tag-title'>POSITION</h4>
				</span>
        <div>
				{editing[1] ? (
					<input
						id='edit-post-1'
						name='position'
						value={post.position}
						onChange={handleChange}
					/>
				) : (
					<p className='IQ-dash-position'>{original && original.position}</p>
				)}
        </div>
			</div>
			<PostButtons
				index={1}
				editing={editing}
				setEditing={setEditing}
				handleCancel={handleCancel}
				handleSubmit={handleSubmit}
			/>
		</div>
	);
};

export default PositionInput;