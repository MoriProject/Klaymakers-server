import React, { useEffect, useState } from "react";
import contract from "../../contracts/Contract";

const InfoWithZeroVals = () => {
    const [contractData, setContractData] = useState({
        contractBalance: 0,
        tokensForSale: [],
        soldTokens: [],
        owner: ''
    });

    useEffect(() => {
        console.log(contractData);
        console.log(contractData.contractBalance);
        console.log(contractData.tokensForSale);
        console.log(contractData.soldTokens);
        console.log(contractData.owner);
    }, [contractData]);

    useEffect(() => {
        async function fetchContractData() {
            try {
                // Contract.js 파일에서 스마트 계약 함수 호출 및 데이터 가져오기
                const contractBalance = await contract.methods.getContractBalance().call();
                const tokensForSale = await contract.methods.getTokensForSale().call();
                const soldTokens = await contract.methods.getSoldTokens().call();
                const owner = await contract.methods.owner().call();

                // 가져온 데이터를 상태 변수에 설정
                setContractData({
                    contractBalance,
                    tokensForSale,
                    soldTokens,
                    owner
                });
            } catch (error) {
                console.error('오류 발생:', error);
            }
        }

        fetchContractData();
    }, []);

    return (
        <div>
            <h1>Contract Info</h1>
            <p>Contract Balance: {contractData.contractBalance} ETH</p>
            <p>Tokens for Sale: {contractData.tokensForSale.join(', ')}</p>
            <p>Sold Tokens: {contractData.soldTokens.join(', ')}</p>
            <p>Owner: {contractData.owner}</p>
        </div>
    );
}

export default InfoWithZeroVals;