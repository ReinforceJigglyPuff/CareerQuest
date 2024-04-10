import React, { useState } from "react";
import "../../css/WelcomePage.css";
import { useNavigate } from "react-router-dom";



export function WelcomePage() {
  const [username, setUsername] = useState("");
  const [resume, setResume] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // State for error handling
 

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch("http://localhost:3000/top10", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indicate JSON data
        },
        body: JSON.stringify({
          username,
          resume,
          jobTitle,
          location,
        }),
      });

     

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`); // Throw error for non-2xx responses
      }

      const data = await response.json();
      console.log("Success! Fetched data:", data); // Handle successful response (if applicable)
    } catch (error) {
      setErrorMessage(error.message); // Set error message for display
    }
  };

  return (
    <div className="welcome-page">
      <div className="welcome-content">
        <h1 className="Welcome">Welcome!</h1>
        <p>Tell us a bit about yourself and your career goals.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="resume">Paste your Resume Here</label>
            <textarea
              id="resume"
              rows="8"
              cols="50"
              placeholder="Enter your resume content here..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            ></textarea>
          </div>

          <div className="input-group">
            <label htmlFor="jobTitle">What job title are you targeting?</label>
            <input
              type="text"
              id="jobTitle"
              placeholder="e.g. Software Engineer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="location">Where are you located?</label>
            <input
              type="text"
              id="location"
              placeholder="e.g. San Francisco, CA"
              value={location}
              onChange={(e) => setLocation(e.catch)} // Corrected typo (setLocation)
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

          <button type="submit">Get Matched!</button>
        </form>
      </div>
    </div>
  );
}