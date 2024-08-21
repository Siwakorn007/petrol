import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OilManagement() {
    const [oils, setOils] = useState([]);
    const [oilName, setOilName] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/oil-types')
          .then(response => setOils(response.data))
          .catch(error => console.error(error));
    }, []);

    const handleAddOil = async () => {
        try {
            await axios.post('http://localhost:3001/add-oil', { oil_name: oilName, price });
            setOilName('');
            setPrice('');
            // Refresh the list
            const response = await axios.get('http://localhost:3001/oil-types');
            setOils(response.data);
        } catch (error) {
            console.error('Failed to add oil', error);
        }
    };

    return (
        <div>
            <h2>Manage Oil Types</h2>
            <ul>
                {oils.map(oil => (
                    <li key={oil.oil_id}>{oil.oil_name}: ${oil.price}</li>
                ))}
            </ul>
            <div>
                <h3>Add New Oil</h3>
                <input type="text" placeholder="Oil Name" value={oilName} onChange={(e) => setOilName(e.target.value)} />
                <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                <button onClick={handleAddOil}>Add Oil</button>
            </div>
        </div>
    );
}

export default OilManagement;
