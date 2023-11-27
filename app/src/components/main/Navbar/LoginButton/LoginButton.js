import React, { useState } from 'react';
import Web3 from 'web3';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';

const LoginButton = () => {

    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await web3.eth.getAccounts();
                dispatch({ type: 'SET_ACCOUNT', payload: accounts[0] });
                setIsDropdownVisible(true);
            } catch (error) {
                console.error("Failed to connect wallet", error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    const disconnectWallet = () => {
        dispatch({ type: 'CLEAR_ACCOUNT' });
        setIsDropdownVisible(false);
    };

    const handleMouseEnter = () => {
        if (account) {
            setIsDropdownVisible(true);
        }
    };

    const handleMouseLeave = () => {
        setIsDropdownVisible(false);
    };

    let buttonContent;
    if (account) {
        const shortenedAccount = `${account.slice(0, 5)}...${account.slice(-4)}`;
        buttonContent = (
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="dropdown-container"
            >
                <div className="connected">Connected: {shortenedAccount}</div>
                {isDropdownVisible && (
                    <div className="dropdown-menu">
                        <button onClick={disconnectWallet}>Logout</button>
                    </div>
                )}
            </div>
        );
    } else {
        buttonContent = (
            <button className='btn_signin' onClick={connectWallet}>Sign in with Metamask</button>
        );
    }

    return <div>{buttonContent}</div>;
};

export default LoginButton;
