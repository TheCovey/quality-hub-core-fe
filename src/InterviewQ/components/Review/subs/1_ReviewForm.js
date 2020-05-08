import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { CREATE_REVIEW, GET_SEEKER_BOOKINGS } from '../Resolvers';
import Rating from './2_Rating';
import './ReviewForm.scss';

const ReviewForm = props => {
  const [submitReview, { called, loading, error }] = useMutation(CREATE_REVIEW, {
    update(cache, {data: { createReview }}) {
      const data = cache.readQuery({query: GET_SEEKER_BOOKINGS, variables: {seeker_id: localStorage.getItem('id')}})
      const bookings = data.bookingsBySeeker;
      const id = props.id
      const newBookings = bookings.map(booking => {
        if (booking.uniquecheck === id) {
          return {...booking, review: createReview}
        }
        return booking
      })
      cache.writeQuery({query: GET_SEEKER_BOOKINGS, data: {...data, bookingsBySeeker: newBookings}})
    }
  });

  const [fields, setFields] = useState({rating: 0, review: ""})
  const [fieldsError, setError] = useState({rating: ""})
  const [hoverIdx, setHover] = useState();
  const messages = [
    '',
    'Never again!',
    'Meh.',
    'Not bad.',
    'Solid!',
    'Super great!'
  ]

  const handleHover = (e, index) => {
    setHover(index);
  }

  const handleChange = e => {
    e.preventDefault();
    setFields({...fields, [e.target.name]: e.target.value})
  }

  const handleClick = (e, index) => {
    setFields({...fields, rating: index })
    setHover(index);
    checkError(index);
  }

  const handleSubmit = e => {
    e.preventDefault();
    let id = props.id;
    if (checkError(fields.rating)) {
      submitReview({variables: { review: fields.review, rating: Number(fields.rating), uniqueBooking: id}})
    }
  }

  const checkError = (rating) => {
    if (!rating) {
      setError({...fieldsError, rating: "Rating must be at least one star"})
      return false
    } else {
      setError({...fieldsError, rating: ""})
      return true
    }
  }

  let stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(<Rating key={i} hoverIdx={hoverIdx} handleHover={handleHover} handleClick={handleClick} index={i + 1} fields={fields} />)
  }

  useEffect(() => {
    if (called && !loading && !error) {
      props.setOpen(true);
    }
    //eslint-disable-next-line
  }, [called, loading])

	return (
		<form className='review-form'>
      <div className='review-container'>
        <div className='rating-form'>
          <p className='label'>How did {props.location.state.firstName} do? </p>
          {fieldsError.rating && <p>{fieldsError.rating}</p>}
          <div className='rating-container'>
            <div className={`stars-container ${fieldsError.rating ? 'error' : ''}`}>
              {stars}
            </div>
            <p className='message'>{messages[hoverIdx]}</p>
          </div> 
        </div>
        <div className='review-text'>
          <p className='label'>Any feedback you want to share?</p>
          <textarea onChange={handleChange} className='review-text-area' name='review' placeholder='I thought the interview was...' value={fields.review}/>
        </div>
      </div>
      <div className='button-container'>
        <Link to ='/interviewq/history' className='review-button button cancel'>Cancel</Link>
        <p className='review-button button submit' onClick={handleSubmit}>Submit</p>
      </div>
		</form>
	);
};

export default ReviewForm;
