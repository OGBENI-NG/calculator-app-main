import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UseContext from './Hook/UseContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UseContext>
      <App />
    </UseContext>
  </React.StrictMode>
);



