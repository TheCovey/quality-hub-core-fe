import React from 'react';
import { Link } from 'react-router-dom';

export default function ServiceCard({ service }) {
	const backgroundStyle = {
		backgroundImage: `url('/images/${service.img_src}')`,
		backgroundSize: 'cover',
	};

	return (
		<div className='landing-page-service-card'>
			<Link to={service.link}>
				<div
					className='landing-page-service-card-img'
					style={backgroundStyle}></div>
				<div className='landing-page-service-card-txt'>
					<h3>{service.service}</h3>
					<p>{service.description}</p>
				</div>
			</Link>
		</div>
	);
}
