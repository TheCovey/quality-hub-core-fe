import React from 'react';
import PostButtons from './01_PostButtons';

const CompanyInput = ({ editing, setEditing, original, post, handleChange, handleCancel, handleSubmit}) => {
  return (
    <div className='IQ-dash-input'>
      <div className='IQ-dash-row post-row'>
        <span className='IQ-dash-heading'>
          <h4 className="tag-title">COMPANY</h4>
        </span>
        <div>
        {editing[0] ? (
            <input
              id='edit-post-0'
              name='company'
              value={post.company}
              onChange={handleChange}
            />
        ) : (
            <p>{original && original.company}</p>
        )}
        </div>
      </div>
      <PostButtons
        index={0}
        editing={editing}
        setEditing={setEditing}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default CompanyInput;