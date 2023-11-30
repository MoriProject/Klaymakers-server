import React from 'react';
import Web3 from 'web3';
import { useDispatch, useSelector } from 'react-redux';

const MetaMaskLoginButton = () => {

    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });


                const accounts = await web3.eth.getAccounts();
                dispatch({ type: 'SET_ACCOUNT', payload: accounts[0] });
            } catch (error) {
                console.error("Failed to connect wallet", error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    const disconnectWallet = () => {
        dispatch({ type: 'CLEAR_ACCOUNT' });
    };

    return (
        <div>
            {account ? (
                <>
                    <div>Connected: {account}</div>
                    <button onClick={disconnectWallet}>Logout</button>
                </>
            ) : (
                <button onClick={connectWallet}>Connect with MetaMask</button>
            )}
        </div>
    );
};

export default MetaMaskLoginButton;
