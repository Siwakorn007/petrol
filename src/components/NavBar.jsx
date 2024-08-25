import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">Gas Station Management</div>
            <div>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/oil-management">Oil Management</Link>
                <Link to="/transaction-history">Transaction History</Link>
                <Link to="/">Logout</Link>
            </div>
        </nav>
    );
}

export default Navbar;
