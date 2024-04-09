import React, {Fragment} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {LoginPage} from './pages/LoginPage';
import {WelcomePage} from './pages/WelcomePage';
export const Pages = () => {
  return (
    <Router>
      <Fragment>
      <Routes>
        <Route path='/' exact element={<LoginPage />} />
        <Route path='/welcome' element={<WelcomePage />} />
      </Routes>
      </Fragment>
    </Router>
  );
};
