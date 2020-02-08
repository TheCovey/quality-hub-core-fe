// Libraries
import React from 'react';

// Icons
import Icon from '../../../../../global/icons/Icon';
import { ICONS } from '../../../../../global/icons/iconConstants';

export default function ProgressBar({ progress }) {
	const mainBlue = `#096dd9`;
	const darkGrey = `#595959`;

	// Dynamic styles for progress bar circles depending on progress
	const circleStyle = prog => {
		return {
			border: progress >= prog && `1px solid ${mainBlue}`,
			backgroundColor:
				progress === 3 ? null : progress === prog ? '#096dd9' : null,
			color: progress === prog && 'white',
		};
	};

	// Dynamic styles for progress bar text depending on progress
	const textStyle = prog => {
		return {
			color:
				progress === prog
					? 'black'
					: progress >= prog
					? `${darkGrey}`
					: '#8c8c8c',
			fontWeight:
				progress === 3 ? 'normal' : progress === prog ? '600' : 'normal',
		};
	};

	// Dynamic styles for progress bar lines depending on progress
	const lineStyle = prog => {
		return { border: progress >= prog && `0.5px solid ${mainBlue}` };
	};

	return (
		<div className='prog-bar'>
			<div className='prog-circle' style={circleStyle(1)}>
				{progress === 1 && '1'}
				{progress > 1 && (
					<Icon icon={ICONS.CHECK} width={14} height={12} color={mainBlue} />
				)}
			</div>
			<p style={textStyle(1)}>Basic Info</p>
			<div className='prog-line' style={lineStyle(2)}></div>
			<div className='prog-circle' style={circleStyle(2)}>
				{progress <= 2 && '2'}
				{progress > 2 && (
					<Icon icon={ICONS.CHECK} width={14} height={12} color={mainBlue} />
				)}
			</div>
			<p style={textStyle(2)}>Linked Accounts</p>
			<div className='prog-line' style={lineStyle(3)}></div>
			<div className='prog-circle' style={circleStyle(3)}>
				{progress < 3 && '3'}
				{progress === 3 && (
					<Icon icon={ICONS.CHECK} width={14} height={12} color={mainBlue} />
				)}
			</div>
			<p style={textStyle(3)}>Done</p>
		</div>
	);
}
