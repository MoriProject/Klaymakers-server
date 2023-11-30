import React, { useState } from "react";
import Navbar from "../components/main/Navbar/Navbar";
import Sidebar from "../components/main/Sidebar/Sidebar";
import Home from "../components/main/Home";
import CreateObject from "../components/main/pages/CreateObject/CreateObject";
import Market from "../components/main/pages/Market/Market";
import Withdraw from "../components/main/pages/Withdraw/Withdraw";
import MyObject from "../components/main/MyObject";
import './styles.scss';
import MyPage from "../components/main/MyPage";


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
        case 'create':
            content = <CreateObject />;
            break;
        case 'market':
            content = <Market />;
            break;
        case 'myobject':
            content = <MyObject />;
            break;
        case 'mypage':
            content = <MyPage />;
            break;
        case 'withdraw':
            content = <Withdraw />;
            break;
        default:
            content = <Home />;
    }

    return (
        <div className="main_page">
            <Navbar />
            <Sidebar currentPage={currentPage} changePage={changePage} />
            <div className="main_section">
                {content}
            </div>
        </div>
    )
}

export default MainPage;