export const submitContactForm = async (formData) => {
    try {
        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

        return response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const fetchContacts = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/contact');
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
    }
};