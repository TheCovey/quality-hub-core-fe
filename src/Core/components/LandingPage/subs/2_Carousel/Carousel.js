// Libraries
import React, { useState } from 'react';

// Styles
import './Carousel.scss';

// Data
import { FeaturesInfo } from './subs/FeaturesInfo';

// Components
import FeatureCard from './subs/FeatureCard';

export default function Carousel() {
	const [position, setPosition] = useState(0);

	// The number of pixels traversed each time the left or right button is clicked; dependent on hard-coded width of the FeatureCard
	const scrollLength = 280;

	const handleRightClick = () => {
		setPosition(position - scrollLength);
	};

	const handleLeftClick = () => {
		setPosition(position + scrollLength);
	};

	return (
		<div className='features'>
			<h2>Features</h2>
			<div className='carousel'>
				{position < 0 && (
					<button className='scroll-btn left-scroll' onClick={handleLeftClick}>
						&lsaquo;
					</button>
				)}
				<div className='container'>
					<div
						className='content'
						style={{ transform: `translate(${position}px)` }}>
						{FeaturesInfo.map(feature => (
							<FeatureCard
								key={feature.imgUrl}
								imgUrl={feature.imgUrl}
								title={feature.title}
								description={feature.description}
								link={feature.link}
							/>
						))}
					</div>
				</div>
				{position > -1 * (FeaturesInfo.length - 3) * scrollLength && (
					<button
						className='scroll-btn right-scroll'
						onClick={handleRightClick}>
						&rsaquo;
					</button>
				)}
			</div>
		</div>
	);
}
