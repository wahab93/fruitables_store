import React, { useState, useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import './App.css';
import './main.js';

import { Bodyspinner } from './components/common/bodyspinner.js';
import { Routing } from './components/common/routing.js';

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate a loading time or wait for actual data loading
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false once done
    }, 2000); // Example: 2 seconds loading time

    return () => clearTimeout(timer); // Cleanup timer if component unmounts
  }, []);

  return (
    <>
      {loading ? <Bodyspinner /> : <Routing />}
    </>
  );
}

export default App;