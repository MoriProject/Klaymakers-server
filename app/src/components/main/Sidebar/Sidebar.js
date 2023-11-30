import React from "react";
import { useSelector } from 'react-redux';
import { FaGithub, FaLink } from "react-icons/fa";
import './styles.scss';

const Sidebar = ({ currentPage, changePage }) => {
    const account = useSelector((state) => state.account);

    return (
        <div className='sidebar'>
            <div>
                {/* <button className={currentPage === 'home' ? 'active' : ''} onClick={() => changePage('home')}>Home</button> */}
                <button className={currentPage === 'create' ? 'active' : ''} onClick={() => changePage('create')}>Create Object</button>
                <button className={currentPage === 'market' ? 'active' : ''} onClick={() => changePage('market')}>Market</button>
                <button className={currentPage === 'myobject' ? 'active' : ''} onClick={() => changePage('myobject')}>My Object</button>
                <button className={currentPage === 'mypage' ? 'active' : ''} onClick={() => changePage('mypage')}>My Page</button>
                <button className={currentPage === 'verify' ? 'active' : ''} onClick={() => changePage('verify')}>Verify ownership</button>
                <button className={currentPage === 'withdraw' ? 'active' : ''} onClick={() => changePage('withdraw')}>Withdraw</button>
                {/* {"0xec5656a2fb4CF5A735dE5680361E0292D0274B6c" === account ? <p onClick={() => changePage('withdraw')}>Withdraw</p> : null} */}
            </div>
            <div className="icons">
                <a>
                    <FaGithub size={30} />
                </a>
                <a>
                    <FaLink size={30} />
                </a>
            </div>
        </div>
    )
}

export default Sidebar;