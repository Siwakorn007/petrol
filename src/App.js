import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import OilManagement from './pages/OilManagement';
import TransactionHistory from './pages/TransactionHistory';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/oil-management" element={<OilManagement />} />
                <Route path="/transaction-history" element={<TransactionHistory />} />
            </Routes>
        </Router>
    );
}

export default App;
