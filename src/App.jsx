import React from 'react';
// import {Pages} from './Pages';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return(
    <div>
      <Outlet />
    </div>
  )
  
};
