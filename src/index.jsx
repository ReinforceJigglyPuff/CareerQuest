import React from 'react';
import { App } from './App.jsx';
import { createRoot } from 'react-dom/client';
const rootElement = createRoot(document.getElementById('root'));
rootElement.render(
  <div>
    <App />
  </div>
);
