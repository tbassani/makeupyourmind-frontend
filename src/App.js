import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Routes from '../src/routes/Routes.js';

import Header from '../src/components/base/Header.js';

import { UserProvider } from '../src/context/UserContext.js';
import { AppProvider } from '../src/context/AppContext.js';

const App = () => {
  return (
    <div>
      <UserProvider>
        <AppProvider>
          <Header />
          <div className="App" style={{ justifyContent: 'space-around', display: 'flex', flex: 1 }}>
            <Routes />
          </div>
        </AppProvider>
      </UserProvider>
    </div>
  );
};

export default App;
