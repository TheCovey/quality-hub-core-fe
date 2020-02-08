import React from 'react';

import Icon from '../../../../global/icons/Icon';
import { ICONS } from '../../../../global/icons/iconConstants';
import {blankavatar2} from '../../../../global/icons/blankavatar';

const StepThree = ({data, image, formState}) => {
    return ( 
        <>
        <p className='add-coach-form-step-title'>STEP 3</p>
							<p className='add-coach-form-sub-title'>Preview</p>
							<p className='add-coach-form-description'>
								This is what seekers will see when your profile matches their
								search parameters. Review the information, and click "Publish"
								for your profile to go live!
							</p>
							<div className='add-coach-form-preview-container'>
								<div className='add-coach-form-preview-close'>
									<Icon
										icon={ICONS.CLOSE}
										width={24}
										height={24}
										color='rgba(0, 0, 0, 0.54)'
									/>
								</div>
								<div className='add-coach-form-preview-top'>
									<div className='add-coach-form-preview-top-text'>
										<p className='add-coach-form-preview-name'>
											{data && `${data.me.first_name} ${data.me.last_name}`}
										</p>
										<p className='add-coach-form-preview-amount'>
											${formState.price} per hour
										</p>
									</div>
									{image ? <img
										className='add-coach-form-preview-coach-photo'
										src={image}
										alt='Coach Profile Pic'
									/> : <div className='profile-img-coach-form'>
										{blankavatar2()}
								</div>}
									
								</div>
								<div className='coachformcard-info'>
									<p>
										<span className='coachcard-icon'>
											<Icon
												icon={ICONS.POSITIONGRAY}
												width={24}
												height={24}
												color='#5F6368'
											/>
										</span>
										{formState.company}
										{formState.company !== '' && formState.position !== ''
											? ' - '
											: null}
										{formState.position}
									</p>
									<p>
										<span className='coachcard-icon'>
											<Icon
												icon={ICONS.LOCATIONGRAY}
												width={24}
												height={24}
												color='#5F6368'
											/>
										</span>
										{data && `${data.me.city}, ${data.me.state}`}
									</p>

									{/* <p>
										<span className='coachcard-icon'>
											<Icon
												icon={ICONS.STAR}
												width={24}
												height={24}
												color='#5F6368'
											/>
										</span>
										4.9
									</p> */}
								</div>
								<div className='add-coach-form-preview-description'>
									<p>{formState.description}</p>
								</div>
								<div className='coachformcard-footer'>
									<div className='coachcard-links'>
										{data && data.me.linkedin_url && (
											<div className='icon1'>
												<Icon icon={ICONS.LINKEDIN} width={24} height={24} color='#5F6368' />
											</div>
										)}
										{data && data.me.twitter_url && (
											<div>
												<Icon icon={ICONS.TWITTER} width={24} height={24} color='#5F6368' />
											</div>
										)}
									</div>
								</div>
								<button className='interview-button' disabled>
									Request Interview
								</button>
							</div>
        </>
     );
}
 
export default StepThree;