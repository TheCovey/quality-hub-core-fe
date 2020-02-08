import React from 'react';
import { Link } from 'react-router-dom';

import CallToActionButton from './6_CallToActionButton';

import Icon from '../../../../global/icons/Icon';
import { ICONS } from '../../../../global/icons/iconConstants';

export default function Footer() {
	return (
		<div className='landing-page-footer'>
			<h2>Power up your career with help from the best.</h2>
			<CallToActionButton />
			<hr />
			<div className='landing-page-footer-logo'>QualityHub</div>
			<div className='landing-page-footer-row'>
				<div>{'\u00a9'} Copyright 2020 QualityHub</div>
				<div className='landing-page-footer-links'>
					<Link to='/'>About</Link>
					<Link to='/'>Privacy</Link>
					<Link to='/'>Terms</Link>
				</div>
				<div className='landing-page-footer-social'>
					<a href='/'>
						<Icon
							icon={ICONS.FACEBOOK}
							width={24}
							height={24}
							color='#9d9fa1'
						/>
					</a>
					<a href='/'>
						<Icon
							icon={ICONS.LINKEDIN}
							width={24}
							height={24}
							color='#9d9fa1'
						/>
					</a>
					<a href='/'>
						<Icon icon={ICONS.TWITTER} width={24} height={24} color='#9d9fa1' />
					</a>
				</div>
			</div>
		</div>
	);
}
