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
  const [caseManagement, setCaseManagement] = useState(false);
  const [trial, setTrial] = useState(false);
  const [addStatus, setAddStatus] = useState(true);
  const [handlerSelect, setHandlerSelect] = useState(true);
  const [caseNum, setCaseNum] = useState('');
  const [caseId, setCaseId] = useState('');

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
            <Route
              index
              element={
                <CaseManagement setCaseNum={setCaseNum} setCaseId={setCaseId} />
              }
            />
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
            {/* detail */}
            <Route path="caseDetail" element={<CaseDetail caseNum={caseNum} />}>
              <Route
                // index
                path="application/:num"
                element={
                  <ApplicationForm
                    setAddStatus={setAddStatus}
                    addStatus={addStatus}
                    caseNum={caseNum}
                    handlerSelect={handlerSelect}
                    setHandlerSelect={setHandlerSelect}
                    caseId={caseId}
                  />
                }
              />
              <Route path="chatPage/:num" element={<ChatPage />} />
              <Route
                path="uploadPage/:num"
                element={
                  <UploadPage
                    setAddStatus={setAddStatus}
                    addStatus={addStatus}
                    caseNum={caseNum}
                    caseId={caseId}
                  />
                }
              />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
