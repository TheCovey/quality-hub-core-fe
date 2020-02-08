import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import { confirmed } from '../../../../global/images/confirmed'

const ConfirmedInterview = ({ node }) => {
	const [loading, setLoading] = useState(true);

	const handleLoad = () => {
		setLoading(false);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div ref={node}>
			<img src='/images/confirmed.svg' onLoad={handleLoad} alt='Confirmed' />
			{loading === false ? (
				<>
					<h2>You scheduled an interview!</h2>
					<div className='int-confirmation-text'>
						<p>
							Interviews can be canceled until 24 hours prior to start time with
							no penalty.
						</p>
						<p>
							Also note, you will not be charged if the coach is unable to make
							the meeting.
						</p>
						<Link to='/dashboard/schedule'>
							<button>See Schedule</button>
						</Link>
					</div>
				</>
			) : null}
		</div>
	);
};

export default ConfirmedInterview;
