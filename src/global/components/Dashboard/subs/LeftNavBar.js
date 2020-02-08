// Libraries
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// Icons
import Icon from '../../../icons/Icon';
import { ICONS } from '../../../icons/iconConstants';

export default function LeftNavBar() {
	let { pathname } = useLocation();

	return (
		<div className='dashboard-left-bar'>
			<NavLink activeClassName='dashnavactive' exact to='/dashboard'>
				<div className='dash-left-menu-btn'>
					<Icon
						icon={ICONS.PERSONALINFO}
						width={24}
						height={24}
						color={pathname === '/dashboard' ? 'white' : '#096dd9'}
					/>
					<div className='dashnav-txt'>Personal Info</div>
				</div>
			</NavLink>
			<NavLink activeClassName='dashnavactive' to='/dashboard/schedule'>
				<div className='dash-left-menu-btn'>
					<Icon
						icon={ICONS.SCHEDULE}
						width={24}
						height={24}
						color={
							pathname === '/dashboard/schedule' ||
							pathname === '/dashboard/schedule/week'
								? 'white'
								: '#096dd9'
						}
					/>
					<div className='dashnav-txt'> Schedule</div>
				</div>
			</NavLink>
			{/* <NavLink activeClassName='dashnavactive' to='/dashboard/coach'>
				<div className='dash-left-menu-btn'>
					<Icon
						icon={ICONS.PAYMENTS}
						width={24}
						height={24}
						color={pathname.includes('/dashboard/coach') ? 'white' : '#096dd9'}
					/>
					<div className='dashnav-txt'> Coach</div>
				</div>
			</NavLink> */}
			<NavLink activeClassName='dashnavactive' to='/dashboard/payments'>
				<div className='dash-left-menu-btn'>
					<Icon
						icon={ICONS.PAYMENTS}
						width={24}
						height={24}
						color={pathname === '/dashboard/payments' ? 'white' : '#096dd9'}
					/>
					<div className='dashnav-txt'> Payments</div>
				</div>
			</NavLink>
			<NavLink activeClassName='dashnavactive' to='/dashboard/settings'>
				<div className='dash-left-menu-btn'>
					<Icon
						icon={ICONS.SETTING}
						width={24}
						height={24}
						color={pathname === '/dashboard/settings' ? 'white' : '#096dd9'}
					/>
					<div className='dashnav-txt'>Settings</div>
				</div>
			</NavLink>
		</div>
	);
}
