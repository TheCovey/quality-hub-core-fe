import React from 'react';

const Loading = props => {
	return (
		<div>
			{/* Loading image from loading.io */}
			<img
				src='./loadingIcon.gif'
				height='100px'
				width='100px'
				alt='loading animation'
			/>
		</div>
	);
};

export default Loading;
