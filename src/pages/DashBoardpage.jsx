import "../../css/Dashboard.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const DashBoardPage = () => {
  const location = useLocation();
  const data = location.state?.data; // Access data from state (optional check)
  console.log(data, 'data')
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      {data && (
        <div>
          <h2>Data from Welcome Page:</h2>
          {/* Loop through data if available */}
          {data.map((item, index) => (
            <div key={index} className='job-listing'>
              {/* <p>Username: {item.name}</p> */}
              <p>Job Title: {item.job_title}</p>
              <p>Location: {item.location}</p>
              <p>Rating: {item.rating}</p>
              <button
              onClick={() => window.open(item.job_link)}
              target='_blank'
              rel='noopener noreferrer'
            >
              Apply
            </button>
              {/* Display other data from the item object */}
            </div>
          ))}
        </div>
      )}
      {!data && <p>No data available yet.</p>}
    </div>
  );
};








