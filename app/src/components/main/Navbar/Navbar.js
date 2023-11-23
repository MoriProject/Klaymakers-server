import React from 'react';
import LoginButton from './LoginButton/LoginButton';
import './styles.scss';

const Navbar = ({ changePage }) => {
    return (
        <nav className='navbar'>
            <p onClick={() => changePage('home')}>Home</p>
            <p onClick={() => changePage('home2')}>Home2</p>
            <LoginButton />
        </nav>
    );
}

export default Navbar;