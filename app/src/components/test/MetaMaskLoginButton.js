import React from 'react';
// import Caver from 'caver-js';
import Web3 from 'web3';
import { useDispatch, useSelector } from 'react-redux';

const MetaMaskLoginButton = () => {

    // const caver = new Caver('https://public-en-baobab.klaytn.net/')
    // const caver = new Caver(window.ethereum);

    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);

    const connectWallet = async () => {
        if (window.ethereum) {
            // const networkId = window.ethereum.networkVersion || window.ethereum.chainId;
            // console.log("현재 연결된 네트워크 ID:", networkId);
            // const selectedAddress = window.ethereum.selectedAddress;
            // if (selectedAddress) {
            //     console.log("현재 Metamask에서 선택한 계정 주소:", selectedAddress);
            //     console.log("계정 권한이 있습니다.");
            // } else {
            //     console.log("Metamask에서 계정을 선택하지 않았습니다.");
            //     console.log("계정 권한이 없습니다.");
            // }
            // if (window.klaytn) {
            try {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await web3.eth.getAccounts();
                dispatch({ type: 'SET_ACCOUNT', payload: accounts[0] });
                // await window.ethereum.enable();
                // await window.klaytn.enable();
                // const accounts = await caver.klay.getAccounts();
                // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                // const accounts = window.klaytn.selectedAddress;
                // dispatch({ type: 'SET_ACCOUNT', payload: accounts[0] });
                // dispatch({ type: 'SET_ACCOUNT', payload: accounts });
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
