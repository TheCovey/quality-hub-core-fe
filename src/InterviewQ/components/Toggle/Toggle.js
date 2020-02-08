import React from 'react';
import './Toggle.scss';

const Switch = () => {
  return (
    <>
      <input
        className="toggle-checkbox"
        id={`toggle-checbox`}
        type="checkbox"
      />
      <label
        className="toggle-label"
        htmlFor={`toggle-checkbox`}
      >
        <span className={`toggle-button`} />
      </label>
    </>
  );
};

export default Switch;