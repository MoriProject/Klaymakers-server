import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './styles.scss';
import { toast } from 'react-toastify';

const MyPage = () => {
    const account = useSelector((state) => state.account);
    const nickname = useSelector((state) => state.nickname);

    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(account);
            if (account == null) {
                toast.error('MetaMask account not connected.', {
                    autoClose: 5000,
                    closeButton: true,
                    closeOnClick: true
                });
                throw new Error('서버 응답 실패');
            }
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
                toast.error('Nickname setting failed.', {
                    autoClose: 5000,
                    closeButton: true,
                    closeOnClick: true
                });
                throw new Error('Nickname setting failed.');
            }
            const data = await response.json();
            console.log(data);
            toast.success('Nickname setting successful!', {
                autoClose: 5000,
                closeButton: true,
                closeOnClick: true
            });
        } catch (error) {
            console.error('failed to set nickname', error);
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
        console.log(account);
        console.log(email);
        console.log(username);
        try {
            const response = fetch(`https://nftmori.shop/api/users/update`, {
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
            // console.log(response);
            // if (!response.ok) {
            //     throw new Error('서버 응답 실패');
            // }
            toast.success('Account update successful!', {
                autoClose: 5000,
                closeButton: true,
                closeOnClick: true
            });
            // const data = await response.json();
            // console.log(data);
            dispatch({ type: 'SET_NICKNAME', payload: username });
        } catch (error) {
            console.error('데이터 가져오기 실패', error);
        }
    };

    return (
        <div className="container">
            <h1>MyPage</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='email'>Nickname</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
            </form>
            <div className='button-group'>
                <button onSubmit={handleSubmit}>Set</button>
                <button onClick={updateNickname}>Update</button>
            </div>
            {/* <button onClick={fetchNickname}>닉네임은?</button> */}
        </div >
    )
}

export default MyPage;