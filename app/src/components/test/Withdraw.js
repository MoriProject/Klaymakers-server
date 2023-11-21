import React, { useState } from 'react';
import Web3 from 'web3';
import { useSelector } from 'react-redux';
import contractInstance from "../../contracts/Contract";

const Withdraw = () => {
    const account = useSelector((state) => state.account);

    const [message, setMessage] = useState('');

    const withdrawFunds = async () => {
        try {
            await contractInstance.methods.withdraw().send({ from: account });

            setMessage('Withdrawal successful!');
        } catch (error) {
            console.error('Error during withdrawal:', error);
            setMessage('Withdrawal failed.');
        }
    };

    return (
        <div>
            <button onClick={withdrawFunds}>Withdraw Funds</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Withdraw;
