import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import CodeHabit from './CodeHabit';

ReactDOM.render(
  <Router>
    <CodeHabit />
  </Router>,
  document.getElementById('root')
);