export const login = (username, password) => {
    if (username === 'admin' && password === 'adminpass') {        
      localStorage.setItem('admin', true);
      return true;
    }
    return false;
  };
  
  export const logout = () => {
    localStorage.removeItem('admin');
  };
  
  export const isAuthenticated = () => {
    return localStorage.getItem('admin') === 'true';
  };
  