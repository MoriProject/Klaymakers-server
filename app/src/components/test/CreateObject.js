import React, { useState } from "react";
import web3 from 'web3';
import { useSelector } from 'react-redux';
import contractInstance from "../../contracts/Contract";

const CreateObject = () => {
    const account = useSelector((state) => state.account);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [usageRights, setUsageRights] = useState("");
    const [objectUrl, setObjectUrl] = useState("");
    const [supply, setSupply] = useState(1);
    const [priceInWei, setPriceInWei] = useState("");

    const handleCreateObject = async (e) => {
        e.preventDefault();
        // console.log(window.ethereum);
        // console.log(account);
        // console.log(window.ethereum.chainId);
        // console.log("1");

        const priceInEther = web3.utils.toWei(priceInWei.toString(), 'ether');
        // console.log("2");

        try {
            // console.log(account);
            // console.log(priceInEther);
            // console.log(2.2);
            // console.log("2.5");
            await contractInstance.methods.createObject(
                name,
                description,
                usageRights,
                objectUrl,
                supply,
                priceInEther
            ).send({
                from: account,
                gas: 2000000
            });
            // console.log("3");

            alert("Object created successfully!");

            setName("");
            setDescription("");
            setUsageRights("");
            setObjectUrl("");
            setSupply(1);
            setPriceInWei("");
        } catch (error) {
            console.error("Error creating object:", error);
        }
    };

    // useEffect(() => {
    // console.log(Contract.events.ObjectCreated());
    // Contract.events.ObjectCreated()
    //     .on('data', (event) => {
    //         alert(`Object created successfully! Object ID: ${event.returnValues.objectId}`);
    //     })
    //     .on('error', (error) => {
    //         console.error("Error while subscribing to ObjectCreated event:", error);
    //     });
    // }, []);

    return (
        <div>
            <h2>Create Object</h2>
            <form onSubmit={handleCreateObject}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Usage Rights:</label>
                    <input type="text" value={usageRights} onChange={(e) => setUsageRights(e.target.value)} />
                </div>
                <div>
                    <label>Object URL:</label>
                    <input type="text" value={objectUrl} onChange={(e) => setObjectUrl(e.target.value)} />
                </div>
                <div>
                    <label>Supply:</label>
                    <input type="number" value={supply} onChange={(e) => setSupply(e.target.value)} />
                </div>
                <div>
                    <label>Price in Wei:</label>
                    <input type="number" value={priceInWei} onChange={(e) => setPriceInWei(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    );
}

export default CreateObject;
