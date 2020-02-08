// Libraries
import React from 'react';

// Styles
import './Panels.scss';

export default function Panels() {
	return (
		<div className='panel-wrapper'>
			<div className='panel panel-odd'>
				<div className='panel-section panel-text'>
					<h2>Find the perfect service</h2>
					<p>Find the QualityHub service you want to use.</p>
				</div>
				<img
					className='panel-section panel-img'
					src={
						'https://cdn.shopify.com/s/files/1/0863/0604/products/QuailMale8x10.jpg?v=1531877289'
					}
					style={{ transform: 'scaleX(-1)' }}
					alt=''
				/>
			</div>
			<div className='panel panel-even'>
				<div className='panel-section panel-text'>
					<h2>Supercharge your skills</h2>
					<p>
						Check out the service and level up the quality of your skills in
						many areas
					</p>
				</div>
				<img
					className='panel-section panel-img'
					src={
						'https://cdn.costumewall.com/wp-content/uploads/2017/02/quailman.jpg'
					}
					style={{ transform: 'scaleX(-1)' }}
					alt=''
				/>
			</div>
			<div className='panel panel-odd'>
				<div className='panel-section panel-text'>
					<h2>See important info at a glance</h2>
					<p>
						Keep an eye on your dashboard to get a bird's eye view of your
						account.
					</p>
				</div>
				<img
					className='panel-section panel-img'
					src={
						'https://farm5.static.flickr.com/4891/45821591595_616b6fed4b_b.jpg'
					}
					style={{ transform: 'scaleX(-1)' }}
					alt=''
				/>
			</div>
			<div className='panel panel-even'>
				<div className='panel-section panel-text'>
					<p>
						"If you want a great coach to help you, InterviewQ is your best bet.
						My coach took me to another level in helping me with the interview."
					</p>
				</div>
				<img
					className='panel-section panel-img'
					src={'https://i.ytimg.com/vi/w8I065WZnms/hqdefault.jpg'}
					style={{ transform: 'scaleX(-1)' }}
					alt=''
				/>
			</div>
		</div>
	);
}
