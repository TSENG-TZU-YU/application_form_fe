import './App.css';
import Header from './Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LogIn from './LogIn/LogIn.js';

//子頁面
import Application from './Application';
import CaseManagement from './CaseManagement/CaseManagement.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/header" element={<Header />}>
          <Route index element={<CaseManagement />} />
          <Route path="application" element={<Application />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
