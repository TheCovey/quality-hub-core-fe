// Libraries
import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import './Header.scss';

// Components
import Typewriter from './TypewriterAnim';

export default function Header() {
	return (
		<div className='banner'>
			<Typewriter />
			<p>
				QualityHub offers the opportunity for anyone to have experienced
				professionals assess the quality of anything.
			</p>
			{localStorage.getItem('token') ? (
				<Link to='/dashboard'>
					<button className='start-btn'>Welcome! Go to your dashboard!</button>
				</Link>
			) : (
				<Link to='/signup'>
					<button className='start-btn'>Get Started</button>
				</Link>
			)}
		</div>
	);
}
