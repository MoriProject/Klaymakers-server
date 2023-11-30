import React, { useState } from 'react';
import contractInstance from '../../../../contracts/Contract';
import './styles.scss';
import { toast } from 'react-toastify';

const Verify = () => {
    const [userAddress, setUserAddress] = useState('');
    const [tokenId, setTokenId] = useState('');
    const [isOwner, setIsOwner] = useState(null);

    const checkOwnership = async () => {
        try {
            const result = await contractInstance.methods.checkTokenOwnership(userAddress, tokenId).call();
            setIsOwner(result);
            if (result === true) {
                toast.success(`Ownership status: ${result}`, { autoClose: 5000 });
            }
            else if (result === false) {
                toast.error(`Ownership status: ${result}`, { autoClose: 5000 });
            }
        } catch (error) {
            console.error(error);
            toast.error('Error checking token ownership', { autoClose: 5000 });
        }
    };

    return (
        <div className="container">
            <h1>Verify Ownership</h1>
            <div className="form-group">
                <label>User Address</label>
                <input
                    type="text"
                    value={userAddress}
                    onChange={e => setUserAddress(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Token ID</label>
                <input
                    type="number"
                    value={tokenId}
                    onChange={e => setTokenId(e.target.value)}
                />
            </div>

            <button onClick={checkOwnership}>Check Ownership</button>

            <div className='button-group'>
                {/* <button onSubmit={handleSubmit}>Set</button> */}
                {/* <button onClick={updateNickname}>Update</button> */}
            </div>
            {isOwner !== null && <p>{`Is owner: ${isOwner}`}</p>}
        </div>
    );
}

export default Verify;
