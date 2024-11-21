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
  