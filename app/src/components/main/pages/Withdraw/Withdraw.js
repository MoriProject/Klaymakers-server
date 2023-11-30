import React, { useEffect, useState } from "react";
import contractInstance from "../../../../contracts/Contract";
import Web3 from "web3";
import { useSelector } from 'react-redux';
import './styles.scss';
import { toast } from 'react-toastify';

const Withdraw = () => {
    const account = useSelector((state) => state.account);

    const [owner, setOwner] = useState('');
    const [contractBalance, setContractBalance] = useState(0);
    const [message, setMessage] = useState('');

    const fetchContractBalance = async () => {
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
    };

    const withdrawFunds = async () => {
        const processingToastId = toast.info('Processing...', { autoClose: false, closeOnClick: false, closeButton: false, draggable: false });

        try {
            await contractInstance.methods.withdraw().send({ from: account });
            toast.dismiss(processingToastId);
            toast.success('Withdrawal successful!', {
                autoClose: 5000,
                closeButton: true,
                closeOnClick: true
            });
            setMessage('Withdrawal successful!');
            await fetchContractBalance();
        } catch (error) {
            toast.dismiss(processingToastId);
            toast.error('Error during withdrawal', {
                autoClose: 5000,
                closeButton: true,
                closeOnClick: true
            });
            // console.error('Error during withdrawal:', error);
            setMessage('Withdrawal failed.');
            await fetchContractBalance();
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