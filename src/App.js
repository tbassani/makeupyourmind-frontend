import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Routes from '../src/routes/Routes.js';

import Header from '../src/components/base/Header.js';

import { AuthProvider } from '../src/context/AuthContext.js';
import { AppProvider } from '../src/context/AppContext.js';

const App = () => {
  return (
    <div>
      <AuthProvider>
        <AppProvider>
          <Header />
          <div className="App" style={{ justifyContent: 'space-around', display: 'flex', flex: 1 }}>
            <Routes />
          </div>
        </AppProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
