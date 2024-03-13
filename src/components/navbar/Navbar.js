import React, {useState, useEffect} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../authentication/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
    const {logout} = useAuth();
    const location = useLocation();

    const toggleSubmenu = () => {
        setIsSubmenuVisible(prevState => !prevState);
    };

    const handleLogout = () => {
        logout();
    }

    useEffect(() => {
        setIsSubmenuVisible(false);
    }, [location]);

  return (
    <header className='header'>
        <div className='profile-container' onClick={toggleSubmenu}>
            <img src='https://via.placeholder.com/40' alt="Profile" className='profile-picture'/>
            {isSubmenuVisible && (
                <div className='submenu'>
                    <button className='submenu_button' onClick={<Navigate to="/"/>}>Home</button>
                    <button className='submenu_button' onClick={(e) => {
                        e.stopPropagation();
                        handleLogout();
                    }}>Logout</button>
                </div>
            )}
        </div>
    </header>
  )
}

export default Navbar