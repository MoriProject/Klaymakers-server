import React, { useState } from 'react';
import Web3 from 'web3';
import { useSelector } from 'react-redux';
import contractInstance from "../../contracts/Contract";

const ObjectInfo = () => {
    const [tokenId, setTokenId] = useState('');
    const [objectInfo, setObjectInfo] = useState(null);

    const handleTokenIdChange = (event) => {
        setTokenId(event.target.value);
    };

    const fetchObjectInfo = async () => {
        try {
            // const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
            // const contract = new web3.eth.Contract(contractABI, contractAddress);

            const info = await contractInstance.methods.getObjectInfo(tokenId).call();
            console.log(info);
            setObjectInfo(info);
        } catch (error) {
            console.error('Error fetching object info:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={tokenId}
                onChange={handleTokenIdChange}
                placeholder="Token ID"
            />
            <button onClick={fetchObjectInfo}>Get Object Info</button>
            {objectInfo && (
                <div>
                    <p>Name: {objectInfo.name}</p>
                    <p>Description: {objectInfo.description}</p>
                    <p>Usage Rights: {objectInfo.usageRights}</p>
                    <p>Object URL: {objectInfo.objectUrl}</p>
                    <p>Supply: {objectInfo.supply.toString()}</p>
                    <p>Price (in Wei): {objectInfo.priceInWei.toString()}</p>
                    <p>Is For Sale: {objectInfo.isForSale.toString()}</p>
                </div>
            )}
        </div>
    );
};

export default ObjectInfo;
