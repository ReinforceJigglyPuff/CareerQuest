import React from 'react';
import '../../css/WelcomePage.css';

export function WelcomePage() {
  return (
    <div className='welcome-page'>
      <div className='welcome-content'>
        <h1 className='Welcome'>Welcome!</h1>
        <p>Tell us a bit about yourself and your career goals.</p>
        <form>
          <div className='input-group'>
            <label htmlFor='resume'>Paste your Resume Here</label>
            <textarea
              id='resume'
              rows='8'
              cols='50'
              placeholder='Enter your resume content here...'
            ></textarea>
          </div>
          <div className='input-group'>
            <label htmlFor='jobTitle'>What job title are you targeting?</label>
            <input
              type='text'
              id='jobTitle'
              placeholder='e.g. Software Engineer'
            />
          </div>
          <div className='input-group'>
            <label htmlFor='location'>Where are you located?</label>
            <input
              type='text'
              id='location'
              placeholder='e.g. San Francisco, CA'
            />
          </div>
          <button type='submit'>Get Matched!</button>
        </form>
      </div>
    </div>
  );
}
