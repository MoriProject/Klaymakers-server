import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { useSelector } from 'react-redux';
import contractInstance from "../../../../contracts/Contract";
import './styles.scss';
import Modal from 'react-modal';

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 30,
        backgroundColor: 'black'
        // top: '50%',
        // left: '50%',
        // right: 'auto',
        // bottom: 'auto',
        // marginRight: '-50%',
        // transform: 'translate(-50%, -50%)',
    },
};


const Market = () => {
    const account = useSelector((state) => state.account);

    const [contractData, setContractData] = useState({
        tokensForSale: [],
        soldTokens: [],
        objectsForSale: [],
        soldObjects: []
    })
    const [selectedToken, setSelectedToken] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTokenInfo, setSelectedTokenInfo] = useState([]);
    const [message, setMessage] = useState('');


    useEffect(() => {
    }, [contractData]);

    useEffect(() => {
        console.log(selectedToken);
        console.log(selectedTokenInfo);
    }, [selectedTokenInfo, selectedToken]);

    useEffect(() => {
        async function fetchContractData() {
            try {
                const tokensForSale = await contractInstance.methods.getTokensForSale().call();
                const soldTokens = await contractInstance.methods.getSoldTokens().call();
                setContractData({
                    tokensForSale,
                    soldTokens
                });
                const tokensForSaleObjectPromises = tokensForSale.map(async (tokenId) => {
                    const objectInfo = await contractInstance.methods.getObjectInfo(tokenId).call();
                    return {
                        tokenId,
                        objectInfo
                    };
                });
                const tokensSoldObjectPromises = soldTokens.map(async (tokenId) => {
                    const objectInfo = await contractInstance.methods.getObjectInfo(tokenId).call();
                    return {
                        tokenId,
                        objectInfo
                    };
                });
                const objectsForSale = await Promise.all(tokensForSaleObjectPromises);
                const soldObjects = await Promise.all(tokensSoldObjectPromises);

                setContractData((prevData) => ({
                    ...prevData,
                    objectsForSale,
                    soldObjects
                }));
            } catch (error) {
                console.error('오류 발생:', error);
            }
        }

        fetchContractData();
    }, []);

    const buyToken = async () => {
        try {
            console.log(account);
            console.log(selectedTokenInfo.priceInWei);
            const valueInEther = Web3.utils.toWei(selectedTokenInfo.priceInWei, 'wei');
            console.log(valueInEther);

            await contractInstance.methods.buyToken(selectedToken.toString()).send({
                from: account,
                value: valueInEther
            });

            setMessage('Token purchase successful!');
        } catch (error) {
            console.error('Error buying token:', error);
            setMessage('Token purchase failed.');
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedToken('');
        setSelectedTokenInfo([]);
    };

    const handleTokenSelect = async (tokenId) => {
        setIsOpen(true);
        const objectInfo = await contractInstance.methods.getObjectInfo(tokenId).call();
        setSelectedToken(tokenId);
        setSelectedTokenInfo(objectInfo);
    };

    const formatNumberWithCommas = (number) => {
        const weiToEther = Web3.utils.fromWei(number, 'ether');
        return weiToEther.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div>
            <div className="container">
                <h1>Market</h1>
                <h3>Now on sale</h3>
                <div className="object_container">
                    {contractData.objectsForSale && contractData.objectsForSale.map(({ tokenId, objectInfo }) => (
                        <div className="sale_card" key={tokenId} onClick={() => handleTokenSelect(tokenId)}>
                            <img src={objectInfo.imageUrl} />
                            <div >
                                <div className="card_name">
                                    <span>{objectInfo.name}</span>
                                </div>
                                <div className="card_info">
                                    <span>#{tokenId.toString()}</span>
                                    <span>{formatNumberWithCommas(objectInfo.priceInWei)} KLAY</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <br />
                <h3>Sale ended</h3>
                <div className="object_container">
                    {contractData.soldObjects && contractData.soldObjects.map(({ tokenId, objectInfo }) => (
                        <div key={tokenId} onClick={() => handleTokenSelect(tokenId)}>
                            <img src={objectInfo.imageUrl} />
                            <div className="sold_card" >
                                <div></div>
                                <div className="card_name">
                                    <span>{objectInfo.name}</span>
                                </div>
                                <div className="card_info">
                                    <span>#{tokenId.toString()}</span>
                                    <span>{formatNumberWithCommas(objectInfo.priceInWei)} KLAY</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                className="modal"
                // overlayClassName="Overlay"
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <h3>Object Info</h3>
                <form>
                    {(selectedToken !== null && selectedTokenInfo !== null) ?
                        <>
                            <p>Name: {selectedTokenInfo.name}</p>
                            <p>Description: {selectedTokenInfo.description}</p>
                            <p>Usage Rights: {selectedTokenInfo.usageRights}</p>
                            <p>Object Url: {selectedTokenInfo.objectUrl}</p>
                            <img src={selectedTokenInfo.imageUrl} />
                            {selectedTokenInfo.supply !== undefined ?
                                <p>Supply: {selectedTokenInfo.supply.toString()}</p>
                                : ''}
                            <p>tokenId: {selectedToken.toString()}</p>
                            {selectedTokenInfo.priceInWei !== undefined ?
                                <p>Price: {formatNumberWithCommas(selectedTokenInfo.priceInWei)} KLAY</p>
                                : ''}
                        </>
                        : ''}
                </form>
                <button onClick={buyToken}>Buy Token</button>
                {message && <p>{message}</p>}
            </Modal>
        </div>
    )
}

export default Market;