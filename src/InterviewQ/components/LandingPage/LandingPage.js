// Library
import React from 'react';

// Styles & Icons
import './LandingPage.scss';
// import Icon from '../../../global/icons/Icon';
// import { ICONS } from '../../../global/icons/iconConstants';

// Components
// import LandingPageHeader from './LandingPageHeader';
import CoachList from './CoachList';

export default function InterviewLandingPage() {
	// Component State
	// const [toggleFilter, setToggleFilter] = useState(true);

	// console.log(localStorage.getItem('token'));

	return (
		<div className='interview-container' id='interview-container'>
			<div
				className='interview-landing-page'
				style={{ margin: !localStorage.getItem('token') && '0 auto' }}>
				{/* <div className='interviewq-search-header-container'>
					{/* <LandingPageHeader /> 
					<div className='interviewq-header-btns'>
						<button
							onClick={() => setToggleFilter(!toggleFilter)}
							style={{
								background: toggleFilter && 'rgba(9, 109, 217, 0.1)',
								color: toggleFilter && '#096dd9',
								border: toggleFilter && '1px solid #096dd9',
							}}>
							<Icon
								icon={ICONS.FILTER}
								width={20}
								height={18}
								color={toggleFilter ? '#096dd9' : '#5f6368'}
							/>
							<span className='filters-btn'>Filters </span>
						</button>
					</div>
				</div> */}
				<div className='landingpage-container'>
					<CoachList />
				</div>
			</div>
		</div>
	);
}
