import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Routes from '../src/routes/Routes.js';

import Header from '../src/components/base/Header.js';

import Spinner from 'react-bootstrap/Spinner';

import { useUser } from './context/UserContext.js';

const App = () => {
  const [signed, setSigned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { jwt, loading } = useUser();
  useEffect(() => {
    setSigned(Boolean(jwt));
    setIsLoading(loading);
  }, [jwt]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  return (
    <div>
      <Header isSigned={signed} />
      {!isLoading ? (
        <div className="App" style={{ justifyContent: 'space-around', display: 'flex', flex: 1 }}>
          <Routes isSigned={signed} />
        </div>
      ) : (
        <div style={{ top: '50%', left: '50%', position: 'absolute' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </div>
  );
};

export default App;
