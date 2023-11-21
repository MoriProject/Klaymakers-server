import React from 'react';
import { useSelector } from 'react-redux';
import MetaMaskLoginButton from '../components/test/MetaMaskLoginButton';
import InfoWithZeroVals from '../components/test/InfoWithZeroVals';
import CreateObject from '../components/test/CreateObject';

const TestPage = () => {
    const account = useSelector((state) => state.account);
    return (
        <div>
            <MetaMaskLoginButton />
            <hr />
            <p>global state</p>
            {account && <div>Logged in as: {account}</div>}
            <hr />
            <CreateObject />
            <hr />
            <InfoWithZeroVals />
        </div>
    )
}

export default TestPage;