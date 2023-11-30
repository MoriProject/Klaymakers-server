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
    },
};

const MyObject = () => {
    const account = useSelector((state) => state.account);

    const [userObjects, setUserObjects] = useState([]);
    const [selectedToken, setSelectedToken] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTokenInfo, setSelectedTokenInfo] = useState([]);

    useEffect(() => {
        async function fetchUserObjects() {
            try {
                if (account) {
                    const myTokenIds = await contractInstance.methods.getUserTokens(account).call();
                    const objectPromises = myTokenIds.map(async (tokenId) => {
                        const objectInfo = await contractInstance.methods.getObjectInfo(tokenId).call();
                        return {
                            tokenId,
                            objectInfo
                        };
                    });
                    const objects = await Promise.all(objectPromises);
                    console.log(objects);
                    setUserObjects(objects);
                }
            } catch (error) {
                console.error('Error fetching user objects:', error);
            }
        }

        fetchUserObjects();
    }, [account]);

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
        <div className="container">
            <h1>MyObject</h1>
            <h3>Rights you have</h3>
            <div className="object_container">
                {userObjects && userObjects.map(({ tokenId, objectInfo }) => (
                    <div className="sale_card" key={tokenId} onClick={() => handleTokenSelect(tokenId)}>
                        <img src={objectInfo.imageUrl} />
                        <div >
                            <div className="card_name">
                                <span>{objectInfo.name}</span>
                            </div>
                            <div className="card_info">
                                <span>#{tokenId.toString()}</span>
                                {/* <span>{formatNumberWithCommas(object.priceInWei)} KLAY</span> */}
                            </div>
                        </div>
                    </div>
                ))}
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
            </Modal>
        </div>
    )
}

export default MyObject;