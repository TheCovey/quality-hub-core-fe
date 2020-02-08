import React from 'react';
import PostButtons from './01_PostButtons';

const IndustryInput = ({ editing, setEditing, original, post, handleChange, handleCancel, handleSubmit, industries}) => {
  return (

    <div className='IQ-dash-input'>
    <div className='IQ-dash-row post-row'>
      <span className='IQ-dash-heading'>
        <h4 className="tag-title">INDUSTRY</h4>
      </span>
      <div>
      {editing[2] ? (
        <select
          id='edit-post-2'
          name='industryName'
          value={post.industryName}
          onChange={handleChange}>
          <option>
            {' '}
            {original && original.industryName
              ? original && original.industryName
              : original && original.industry.name}
          </option>
          {industries &&
            industries.industries.map(industry => (
              <option value={industry.name} key={industry.id}>
                {industry.name}
              </option>
            ))}
        </select>
      ) : (
        <p>
          {original && original.industryName
            ? original && original.industryName
            : original && original.industry.name}
        </p>
      )}
      </div>
    </div>
    <div className='edit-btns'></div>
    <PostButtons
      index={2}
      editing={editing}
      setEditing={setEditing}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
    />
  </div>
  )
}

export default IndustryInput;