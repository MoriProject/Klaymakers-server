import React, { useEffect } from 'react';
import LoginButton from './LoginButton/LoginButton';
import './styles.scss';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <p>T T M</p>
            <LoginButton />
        </nav>
    );
}

export default Navbar;