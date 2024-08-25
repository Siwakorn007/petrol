import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from 'components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

function Petrol() {
    const [oilTypes, setOilTypes] = useState([]);
    const [newOilType, setNewOilType] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [dailyPrice, setDailyPrice] = useState('');
    const [selectedOilId, setSelectedOilId] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/oil-types')
            .then(response => setOilTypes(response.data))
            .catch(error => console.error('Error fetching oil types', error));
    }, []);

    const handleAddOilType = () => {
        axios.post('http://localhost:3001/oil-types', { name: newOilType, price: newPrice })
            .then(response => {
                setOilTypes([...oilTypes, response.data]);
                setNewOilType('');
                setNewPrice('');
            })
            .catch(error => console.error('Error adding oil type', error));
    };

    const handleDeleteOilType = (id) => {
        axios.delete(`http://localhost:3001/oil-types/${id}`)
            .then(() => {
                setOilTypes(oilTypes.filter(oil => oil.id !== id));
            })
            .catch(error => console.error('Error deleting oil type', error));
    };

    const handleUpdateDailyPrice = () => {
        axios.post('http://localhost:3001/oil-price', {
            oilId: selectedOilId,
            price: dailyPrice,
            date: selectedDate
        })
            .then(response => {
                alert('Price updated successfully');
                setDailyPrice('');
                setSelectedOilId('');
                setSelectedDate('');
            })
            .catch(error => console.error('Error updating daily price', error));
    };

    return (
        <div style={{ padding: '50px 0px 0px 370px' }}>
            <Sidebar />
            <Outlet />
            <div>
                <h2>Oil Types</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Oil Type</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {oilTypes.map(oil => (
                            <tr key={oil.id}>
                                <td>{oil.name}</td>
                                <td>{oil.price}</td>
                                <td>
                                    <button>Edit</button>
                                    <button onClick={() => handleDeleteOilType(oil.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3>Add New Oil Type</h3>
                <input 
                    type="text" 
                    value={newOilType} 
                    onChange={(e) => setNewOilType(e.target.value)} 
                    placeholder="Oil Type" 
                />
                <input 
                    type="text" 
                    value={newPrice} 
                    onChange={(e) => setNewPrice(e.target.value)} 
                    placeholder="Price" 
                />
                <button onClick={handleAddOilType}>Add</button>

                <h3>Update Daily Oil Price</h3>
                <select 
                    value={selectedOilId} 
                    onChange={(e) => setSelectedOilId(e.target.value)}
                >
                    <option value="">Select Oil Type</option>
                    {oilTypes.map(oil => (
                        <option key={oil.id} value={oil.id}>
                            {oil.name}
                        </option>
                    ))}
                </select>
                <input 
                    type="text" 
                    value={dailyPrice} 
                    onChange={(e) => setDailyPrice(e.target.value)} 
                    placeholder="New Daily Price" 
                />
                <input 
                    type="date" 
                    value={selectedDate} 
                    onChange={(e) => setSelectedDate(e.target.value)} 
                />
                <button onClick={handleUpdateDailyPrice}>Update Price</button>
            </div>
        </div>
    );
}

export default Petrol;
