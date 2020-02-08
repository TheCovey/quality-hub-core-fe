import React from 'react';
import PropTypes from 'prop-types';

export default function Icon(props) {
	const styles = {
		svg: {
			display: 'inline-block',
			verticalAlign: 'middle',
		},
		path: {
			fill: props.color,
		},
	};

	return (
		<svg
			width={`${props.width}`}
			height={`${props.height}`}
			viewBox={`0 0 ${props.width} ${props.height}`}
			stroke={`${props.stroke}`}
			xmlns='http://www.w3.org/2000/svg'>
			<path style={styles.path} d={props.icon} />
		</svg>
	);
}

Icon.propTypes = {
	icon: PropTypes.string.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
	color: PropTypes.string,
	stroke: PropTypes.string,
};

Icon.defaultProps = {
	color: 'black',
};
