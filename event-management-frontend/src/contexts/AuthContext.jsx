/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import  { createContext, useState, useEffect,useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user info (e.g., name, email, role)
  const [token, setToken] = useState(null); // Store JWT token
  const [loading, setLoading] = useState(true); // Track loading state

  // Register function
    const register = async (name, email, password, role) => {
        try {
        const response = await axios.post('http://localhost:5000/api/register', { name, email, password,role });
        const { token, user } = response.data; 
        setToken(token);
        setUser(user);
        localStorage.setItem('authToken', token); // Save token in localStorage
        return true;
        } catch (error) {
        console.error('Registration failed:', error.response?.data || error.message);
        return false;
        }
    };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const { token, user } = response.data; // Assume your API returns user info along with the token
      setToken(token);
      setUser(user);
      localStorage.setItem('authToken', token); // Save token in localStorage
      return true;
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken'); // Remove token from localStorage
  };

  // Auto-login on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      // Optionally, fetch user info using the token
      axios
        .get('http://localhost:5000/api/me', { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => setUser(response.data))
        .catch((err) => console.error('Failed to fetch user info:', err));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register ,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
