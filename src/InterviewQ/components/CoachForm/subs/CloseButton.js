import React from 'react';

//Icons
import Icon from '../../../../global/icons/Icon';
import { ICONS } from '../../../../global/icons/iconConstants';

const CloseButton = ({closeWindow}) => {
	return (
		<button className="close-coach-form-button" onClick={() => closeWindow()}>
			<Icon
				icon={ICONS.CLOSE}
				width={24}
				height={24}
				color="rgba(0, 0, 0, 0.54)"
			/>
		</button>
	);
};

export default CloseButton;
