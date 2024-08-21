import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/oil-management">Manage Oil Types</Link></li>
                <li><Link to="/inventory-management">Manage Inventory</Link></li>
                <li><Link to="/transaction-history">Transaction History</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
