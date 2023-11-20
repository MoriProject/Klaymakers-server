import React from 'react';
import MetaMaskLoginButton from '../components/test/MetaMaskLoginButton';
import InfoWithZeroVals from '../components/test/InfoWithZeroVals';

const TestPage = () => {
    return (
        <div>
            <MetaMaskLoginButton />
            <hr />
            <InfoWithZeroVals />
        </div>
    )
}

export default TestPage;