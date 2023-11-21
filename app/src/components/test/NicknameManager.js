import React, { useState } from 'react';

const NicknameManager = () => {
    const [nickname, setNickname] = useState('');

    const handleInputChange = (event) => {
        setNickname(event.target.value);
    };

    const handleSubmit = () => {
        alert(`Your nickname has been set to '${nickname}'`);
    };

    return (
        <div>
            <p>Your Nickname: {nickname}</p>
            <input type="text" value={nickname} onChange={handleInputChange} />
            <button onClick={handleSubmit}>submit</button>
        </div >
    );
}

export default NicknameManager;
