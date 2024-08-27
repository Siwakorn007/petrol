import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from 'components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import './Pertrol.css'; // อย่าลืม import ไฟล์ CSS เข้ามา

function Petrol() {
    const [oilTypes, setOilTypes] = useState([]);
    const [newOilType, setNewOilType] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [dailyPrice, setDailyPrice] = useState('');
    const [selectedOilId, setSelectedOilId] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [editingOil, setEditingOil] = useState(null); // สำหรับเก็บข้อมูลน้ำมันที่ต้องการแก้ไข
    const [editedPrice, setEditedPrice] = useState('');

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

                // Fetch the updated oil types and prices
                axios.get('http://localhost:3001/oil-types')
                    .then(response => setOilTypes(response.data))
                    .catch(error => console.error('Error fetching oil types', error));
            })
            .catch(error => console.error('Error updating daily price', error));
    };

    const handleEditOilType = (oil) => {
        setEditingOil(oil);
        setEditedPrice(oil.price);
    };

    const handleSaveEdit = () => {
        axios.put(`http://localhost:3001/oil-types/${editingOil.id}`, { price: editedPrice })
            .then(response => {
                setOilTypes(oilTypes.map(oil => oil.id === editingOil.id ? { ...oil, price: editedPrice } : oil));
                setEditingOil(null); // ปิดฟอร์มแก้ไข
            })
            .catch(error => console.error('Error updating oil price', error));
    };

    return (
        <div style={{ padding: '50px 0px 0px 350px' }}>
            <Sidebar />
            <Outlet />
            <div className='container_pertrol'>
                <h2>Oil Types</h2>
                <table className="oil-table">
                    <thead>
                        <tr>
                            <th>Oil Type</th>
                            <th>Price</th>
                            <th>Last Update</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {oilTypes.map(oil => (
                            <tr key={oil.id}>
                                <td>{oil.name}</td>
                                <td>
                                    {editingOil && editingOil.id === oil.id ? (
                                        <input
                                            type="text"
                                            value={editedPrice}
                                            onChange={(e) => setEditedPrice(e.target.value)}
                                        />
                                    ) : (
                                        oil.price
                                    )}
                                </td>
                                <td>{oil.lastUpdate ? new Date(oil.lastUpdate).toLocaleDateString() : 'N/A'}</td>
                                <td>
                                    {editingOil && editingOil.id === oil.id ? (
                                        <button className="edit-btn" onClick={handleSaveEdit}>Save</button>
                                    ) : (
                                        <button className="edit-btn" onClick={() => handleEditOilType(oil)}>Edit</button>
                                    )}
                                    <button className="delete-btn" onClick={() => handleDeleteOilType(oil.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="add-oil-form">
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
                </div>

                <div className="update-price-form">
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
        </div>
    );
}

export default Petrol;
