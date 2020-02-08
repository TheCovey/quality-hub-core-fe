import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import PostButtons from '../../../DashInterviewQ/subs/BasicInfo/01_PostButtons';
import Rating from '../../../Review/subs/2_Rating';

import { UPDATE_REVIEW } from '../Resolvers';

import styles from './EditReview.module.scss';

export default function HistoryReview({ review }) {
	const messages = [
		'',
		'Never again!',
		'Meh.',
		'Not bad.',
		'Solid!',
		'Super great!',
  ];
  
  const [editing, setEditing] = useState([false, false]);
  const [fields, setFields] = useState({});
  const [original, setOriginal] = useState({})
  const [hoverIdx, setHover] = useState();
  const [updateReview] = useMutation(UPDATE_REVIEW);

  useEffect(() => {
    if (review) {
      const {review: desc, rating} = review;
      setFields({review: desc, rating: rating})
      setHover(review.rating);
      setOriginal({review: desc, rating: rating})
    }
  },[review])

  const handleHover = (e, score) => {
    if (editing[0]) {
      setHover(score);
    }
  }

  const handleClick = (e, score) => {
    if (editing[0]) { 
      setFields({...fields, rating: score })
      setHover(score);
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    setFields({...fields, review: e.target.value})
  }

  const handleCancel = (index) => {
    let newEdit = [...editing];
    newEdit[index] = false;
    setEditing(newEdit);
    setFields(original);
    if (index === 0) {
      setHover(original.rating);
    }
  }

  const handleSubmit = (e, index) => {
    updateReview({ variables: {...fields, id: review.id}})
      .then(({ data: { updateReview }}) => {
        setOriginal(updateReview)
        let newEdit = [...editing];
        newEdit[index] = false;
        setEditing(newEdit);
      });
  }

  let stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(<Rating className={(editing[0] ? '' : `${styles['not-editable']}`)} key={i} hoverIdx={hoverIdx} handleHover={handleHover} handleClick={handleClick} index={i + 1} fields={fields} />)
  }

	return (
		<div className='history-review'>
      {review &&
      <>
			<h4>Rating</h4>
			<div className={styles.field}>
				<div className={`${styles.stars} stars-container`}>
          {stars}
          <p className='message'>{messages[hoverIdx]}</p>
				</div>
        <span id="edit-post-0">
        <PostButtons 
          editing={editing}
          setEditing={setEditing}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          index={0}
        />
        </span>
			</div>
			<h4>Review</h4>
      <div className={`${styles.field} ${styles.desc}`}>
        { (!editing[1] 
        ? <p>{review.review}</p> 
        : <textarea
            className={styles.input}
            id="edit-post-1"
            type="text"
            value={fields.review}
            onChange={handleChange}
          />     
        )}
        <PostButtons 
          editing={editing}
          setEditing={setEditing}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          index={1}
        />
      </div>
      </>
      }
		</div>
	);
}
