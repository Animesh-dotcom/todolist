//
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';

import AppUse from './AppUse';











function App() {
 

  return (
  <Router>
    <Routes>
      <Route exact path='/' element={<AppUse/>}/>
      
       
    </Routes>
  </Router>
  );
}

export default App;
