import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';

const LoginButton = () => {

    const dispatch = useDispatch();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const account = useSelector((state) => state.account);
    const nickname = useSelector((state) => state.nickname);
    // console.log(nickname);
    // const [nickname, setNickname] = useState(null);

    // const setNickname = (newNickname) => {
    //     dispatch({ type: 'SET_NICKNAME', payload: newNickname });
    // };

    useEffect(() => {
        // console.log(nickname);
    }, [dispatch]);

    useEffect(() => {
        async function fetchAndSetNickname() {
            try {
                const response = await fetch(`https://nftmori.shop/api/users/${account}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    dispatch({ type: 'SET_NICKNAME', payload: null });
                    throw new Error('서버 응답 실패');
                }
                const data = await response.json();
                if (data.username != null && data.username != undefined) {
                    dispatch({ type: 'SET_NICKNAME', payload: data.username });
                }
            } catch (error) {
                dispatch({ type: 'SET_NICKNAME', payload: null });
                console.error('데이터 가져오기 실패', error);
            }
        }

        if (account) {
            fetchAndSetNickname();
        }
    }, [account, dispatch]);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                const chainId = await web3.eth.getChainId();
                if (chainId !== '0x3E9') {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: '0x3E9',
                                chainName: 'Baobab',
                                nativeCurrency: {
                                    name: 'Klaytn',
                                    symbol: 'KLAY',
                                    decimals: 18,
                                },
                                rpcUrls: ['https://api.baobab.klaytn.net:8651'],
                            },
                        ],
                    });
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                }

                const accounts = await web3.eth.getAccounts();
                dispatch({ type: 'SET_ACCOUNT', payload: accounts[0] });
                // setIsDropdownVisible(true);
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
        if (nickname) {
            buttonContent = (
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="dropdown-container"
                >
                    <div className="connected">{nickname}</div>
                    {isDropdownVisible && (
                        <div className="dropdown-menu">
                            <button onClick={disconnectWallet}>Logout</button>
                        </div>
                    )}
                </div>
            );
        } else {
            buttonContent = (
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="dropdown-container"
                >
                    <div className="connected">{shortenedAccount}</div>
                    {isDropdownVisible && (
                        <div className="dropdown-menu">
                            <button onClick={disconnectWallet}>Logout</button>
                        </div>
                    )}
                </div>
            );
        }
    } else {
        buttonContent = (
            <button className="connect" onClick={connectWallet}>Sign in with Metamask</button>
        );
    }

    return <div>{buttonContent}</div>;
};

export default LoginButton;
