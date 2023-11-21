import React, { useState } from 'react';
import Web3 from 'web3';
import { useSelector } from 'react-redux';
import contractInstance from "../../contracts/Contract";

const BuyToken = () => {
    const account = useSelector((state) => state.account);

    const [tokenId, setTokenId] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    // 토큰 ID와 금액 입력 처리 함수
    const handleTokenIdChange = (event) => {
        setTokenId(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    // 토큰 구매 함수
    const buyToken = async () => {
        try {
            const valueInEther = Web3.utils.toWei(amount.toString(), 'ether');

            await contractInstance.methods.buyToken(tokenId).send({
                from: account,
                value: valueInEther
            });

            setMessage('Token purchase successful!');
        } catch (error) {
            console.error('Error buying token:', error);
            setMessage('Token purchase failed.');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={tokenId}
                onChange={handleTokenIdChange}
                placeholder="Enter Token ID"
            />
            <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter Amount (in klay)"
            />
            <button onClick={buyToken}>Buy Token</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default BuyToken;
