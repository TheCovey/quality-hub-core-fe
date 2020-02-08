import React from 'react';
import PostButtons from './01_PostButtons';

const TagInput = ({ editing, setEditing, original, post, handleChange, handleCancel, handleSubmit, tagArray}) => {
  return (
    <div className='IQ-dash-input'>
      <div className='post-row post-tag'>
        <span className='IQ-dash-heading'>
          <h4 className="tag-title">KEYWORDS</h4>
        </span>
        <div className= 'big-tag-boi'>
          <div className='tag-form'>
            {editing[5] && (
              <div className='tag-input'>
                <input
                  id='edit-post-5'
                  type='text'
                  name='tagString'
                  placeholder='Add tags here (i.e Javascript, Node ..)'
                  value={post.tagString}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className='tags-container'>
              <p>
                {original && original.tagString
                  ? original && original.tagString
                  : original && tagArray}
              </p>
            </div>
          </div> 
        </div>
      </div>
      <div className='edit-btns'>
        <PostButtons
          index={5}
          editing={editing}
          setEditing={setEditing}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default TagInput;