import React, { useEffect, useState } from "react";
import contractInstance from "../../../../contracts/Contract";
import Web3 from "web3";
import { useSelector } from 'react-redux';
import './styles.scss';

const Withdraw = () => {
    const account = useSelector((state) => state.account);

    const [owner, setOwner] = useState('');
    const [contractBalance, setContractBalance] = useState(0);
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

    useEffect(() => {
        async function getContractOwner() {
            try {
                const contractOwner = await contractInstance.methods.owner().call();
                // console.log(contractOwner);
                setOwner(contractOwner);
            } catch (error) {
                console.error(error);
            }
        }
        async function fetchContractBalance() {
            try {
                const contractBalance = await contractInstance.methods.getContractBalance().call();
                console.log(contractBalance);

                const BalancetoEther = parseFloat(Web3.utils.fromWei(contractBalance, 'ether'));
                console.log(BalancetoEther);

                setContractBalance(contractBalance);
                console.log(contractBalance);
            } catch (error) {
                console.error(error);
            }
        }
        getContractOwner();
        fetchContractBalance();
    }, []);

    return (
        <div className="container">
            <h1>Withdraw</h1>
            <h3>Contract Owner</h3>
            <p>{owner}</p>
            <br />
            <h3>Contract Balance</h3>
            <p>{contractBalance.toString()} KLAY</p>
            <br />
            <button disabled={!(owner === account)} onClick={withdrawFunds}>Withdraw Funds</button>
        </div>
    )
}

export default Withdraw;