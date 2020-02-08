import React from 'react';

export default function AboutQualityHub() {
	return (
		<div className='landing-page-about' id='about'>
			<div className='landing-page-about-top'>
				<h2>
					Learn more. Earn more. <span className='main-blue'>QualityHub.</span>
				</h2>
				<p>
					Level up your career with QualityHub. We have a large network of
					experienced professionals ready to help your next career move be a big
					success.
				</p>
			</div>
			<div className='landing-page-about-bottom'>
				<div>
					<h2>How does QualityHub work?</h2>
					<ul>
						<li>
							<span className='bullet'></span>Choose a Quality you want to
							improve
						</li>
						<li>
							<span className='bullet'></span>Connect with real professionals
						</li>
						<li>
							<span className='bullet'></span>Iterate on your skills
						</li>
						<li>
							<span className='bullet'></span>Become career ready
						</li>
					</ul>
				</div>
				<div className='landing-page-about-sample-cards'></div>
			</div>
		</div>
	);
}
