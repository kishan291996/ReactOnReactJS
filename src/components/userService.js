export const registerUser = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
  
      return response.text();
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };
  
  // Function to log in a user
  export const loginUser = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
  
      return response.text();
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  };
  