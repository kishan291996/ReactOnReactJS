import React, { useState } from 'react';

const ValidatedForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNo: '',
        address: ''
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validate = () => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email address is invalid';
        }
        if (!formData.contactNo.trim()) {
            errors.contactNo = 'Contact number is required';
        } else if (!/^\d{10}$/.test(formData.contactNo)) {
            errors.contactNo = 'Contact number is invalid';
        }
        if (!formData.address.trim()) {
            errors.address = 'Address is required';
        }
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({
            ...touched,
            [name]: true
        });
        setErrors(validate());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setTouched({
            name: true,
            email: true,
            contactNo: true,
            address: true
        });
        if (Object.keys(validationErrors).length === 0) {
            // Form is valid
            console.log('Form Data:', formData);
            // Reset form
            setFormData({
                name: '',
                email: '',
                contactNo: '',
                address: ''
            });
            setErrors({});
            setTouched({});
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter name"
                />
                {touched.name && errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter email"
                />
                {touched.email && errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>
            <div>
                <label htmlFor="contactNo">Contact Number:</label>
                <input
                    type="text"
                    id="contactNo"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter contact number"
                />
                {touched.contactNo && errors.contactNo && <p style={{ color: 'red' }}>{errors.contactNo}</p>}
            </div>
            <div>
                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter address"
                />
                {touched.address && errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ValidatedForm;
