import './App.css';
import React, { useState } from 'react';
import Header from './Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LogIn from './LogIn/LogIn.js';

//子頁面
import Application from './Application';
import CaseManagement from './CaseManagement/CaseManagement.js';
function App() {
  const [application, setApplication] = useState(false);
  const [caseManagement, setCaseManagement] = useState(true);
  const [trial, setTrial] = useState(false);
  // console.log('application', application);
  // console.log('caseManagement', caseManagement);
  // console.log('trial', trial);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route
          path="header"
          element={
            <Header
              setApplication={setApplication}
              application={application}
              setCaseManagement={setCaseManagement}
              caseManagement={caseManagement}
              setTrial={setTrial}
              trial={trial}
            />
          }
        >
          <Route index element={<CaseManagement />} />
          <Route
            path="application"
            element={
              <Application
                setApplication={setApplication}
                setCaseManagement={setCaseManagement}
                setTrial={setTrial}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
