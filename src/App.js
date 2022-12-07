import './App.css';
import Header from './Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LogIn from './LogIn/LogIn.js';
import CaseManagement from './CaseManagement/CaseManagement.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/header" element={<Header />} />
        <Route path="/caseManagement" element={<CaseManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
