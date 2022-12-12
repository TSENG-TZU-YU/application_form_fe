import './App.css';
import React, { useState } from 'react';
import Header from './Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LogIn from './LogIn/LogIn.js';

// 登入元件
import { AuthProvider } from './utils/use_auth';

//子頁面
import Application from './Application';
import CaseManagement from './CaseManagement/CaseManagement.js';
import CaseDetail from './CaseDetail/CaseDetail';
import ApplicationForm from './CaseDetail/Component/ApplicationForm';
import UploadPage from './CaseDetail/Component/UploadPage';
import ChatPage from './CaseDetail/Component/ChatPage';

function App() {
  const [application, setApplication] = useState(false);
  const [caseManagement, setCaseManagement] = useState(true);
  const [trial, setTrial] = useState(false);
  // console.log('application', application);
  // console.log('caseManagement', caseManagement);
  // console.log('trial', trial);
  return (
    <BrowserRouter>
      <AuthProvider>
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

          <Route path="/caseDetail/" element={<CaseDetail />}>
            <Route path="/caseDetail/appForm" element={<ApplicationForm />} />
            <Route path="/caseDetail/chatPage" element={<ChatPage />} />
            <Route path="/caseDetail/uploadPage" element={<UploadPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
