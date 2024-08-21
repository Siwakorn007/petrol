import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';


function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // เรียก API เพื่อดึงข้อมูลประวัติการทำรายการ
        axios.get('http://localhost:3001/transactions')
            .then(response => setTransactions(response.data))
            .catch(error => console.error('Failed to fetch transactions:', error));
    }, []);

    return (
        <div>
            <NavBar/>
            <h2>Transaction History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.transaction_id}>
                            <td>{transaction.transaction_id}</td>
                            <td>{new Date(transaction.date).toLocaleDateString()}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.amount}</td>
                            <td>${transaction.total_price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionHistory;
