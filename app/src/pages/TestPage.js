import React from 'react';
import { useSelector } from 'react-redux';
import MetaMaskLoginButton from '../components/test/MetaMaskLoginButton';
import InfoWithZeroVals from '../components/test/InfoWithZeroVals';
import CreateObject from '../components/test/CreateObject';
import NicknameManager from '../components/test/NicknameManager';
import ObjectInfo from '../components/test/ObjectInfo';
import BuyToken from '../components/test/BuyToken';
import Withdraw from '../components/test/Withdraw';

const TestPage = () => {
    const account = useSelector((state) => state.account);
    return (
        <div>
            <MetaMaskLoginButton />
            <hr />
            <NicknameManager />
            <hr />
            <p>global state</p>
            {account && <div>Logged in as: {account}</div>}
            <hr />
            <CreateObject />
            <hr />
            <ObjectInfo />
            <hr />
            <BuyToken />
            <hr />
            <InfoWithZeroVals />
            <hr />
            <Withdraw />
        </div>
    )
}

export default TestPage;