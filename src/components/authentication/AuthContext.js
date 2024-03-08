import React, {createContext, useContext, useState, useEffect} from 'react'

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const email = localStorage.getItem('userEmail');
        if(loggedIn && email){
            setIsLoggedIn(loggedIn);
            setUserEmail(email);
        }
    }, []);

    const login = (email) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        setIsLoggedIn(true);
        setUserEmail(email);
    };

    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        setIsLoggedIn(false);
        setUserEmail('')
    };

    return(
        <AuthContext.Provider value={{isLoggedIn, login, logout, userEmail}}>
            {children}
        </AuthContext.Provider>
    );
};