import './App.css';
import Header from './Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LogIn from './LogIn/LogIn.js';
import CaseManagement from './CaseManagement/CaseManagement.js';
import CaseDetail from './CaseDetail/CaseDetail';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/header" element={<Header />} />
        <Route path="/caseManagement" element={<CaseManagement />} />
        <Route path="/caseDetail" element={<CaseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
