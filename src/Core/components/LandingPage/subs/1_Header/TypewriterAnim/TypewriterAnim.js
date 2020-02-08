// Libraries
import React, { useState, useEffect, useRef } from 'react';

// Styles
import './Typewriter.scss';

export default function Typewriter() {
  let [seconds, setTime] = useState(0);
  const text = useRef({wordIndex: 0, text: '', letterIndex: 0})
	// array with texts to type in typewriter
	let dataText = ['Interviews', 'Code', 'Designs', 'Resumes', 'Quailcoin'];

  useEffect(() => {
    let key = setInterval(() => {
      setTime(seconds => seconds + 1);
    }, 100)
    return () => clearInterval(key)
  }, [])

  useEffect(() => {
    if (text.current.wordIndex >= dataText.length) {
      text.current.wordIndex = 0;
		} else {
      text.current.text = (dataText[text.current.wordIndex].substring(0, text.current.letterIndex + 1));
      text.current.letterIndex++;
			// Add delay when word is completed
			if (text.current.letterIndex === dataText[text.current.wordIndex].length - 1) {
        setTimeout(() => {
          text.current.wordIndex = text.current.wordIndex + 1;
          text.current.letterIndex = 0;
        }, 1000)
			}
    }
  }, [seconds])

	return (
		<div className='typewriter-text'>
			<h1>
				The best way to assess the quality of {text.current.text}
				<span className='blinking-cursor'>|</span>
			</h1>
		</div>
	);
}
