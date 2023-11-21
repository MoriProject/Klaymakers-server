import React, { useState } from "react";
import Home from "../components/main/Home";

const MainPage = () => {
    const [currentPage, setCurrentPage] = useState('home');

    let content;

    const changePage = (pageName) => {
        setCurrentPage(pageName);
    }

    switch (currentPage) {
        case 'home':
            content = <Home />;
            break;
        default:
            content = <Home />;
    }

    return (
        <div>
            <nav>
                <ul>
                    <li onClick={() => changePage('home')}>Home</li>
                </ul>
            </nav>
            {content}
        </div>
    )
}

export default MainPage;