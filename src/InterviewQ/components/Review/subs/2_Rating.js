import React from 'react';

import Icon from '../../../../global/icons/Icon';
import { ICONS } from '../../../../global/icons/iconConstants';

import './Rating.scss';

const Rating = ({
	handleHover,
	hoverIdx,
	fields,
	index,
	handleClick,
	className = '',
}) => {
	return (
		<>
			{hoverIdx >= index ? (
				<div
					className={`star ${className}`}
					onClick={e => handleClick(e, index)}
					onMouseOver={e => handleHover(e, index)}
					onMouseLeave={e => handleHover(e, fields.rating)}>
					<Icon
						icon={ICONS.STAR_YELLOW}
						width={26}
						height={24}
						color='#FA8C16'
					/>
				</div>
			) : (
				<div
					className='star'
					onClick={e => handleClick(e, index)}
					onMouseOver={e => handleHover(e, index)}
					onMouseLeave={e => handleHover(e, fields.rating)}>
					<Icon icon={ICONS.STAR_FILL} width={26} height={24} color='#EFEFEF' />
				</div>
			)}
		</>
	);
};

export default Rating;
