import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/DashBoard.css';

export const DashBoardPage = () => {
  const [jobListings, setJobListings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/top10')
      .then((response) => response.json())
      .then((data) => {
        setJobListings(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      {jobListings.length > 0 ? (
        <div>
          {jobListings.map((job, index) => (
            <div key={index} className='job-listing'>
              <h2>{job.name}</h2>
              <p>Location: {job.locations.map((loc) => loc.name).join(', ')}</p>
              <p>
                Position: {job.categories.map((cat) => cat.name).join(', ')}
              </p>
              <button
                onClick={() => window.open(job.refs.landing_page)}
                target='_blank'
                rel='noopener noreferrer'
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading jobs...</p>
      )}
    </div>
  );
};
