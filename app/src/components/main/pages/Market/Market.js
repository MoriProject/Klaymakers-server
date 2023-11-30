import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { useSelector } from 'react-redux';
import contractInstance from "../../../../contracts/Contract";
import './styles.scss';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

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

                console.log(objectsForSale);

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

        const processingToastId = toast.info('Processing...', { autoClose: false, closeOnClick: false, closeButton: false, draggable: false });

        try {
            console.log(account);
            console.log(selectedTokenInfo.priceInWei);
            const valueInEther = Web3.utils.toWei(selectedTokenInfo.priceInWei, 'wei');
            console.log(valueInEther);

            await contractInstance.methods.buyToken(selectedToken.toString()).send({
                from: account,
                value: valueInEther
            });

            toast.dismiss(processingToastId);
            toast.success('Rights purchase successful!', {
                autoClose: 5000,
                closeButton: true,
                closeOnClick: true
            });
            closeModal();

            // toast.success('Rights purchase successful!');
            // setMessage('Token purchase successful!');
        } catch (error) {
            toast.dismiss(processingToastId);
            toast.error('Object purchase failed.', {
                autoClose: 5000,
                closeButton: true,
                closeOnClick: true
            });
            closeModal();
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
        console.log(objectInfo);
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
                <form>
                    {(selectedToken !== null && selectedTokenInfo !== null) ?
                        <>
                            <div className="object-info">
                                <img src={selectedTokenInfo.imageUrl} />
                                <div>
                                    <div className="info-container">
                                        <label>Id</label>
                                        <p>{selectedToken.toString()}</p>
                                    </div>
                                    <div className="info-container">
                                        <label>Name</label>
                                        <p>{selectedTokenInfo.name}</p>
                                    </div>
                                    <div className="info-container">
                                        <label>Supply</label>
                                        {selectedTokenInfo.supply !== undefined ?
                                            <p>{selectedTokenInfo.supply.toString()}</p>
                                            : ''}
                                    </div>
                                    <div className="info-container">
                                        <label>Price</label>
                                        {selectedTokenInfo.priceInWei !== undefined ?
                                            <p>{formatNumberWithCommas(selectedTokenInfo.priceInWei)} KLAY</p>
                                            : ''}
                                    </div>
                                </div>
                            </div>
                            <div className="info-line-container">
                                <label>Description</label>
                                <p>{selectedTokenInfo.description}</p>
                            </div>
                            <div className="info-line-container">
                                <label>Usage Rights</label>
                                <p>{selectedTokenInfo.usageRights}</p>
                            </div>
                            <div className="info-line-container">
                                <label>Object Url</label>
                                <p>{selectedTokenInfo.objectUrl}</p>
                            </div>
                        </>
                        : ''}
                </form>
                <div>
                    <button className="buy-button" onClick={buyToken}>Buy Token</button>
                </div>
            </Modal>
        </div>
    )
}

export default Market;