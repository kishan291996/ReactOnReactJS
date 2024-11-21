import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const CrudApp = () => {
    // Initial data
    const initialData = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];


    const [data, setData] = useState(initialData);
    const [name, setName] = useState('');
    const [editId, setEditId] = useState(null);

    // Create
    const handleAdd = () => {
        if (name) {
            const newItem = { id: data.length + 1, name };
            setData([...data, newItem]); setName('');
        }
    };
    // Update
    const handleEdit = (item) => { setName(item.name); setEditId(item.id); };
    const handleUpdate = () => {
        if (name && editId !== null) { setData(data.map(item => (item.id === editId ? { ...item, name } : item))); setName(''); setEditId(null); }
    };

    // Delete
    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id));
    }


    return (
        <div>            
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
            <button onClick={editId === null ? handleAdd : handleUpdate}>
                {editId === null ? 'Add' : 'Update'} </button> 
                <ul>
                {data.map(item => (<li key={item.id}> {item.name}

                    <i className="fas fa-edit" onClick={() => handleEdit(item)}></i>
                    <i onClick={() => handleDelete(item.id)} className="fas fa-trash-alt"></i>

                </li>
            ))} </ul> 
                
                </div>
    );
}

export default CrudApp;