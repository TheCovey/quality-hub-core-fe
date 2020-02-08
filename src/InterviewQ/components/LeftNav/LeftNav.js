// Libraries
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// Styles
import './LeftNav.scss';

// Icons
import Icon from '../../../global/icons/Icon';
import { ICONS } from '../../../global/icons/iconConstants';

export default function QNav() {
	const { pathname } = useLocation();

	return (
	
		<div className='QNav'>
			<NavLink to='/interviewq' exact activeClassName='QNav-row-highlight'>
				<div className='QNav-row'>
					<Icon
						icon={ICONS.INTERVIEWQ}
						width={24}
						height={22}
						color={!pathname.includes('interviewq/') ? 'white' : '#096dd9'}
					/>
					<div className='QNav-btn'>Search Coach</div>
				</div>
			</NavLink>

			<NavLink to='/interviewq/inbox' activeClassName='QNav-row-highlight'>
				<div className='QNav-row'>
					<Icon
						icon={ICONS.INBOX}
						width={24}
						height={21}
						color={pathname.includes('inbox') ? 'white' : '#096dd9'}
					/>
					<div className='QNav-btn'>Inbox</div>
				</div>
			</NavLink>

			<NavLink to='/interviewq/history' activeClassName='QNav-row-highlight'>
				<div className='QNav-row'>
					<Icon
						icon={ICONS.CLOCK}
						width={24}
						height={21}
						color={pathname.includes('history') ? 'white' : '#096dd9'}
					/>
					<div className='QNav-btn'>History</div>
				</div>
			</NavLink>

			<NavLink to='/interviewq/settings' activeClassName='QNav-row-highlight'>
				<div className='QNav-row'>
					<Icon
						icon={ICONS.SETTING}
						width={24}
						height={22}
						color={pathname.includes('settings') ? 'white' : '#096dd9'}
					/>
					<div className='QNav-btn'>Settings</div>
				</div>
			</NavLink>
		</div>
	
	);
}
