import React from 'react';
import LoginButton from './LoginButton/LoginButton';
import './styles.scss';

const Navbar = () => {
    return (
        <nav className='navbar'>
            To The Moon
            <LoginButton />
        </nav>
    );
}

export default Navbar;