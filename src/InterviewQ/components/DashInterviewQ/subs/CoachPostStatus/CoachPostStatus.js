import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_COACH_POST, UPDATE_POST } from '../Resolvers';
import UnpublishModal from './UnpublishModal/UnpublishModal';
import DoneModal from '../../../CoachForm/subs/DoneModal';
import PublishedModal from './UnpublishModal/PublishedModal';

const CoachPostStatus = () => {
  const { loading, data: coachPost } = useQuery(GET_COACH_POST, {
		variables: { coach_id: localStorage.getItem('id') },
  });
  
  const [updatePost] = useMutation(UPDATE_POST)
  const [published, setPublished] = useState();

  const node = useRef();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open === true || success === true) {
      document.getElementById('overlay-confirm-interview').style.display = 'block';
    }  else {
      document.getElementById('overlay-confirm-interview').style.display = 'none';
    }
  }, [open, success]);

  useEffect(() => {
		if (open || success) {
			document.addEventListener('mousedown', handleOutsideClick);
		} else {
			document.removeEventListener('mousedown', handleOutsideClick);
		}
	}, [open]);

  const handleOutsideClick = e => {
		if (node.current) {
			if (node.current.contains(e.target)) {
				return;
			} else {
        setOpen(false);
        setSuccess(false);
			}
		} else {
      setOpen(false);
      setSuccess(false);
		}
	};

  useEffect(() => {
		if (coachPost) {
			setPublished(coachPost.postByCoach.isPublished)
		}
  }, [coachPost]);
  
  const handleSubmit = e => {
    e.preventDefault();
		updatePost({ variables: { id: coachPost.postByCoach.id, isPublished: !published } })
			.then(res => {
        console.log(res)
        setPublished(!published);
        if (published === true){
          console.log('published is true')
          setOpen(false)
        } else if (published === false){
          setSuccess(false);
          console.log('published is false')
        }
			})
			.catch(err => {
				console.log(err);
			});
	};
  
  return (
		<div className='coach-post-status'>
			<div id='overlay-confirm-interview'></div>
			<h2 className='coach-post-status-header'>Coach Post Status</h2>
			{!loading && (
				<div className='coach-post-status-row'>
					<p>
						Your coach post is currently{' '}
						{published ? 'published' : 'unpublished'}.
					</p>

					{published ? (
						<button className='update-post-btn' onClick={() => setOpen(true)}>
							Unpublish
						</button>
					) : (
						<button onClick={() => setSuccess(true)} className='update-post-btn'>Publish</button>
					)}
				</div>
			)}
			{loading && null}
			{open && (
				<UnpublishModal
					node={node}
					setOpen={setOpen}
					handleSubmit={handleSubmit}
				/>
			)}
      	{success && (
				<PublishedModal
					node={node}
          setSuccess={setSuccess}
          handleSubmit={handleSubmit}
				/>
			)}
		</div>
	);
}

export default CoachPostStatus;