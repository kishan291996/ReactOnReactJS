const API_URL = 'http://localhost:5000/api';

export const addEmployee = async (employee) => {
    try {
        const response = await fetch(`${API_URL}/addEmployee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });

        if (!response.ok) {
            throw new Error('Failed to add employee');
        }

        return response.json();
    } catch (error) {
        console.error('Error adding employee:', error);
        return null;
    }
};

export const fetchEmployees = async () => {
    try {
        const response = await fetch(`${API_URL}/employees`);
        if (!response.ok) {
            throw new Error('Failed to fetch employees');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching employees:', error);
        return [];
    }
};
