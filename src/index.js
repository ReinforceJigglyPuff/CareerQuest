import React from 'react';
import { App } from './App.jsx';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { WelcomePage } from './pages/WelcomePage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { SigninPage } from './pages/SigninPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<SigninPage />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
    </Route>
  )
);

const rootElement = createRoot(document.getElementById('root'));
rootElement.render(<RouterProvider router={router} />);
