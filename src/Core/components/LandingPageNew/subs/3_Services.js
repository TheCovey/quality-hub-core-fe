import React from 'react';

import { services } from './3b_ServicesData';

import ServiceCard from './3a_ServiceCard';

export default function Services() {
	return (
		<div className='landing-page-services' id='services'>
			<div className='landing-page-services-header'>
				<h2>Pick the service you want to improve</h2>
				<p>
					Level up your career with QualityHub. We have a large network of
					experienced professionals ready to help your next career move be a big
					success.
				</p>
			</div>
			<div className='landing-page-services-cards-wrapper'>
				{services.map(service => (
					<ServiceCard key={service.service} service={service} />
				))}
			</div>
		</div>
	);
}
