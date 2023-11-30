import React, { useState } from "react";
import Web3 from 'web3';
import { create } from 'ipfs-http-client';
import { useSelector } from 'react-redux';
import { Buffer } from 'buffer';
import contractInstance from "../../../../contracts/Contract";
import '../common_styles.scss'
import './styles.scss';
import { toast } from 'react-toastify';

const apiKey = process.env.REACT_APP_INFURA_API_KEY;
const apiSecret = process.env.REACT_APP_INFURA_API_SECRET;

const auth = `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`;

const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

const CreateObject = () => {
    const account = useSelector((state) => state.account);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [usageRights, setUsageRights] = useState("");

    const [file, setFile] = useState(null);
    const [objectUrl, setObjectUrl] = useState("");
    // const [ipfsCid, setIpfsCid] = useState('');

    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    // const [ipfsImageUrl, setIpfsImageUrl] = useState("");

    const [supply, setSupply] = useState(1);
    const [priceInKlay, setPriceInKlay] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const processingToastId = toast.info('Processing...', { autoClose: false, closeOnClick: false, closeButton: false, draggable: false });

        const priceInWei = Web3.utils.toWei(priceInKlay.toString(), 'ether');

        try {
            const cidUrl = await uploadToIPFS();
            const imgCidUrl = await uploadImageToIPFS();

            if (typeof cidUrl === 'undefined' || typeof imgCidUrl === 'undefined') {
                throw new Error('CID URLs are undefined');
            }

            console.log(cidUrl);
            console.log(imgCidUrl);

            toast.success('Object uploaded successfully!', {
                closeButton: true,
                closeOnClick: true,
                autoClose: 5000,
            });

            const fee = Web3.utils.toWei(((supply * priceInKlay * 5) / 100).toString(), 'ether');

            try {
                await contractInstance.methods.createObject(
                    name,
                    description,
                    usageRights,
                    cidUrl,
                    imgCidUrl,
                    supply,
                    priceInWei
                ).send({
                    from: account,
                    value: fee,
                    gas: 2000000
                });

                toast.dismiss(processingToastId);
                toast.success('Object created successfully!', {
                    closeButton: true,
                    closeOnClick: true,
                    autoClose: 5000,
                });

                setName("");
                setDescription("");
                setUsageRights("");
                setObjectUrl("");
                setImageUrl("");
                setSupply("");
                setPriceInKlay("");

                const fileInput = document.getElementById('fileInput');
                fileInput.value = '';
                setFile(null);

                const coverInput = document.getElementById('coverInput');
                coverInput.value = '';
                setImageFile(null);
            } catch (error) {
                toast.dismiss(processingToastId);
                toast.error('Error creating object', {
                    autoClose: 5000,
                    closeButton: true,
                    closeOnClick: true
                });
                console.error("Error creating object:", error);
            }
        } catch (error) {
            toast.dismiss(processingToastId);
            toast.error('Error uploading data to IPFS', {
                autoClose: 5000,
                closeButton: true,
                closeOnClick: true
            });
            console.error('데이터 가져오기 실패', error);
        }
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleImageChange = (event) => {
        const selectedImageFile = event.target.files[0];
        setImageFile(selectedImageFile);

        const imageUrl = URL.createObjectURL(selectedImageFile);
        setImageUrl(imageUrl);
    };

    const uploadToIPFS = async () => {
        if (!file) {
            toast.warning('Please select a object file!', { closeOnClick: true, });
            return;
        }

        try {
            const result = await ipfs.add(file);
            const cid = result.path;
            console.log('Uploaded to IPFS with CID:', cid);
            const ipfsUrl = "https://ipfs.io/ipfs/" + cid;
            console.log(ipfsUrl);
            return ipfsUrl;
        } catch (error) {
            console.error('Error uploading to IPFS:', error);
        }
    };

    const uploadImageToIPFS = async () => {
        if (!imageFile) {
            toast.warning('Please select a cover image file!', { closeOnClick: true, });
            return;
        }
        try {
            const result = await ipfs.add(imageFile);
            const cid = result.path;
            console.log('Uploaded to IPFS with CID:', cid);
            const ipfsUrl = "https://ipfs.io/ipfs/" + cid;
            console.log(ipfsUrl);
            return ipfsUrl;
        } catch (error) {
            console.error('Error uploading to IPFS:', error);
        }
    };

    return (
        <div className="container">
            <h1>Create Object</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Cover Image File</label>
                        <input type="file" id="coverInput" className="file-input" onChange={handleImageChange} />
                    </div>
                    <div className="form-group">
                        <label>Object File</label>
                        <input type="file" id="fileInput" className="file-input" onChange={handleFileChange} />
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Usage Rights</label>
                        <input type="text" value={usageRights} onChange={(e) => setUsageRights(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Supply</label>
                        <input type="number" value={supply} onChange={(e) => setSupply(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input type="number" value={priceInKlay} onChange={(e) => setPriceInKlay(e.target.value)} />
                    </div>
                    <div>
                        <button type="submit">Create</button>
                    </div>
                </form>
                <div className="image-container">
                    <label>Cover Image Preview</label>
                    <div>
                        {imageUrl && (
                            <div className="preview-image">
                                <img src={imageUrl} alt="Preview" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateObject;