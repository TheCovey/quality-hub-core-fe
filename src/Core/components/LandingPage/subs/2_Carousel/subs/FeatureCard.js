import React from 'react';

// Feature Card for each item in the landing page carousel
export default function FeatureCard(props) {
	return (
		<div className='feature-card'>
			<img className='feature-img' src={props.imgUrl} alt='' />
			<div className='feature-txt'>
				<div>
					<h2>{props.title}</h2>
					<p>{props.description}</p>
				</div>
				<div className='card-footer'>
					<hr />
					<a href={props.link} target='_blank' rel='noopener noreferrer'>
						<p>Learn More &rarr;</p>
					</a>
				</div>
			</div>
		</div>
	);
}
