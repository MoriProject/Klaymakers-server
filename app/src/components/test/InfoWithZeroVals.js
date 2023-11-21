import React, { useEffect, useState } from "react";
import contractInstance from "../../contracts/Contract";
import Web3 from "web3";

const InfoWithZeroVals = () => {
    const [contractData, setContractData] = useState({
        contractBalance: 0,
        tokensForSale: [],
        soldTokens: [],
        owner: ''
    });

    useEffect(() => {
        async function fetchContractData() {
            try {
                const contractBalance = await contractInstance.methods.getContractBalance().call();
                const tokensForSale = await contractInstance.methods.getTokensForSale().call();
                const soldTokens = await contractInstance.methods.getSoldTokens().call();
                const owner = await contractInstance.methods.owner().call();

                const BalancetoEther = parseFloat(Web3.utils.fromWei(contractData.contractBalance, 'ether'));
                console.log(BalancetoEther);
                console.log(contractBalance);

                setContractData({
                    contractBalance,
                    tokensForSale,
                    soldTokens,
                    owner
                });
                // console.log(contractBalance);
            } catch (error) {
                console.error('오류 발생:', error);
            }
        }

        fetchContractData();
    }, []);

    return (
        <div>
            <h2>Contract Info</h2>
            <p>Contract Balance: {contractData.contractBalance.toString()} ETH</p>
            <p>Tokens for Sale: {contractData.tokensForSale.join(', ')}</p>
            <p>Sold Tokens: {contractData.soldTokens.join(', ')}</p>
            <p>Owner: {contractData.owner}</p>
        </div>
    );
}

export default InfoWithZeroVals;