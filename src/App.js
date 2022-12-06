import './App.css';
import Header from './Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={< />} /> */}

                <Route path="/header" element={<Header/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
