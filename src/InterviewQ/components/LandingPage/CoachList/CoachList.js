// Libraries
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Search from './subs/0_Search';
import CoachCard from './subs/1_CoachCard';

import './CoachList.scss';

import Loading from '../../../../global/components/Loading';
import { GET_POSTS } from '../Resolvers';

const CoachList = ({ history, toggleFilter, setToggleFilter }) => {
	const [fields, setFields] = useState({
		tags: '',
		price: '',
		industry: '',
		orderBy: 'id_ASC',
	});

	const { refetch, loading, data } = useQuery(GET_POSTS, {
		fetchPolicy: 'network-only',
	});

	return (
		<>
			{!localStorage.getItem('token') ? (
				<div className='coach-list-container-signedout'>
					<Search
						setFields={setFields}
						fields={fields}
						refetch={refetch}
						toggleFilter={toggleFilter}
						setToggleFilter={setToggleFilter}
					/>

					{loading && <Loading />}
					{!loading && data && (
						<div className='coach-list'>
							{data.posts.map(post => (
								<CoachCard key={post.id} post={post} history={history} />
							))}
						</div>
					)}
				</div>
			) : (
				<div className='coach-list-container'>
					{/* <div className={toggleFilter ? '' : 'hidden'}> */}
					<Search
						setFields={setFields}
						fields={fields}
						refetch={refetch}
						toggleFilter={toggleFilter}
						setToggleFilter={setToggleFilter}
					/>

					{/* </div> */}
					{loading && <Loading />}
					{!loading && data && (
						<div className='coach-list'>
							{data.posts.map(post => (
								<CoachCard key={post.id} post={post} history={history} />
							))}
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default CoachList;
