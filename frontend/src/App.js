import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './component/Register';
import Login from './component/Login';
import Main from './component/Main';
import { useState } from 'react';

const App = () => {
    const [navdis, setnavdis] = useState(false);

    return (
        <Router>
            {navdis ? (
                <Main setnavdis={setnavdis} />
            ) : 
            (
                <div className='main text-white h-[100vh] flex items-center justify-center bg-cover'>
                    <Routes>
                        <Route path="/" element={<Login setnavdis={setnavdis} />} />
                        <Route path="/Register" element={<Register />} />
                         
                    </Routes>
                </div>
            )}
        </Router>
    );
}

export default App;
