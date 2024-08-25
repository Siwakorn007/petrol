import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import OilManagement from './pages/OilManagement';
import TransactionHistory from './pages/TransactionHistory';
import 'boxicons/css/boxicons.min.css';
import AppLayout from 'components/layout/AppLayout';
import Blank from 'pages/Blank';
import './App.scss';
import Petrol from 'pages/Petrol';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<AppLayout />} />
                <Route path="/started" element={<Blank />} />
                <Route path="/calender" element={<Blank />} />
                <Route path="/order" element={<Blank />} />
                
                <Route path="/oil-management" element={<OilManagement />} />
                <Route path="/petrol" element={<Petrol />} />
                <Route path="/transaction-history" element={<TransactionHistory />} />
            </Routes>
        </Router>
    );
}

export default App;
