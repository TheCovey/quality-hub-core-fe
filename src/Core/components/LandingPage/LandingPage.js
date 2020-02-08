// Libraries
import React from 'react';

// Styles
import './LandingPage.scss';

// Components
import Header from './subs/1_Header';
import Carousel from './subs/2_Carousel';
import Panels from './subs/3_Panels';
import Footer from './subs/4_Footer';

export default function LandingPage() {
	return (
		<div>
			<Header />
			<Carousel />
			<Panels />
			<Footer />
		</div>
	);
}
