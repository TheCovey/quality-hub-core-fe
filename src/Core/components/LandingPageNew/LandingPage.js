// Libraries
import React from 'react';

// Styles
import './LandingPage.scss';

// Components
import NavBar from './subs/0_NavBar';
import Header from './subs/1_Header';
import AboutQualityHub from './subs/2_AboutQualityHub';
import Services from './subs/3_Services';
import UserStories from './subs/4_UserStories';
import Footer from './subs/5_Footer';

export default function LandingPage(props) {
	return (
		<div className='landing-page'>
			<NavBar {...props} />
			<Header />
			<AboutQualityHub />
			<Services />
			<UserStories />
			<Footer />
		</div>
	);
}
