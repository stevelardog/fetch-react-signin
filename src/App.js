import React, { useEffect, useState } from 'react';

import axios from 'axios'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Userform from './pages/Userform';

function App() {
  
  return (
    <div>
      
      <Navbar />
      <Userform />
      <Footer />
      </div>
    
  );
}

export default App;
