import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (identifier, password) => {
        // Admin login check
        if (identifier === 'Admin' && password === 'Admin@123') {
            const adminUser = { username: 'Admin', email: 'admin@store.com', role: 'admin' };
            setUser(adminUser);
            localStorage.setItem('user', JSON.stringify(adminUser));
            return { success: true };
        }

        // User login check
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(u =>
            (u.email === identifier || u.username === identifier) && u.password === password
        );

        if (foundUser) {
            const { password, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword);
            localStorage.setItem('user', JSON.stringify(userWithoutPassword));
            return { success: true };
        }

        return { success: false, message: 'Invalid credentials' };
    };

    const signup = (userData) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if user already exists
        if (users.some(u => u.email === userData.email || u.username === userData.username)) {
            return { success: false, message: 'User with this email or username already exists' };
        }

        const newUser = { ...userData, role: 'user' };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto login after signup
        const { password, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
