import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Routes from '../src/routes/Routes.js';

import Header from '../src/components/base/Header.js';

import { UserProvider } from '../src/context/UserContext.js';
import { AppProvider } from '../src/context/AppContext.js';

import { useUser } from './context/UserContext.js';

const App = () => {
  const [signed, setSigned] = useState('');
  const { jwt } = useUser();
  useEffect(() => {
    setSigned(Boolean(jwt));
  }, [jwt]);

  return (
    <div>
      <Header isSigned={signed} />
      <div className="App" style={{ justifyContent: 'space-around', display: 'flex', flex: 1 }}>
        <Routes isSigned={signed} />
      </div>
    </div>
  );
};

export default App;
