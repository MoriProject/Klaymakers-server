import React, { useState } from 'react';
import Web3 from 'web3';
import { useSelector } from 'react-redux';
import contractInstance from "../../contracts/Contract";

const MyPage = () => {
    const account = useSelector((state) => state.account);

    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://nftmori.shop/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    walletAddress: account,
                    email: email,
                    username: username
                }),
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('서버 응답 실패');
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('데이터 가져오기 실패', error);
        }
        console.log('Email:', email);
        console.log('UserName:', username);
    }

    const fetchNickname = async (e) => {
        try {
            const response = await fetch(`https://nftmori.shop/api/users/${account}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('서버 응답 실패');
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('데이터 가져오기 실패', error);
        }
    };


    const updateNickname = async (e) => {
        try {
            const response = await fetch(`https://nftmori.shop/api/users/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    walletAddress: account,
                    email: email,
                    username: username
                }),
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('서버 응답 실패');
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('데이터 가져오기 실패', error);
        }
    };



    return (
        <div className="container">
            <h1>MyPage</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>이메일: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='email'>닉네임: </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">제출</button>
            </form>
            <hr />
            <button onClick={updateNickname}>업데이트</button>
            <button onClick={fetchNickname}>닉네임은?</button>
        </div >
    )
}

export default MyPage;