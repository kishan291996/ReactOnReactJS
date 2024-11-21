import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const ControlledForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [contactNo, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const records = useSelector(state => state.records);
    debugger;

    useEffect(() => {
        if (id) {
            const record = records.find(record => record.id === parseInt(id));
            debugger;
            if (record) {
            setName(record.name);
            setEmail(record.email);
            setContact(record.contactNo);
            setSelectedEmployee(record.selectedEmployee);
            setAddress(record.address);
        }
    }
    }, [id, records])

    const employees = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Alice Johnson' }
    ];

    const validate = () => {
        const errors = {};
        if (!name.trim()) {
            errors.name = 'Name is required';
        }
        if (!email.trim()) {
            errors.email = 'Email is required';

        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email address is invalid';
        }
        if (!selectedEmployee) {
            errors.employee = 'Employee selection is required';
        }
        if (!contactNo.trim()) {
            errors.contactNo = "Contact No is required"
        }
        if(!address.trim()){
            errors.address = "Address is required"
        }
        return errors;
    }; const handleSubmit = (e) => {
        e.preventDefault(); const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            const record = { id: id || Date.now(), name, email, contactNo, selectedEmployee, address };
            if (id) {
                dispatch({ type: 'EDIT_RECORD', payload: record });
            } else {
                dispatch({ type: 'ADD_RECORD', payload: record });
            }
            navigate('/records');   
            // console.log('Name:', name, 'Email:', email);
            // setName('');
            // setEmail('');
            // setSelectedEmployee('');
            // SetContact(''); 
            // setErrors({});
        } else { setErrors(validationErrors); }
    };

    return <form onSubmit={handleSubmit}>
        <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>
            }
        </div>
        <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>
            }
        </div>
        <div>
            <input type="contactNo" value={contactNo} onChange={(e) => setContact(e.target.value)} placeholder="Enter contact no" />
            {errors.contactNo && <p style={{ color: 'red' }}>{errors.contactNo}</p>
            }
        </div>
        <div> <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} >
            <option value="">Select an employee</option>
            {employees.map((emp) => (<option key={emp.id} value={emp.name}>{emp.name}</option>))}
        </select>
            {errors.employee && <p style={{ color: 'red' }}>{errors.employee}</p>}
        </div>
        <div>
            <input type="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" />
            {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
        </div>
        <button type="submit">Submit</button>
    </form>
}

export default ControlledForm;

