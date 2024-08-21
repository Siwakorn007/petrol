import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div>
            <h1>Manager Dashboard</h1>
            <nav>
                <ul>
                    <li><Link to="/oil-management">Manage Oil Types</Link></li>
                    <li><Link to="/inventory-management">Manage Inventory</Link></li>
                    <li><Link to="/transaction-history">Transaction History</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Dashboard;
