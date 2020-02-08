// Libraries
import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// Styles
import './Search.scss';

import { search } from '../../../../../../global/icons/search';

// GraphQL Query
import { GET_INDUSTRIES, GET_USERS } from '../../../Resolvers';

export default function Search({ fields, setFields, refetch }) {
	const { data: ind_data } = useQuery(GET_INDUSTRIES);
	const [getUsers, { data: user_data }] = useLazyQuery(GET_USERS);
	const [lastChanged, setChanged] = useState();

	const makeArray = data => {
		let ids = data.users.map(user => user.id);
		refetch({ ...fields, ids });
	};

	useEffect(() => {
		if (
			lastChanged === 'industry' ||
			lastChanged === 'orderBy' ||
			lastChanged === 'price' ||
			!lastChanged
		) {
			getUsers({ variables: { tags: fields.tags } });
			let ids = user_data && user_data.users.map(user => user.id);
			refetch({ ...fields, ids });
		}
	}, [fields]);

	useEffect(() => {
		const checkUser = async () => {
			if (user_data) {
				makeArray(user_data);
			}
		};
		checkUser();
		// eslint-disable-next-line
	}, [user_data]);

	const handleChange = e => {
		e.preventDefault();
		setFields({ ...fields, [e.target.name]: e.target.value });
		setChanged(e.target.name);
	};

	const handlePress = e => {
		if (e.keyCode === 13) {
			handleSubmit(e);
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (fields.tags) {
			getUsers({ variables: { tags: fields.tags } });
			if (user_data) {
				makeArray(user_data);
			}
		} else {
			refetch(fields);
		}
	};

	const handleReset = e => {
		e.preventDefault();
		setFields({ tags: '', price: '', industry: '', orderBy: 'id_ASC' });
		setChanged('');
	};

	return (
		<div className='search-container'>
			<h2>Search Coach</h2>
			<div className='search-dropdowns'>
				<div className='search-field'>
					{/* <label>Industry</label> */}
					<select
						name='industry'
						placeholder='Industry'
						onChange={handleChange}
						value={fields.industry}
						required>
						<option value='' disabled hidden>
							Industry
						</option>
						<option value=''>All</option>
						{ind_data &&
							ind_data.industries.map(({ name }) => (
								<option key={name} value={name}>
									{name}
								</option>
							))}
					</select>
				</div>
				<div className='search-field'>
					{/* <label>Price</label> */}
					<select
						name='price'
						placeholder='Price'
						onChange={handleChange}
						value={fields.price}
						required>
						<option value='' disabled hidden>
							Price
						</option>
						<option value=''>All</option>
						<option value='0, 20'>$0-$20</option>
						<option value='21, 50'>$21-$50</option>
						<option value='51, 80'>$51-$80</option>
						<option value='81, 100'>$81-$100</option>
						<option value='101, 1000000'> > $100~</option>
					</select>
				</div>
				<div className='search-field'>
					{/* <label>Sort results by</label> */}
					<select
						name='orderBy'
						placeholder='Order By'
						onChange={handleChange}
						value={fields.orderBy}
						required>
						<option value='' disabled hidden>
							Sort by
						</option>
						<option value='id_ASC'>None</option>
						{/* <option value="asdf">Most reviews</option>
          <option value="fasdfasdf">Least reviews</option> */}
						<option value='price_ASC'>Price, low to high</option>
						<option value='price_DESC'>Price, high to low</option>
						<option value='lastUpdated_DESC'>Newest</option>
						<option value='lastUpdated_ASC'>Oldest</option>
					</select>
				</div>
				{/* <div className='search-field-bottom'> */}
				<div className='search-field-keyword'>
					{/* <label className='search-label-keywords'>Keywords</label> */}
					<input
						className='search-by-keyword-input'
						type='text'
						name='tags'
						value={fields.tags}
						onChange={handleChange}
						placeholder={`Search by Keyword`}
						onKeyDown={handlePress}
					/>

					{/* <div className='search-buttons'> */}
					<button className='search-apply' onClick={e => handleSubmit(e)}>
						{search()}
					</button>
				</div>
				<button className='search-reset' onClick={handleReset}>
					Reset
				</button>
				{/* </div> */}
				{/* </div> */}
				{/* <div className="search-tags-container">
				<p className="search-tags"> {fields.tags} X </p>
				</div> */}
			</div>
		</div>
	);
}
