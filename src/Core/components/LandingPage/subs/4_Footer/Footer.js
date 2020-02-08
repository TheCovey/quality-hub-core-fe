// Libraries
import React from 'react';

// Styles
import './Footer.scss';

// Icons
import Icon from '../../../../../global/icons/Icon';
import { ICONS } from '../../../../../global/icons/iconConstants';

export default function Footer() {
	return (
		<div className='footer'>
			<div className='footer-center'>
				<div className='footer-links'>
					<a href='/'>
						<p>About</p>
					</a>
					<a href='/'>
						<p>Privacy</p>
					</a>
					<a href='/'>
						<p>Terms</p>
					</a>
				</div>
				<span>
					<hr className='footer-line' />
				</span>
				<div className='footer-icons'>
					<a href='/'>
						<Icon icon={ICONS.FACEBOOK} width={26} height={26} />
					</a>
					<a href='/'>
						<Icon icon={ICONS.LINKEDIN} width={22} height={24} />
					</a>
					<a href='/'>
						<Icon icon={ICONS.TWITTER} width={22} height={24} />
					</a>
				</div>
			</div>
			<p className='copyright'> &#169; QualityHub 2019</p>
		</div>
	);
}
