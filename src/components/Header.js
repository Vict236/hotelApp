import React, { useEffect, useState } from "react";
import { Layout } from 'antd';
import favicon from '../images/favicon.png'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {

    const [avatarUrl, setAvatarUrl] = useState('/')

    const { Header } = Layout;

    const accounts = useSelector(state => state.accounts.accounts);

    const navigate = useNavigate()

    const logOut = () => {
        localStorage.setItem("logged", false)
        navigate("/login")
    }
    console.log(localStorage.getItem("logged"))

    useEffect(() =>{
        const username = localStorage.getItem('username')
        setAvatarUrl(
            Object.keys(accounts).length > 0 ? username === null ? '/' : accounts[username].image : '/'
        )
    }, [accounts])


    return (
        <Header >
            <div>
                <img src={favicon} alt="favicon" className="logo" />
            </div>
            <div className='userInfoContainer'>
                <img src={avatarUrl} alt='avatar' className='avatar' />
                <button className='logOut-button' onClick={logOut}>Log Out</button>
            </div>
        </Header>

    )
}

export default Header