import React, { useState } from "react";
import Home from "../components/main/Home";
import Navbar from "../components/main/Navbar/Navbar";
import Home2 from "../components/main/Home2";
import Sidebar from "../components/main/Sidebar/Sidebar";
import './styles.scss';

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
        case 'home2':
            content = <Home2 />
            break;
        default:
            content = <Home />;
    }

    return (
        <div className="main_page">
            <Navbar changePage={changePage} />
            <div className="main_section">
                <Sidebar />
                {content}
            </div>
        </div>
    )
}

export default MainPage;