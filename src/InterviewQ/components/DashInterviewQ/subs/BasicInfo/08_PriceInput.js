import React from 'react';
import PostButtons from './01_PostButtons';

const PriceInput = ({ editing, setEditing, original, post, handleChange, handleCancel, handleSubmit}) => {
  return (
    <div className='IQ-dash-input'>
			<div className='post-row post-price'>
				<span className='IQ-dash-heading'>
					<h4 className="tag-title">PRICE PER SESSION</h4>
				</span>
        <div>
				{editing[4] ? (
					<div className='slider-post'>
						<div className='slider-inner-boxes-post'>
							<div className='slider-dollar-amounts-post'>
								<p>$0</p>
								<p>
									${post.price === 0
										? '0'
										: post.price
										? post.price
										: original && original.price}
								</p>
								<p>$200</p>
							</div>
							<input
								id='edit-post-4'
								name='price-slider'
								type='range'
								min='0'
								max='200'
								value={original.price <= 200 ? post.price : 200}
								onChange={handleChange}
								step='1'
							/>
						</div>
					</div>
				) : (
					<p>${original && original.price}</p>
				)}
        </div>
			</div>
			<div className='edit-btns'>
				<PostButtons
					index={4}
					editing={editing}
					setEditing={setEditing}
					handleCancel={handleCancel}
					handleSubmit={handleSubmit}
				/>
			</div>
		</div>
  )
}

export default PriceInput;