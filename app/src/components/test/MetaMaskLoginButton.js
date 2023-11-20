import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import detectEthereumProvider from '@metamask/detect-provider';

const MetaMaskLoginButton = () => {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        console.log("Account: " + account);
    }, [account]);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
            } catch (error) {
                console.error("Failed to connect wallet", error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    const disconnectWallet = () => {
        setAccount(null);
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
