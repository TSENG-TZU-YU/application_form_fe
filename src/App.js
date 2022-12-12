import './App.css';
import Header from './Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LogIn from './LogIn/LogIn.js';
import CaseManagement from './CaseManagement/CaseManagement.js';
import CaseDetail from './CaseDetail/CaseDetail';
import ApplicationForm from './CaseDetail/Component/ApplicationForm';
import UploadPage from './CaseDetail/Component/UploadPage';
import ChatPage from './CaseDetail/Component/ChatPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/header" element={<Header />} />
        <Route path="/caseManagement" element={<CaseManagement />} />
        <Route path="/caseDetail" element={<CaseDetail />} />

        <Route path="/caseDetail/" element={<CaseDetail />}>
          <Route path="/caseDetail/appForm" element={<ApplicationForm />} />
          <Route path="/caseDetail/chatPage" element={<ChatPage />} />
          <Route path="/caseDetail/uploadPage" element={<UploadPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
