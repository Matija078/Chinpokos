import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './components/LoginPage';

ReactDOM.render(
  <Router>
    <LoginPage />
  </Router>,
  document.getElementById('root')
);
