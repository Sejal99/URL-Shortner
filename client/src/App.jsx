import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Homescreen from './Components/Homescreen';


const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/url" element={<Homescreen />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
