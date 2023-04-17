import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar, Collapse } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined, AppstoreOutlined, CompassOutlined, YoutubeOutlined, InstagramOutlined } from '@ant-design/icons';
import {CgGames} from 'react-icons/cg'
import {FiTwitter} from 'react-icons/fi'

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null)
    
    useEffect(()=>{
        // get the width of the screen 
        const handelResize = ()=> setScreenSize(window.innerWidth);
        window.addEventListener('resize', handelResize);

        handelResize();
        return ()=>window.removeEventListener('resize', handelResize)
    },[])

    useEffect(()=>{
            if(screenSize < 799){
                setActiveMenu(false);
            }else{
                setActiveMenu(true);
            }
    },[screenSize])

  return (
    <div className='nav-container'>
    <div className="logo-container">
        <Typography.Title level={3} className='logo'>
        <Link className='logo_text' to='/'>TIKTUBE</Link>
        </Typography.Title>
        <Button className='menu-control-container' onClick={()=>setActiveMenu(!activeMenu)}>
            <MenuOutlined />
        </Button>
    </div>
    {activeMenu && (
        <>
    <Menu theme='dark'>
        <Menu.Item key={1} icon={<HomeOutlined/>}>
            <Link to='/'>Home</Link>
        </Menu.Item>

        <Menu.Item key={2} icon={<AppstoreOutlined />}>
            <Link to='/search'>Search</Link>
        </Menu.Item>

        <Menu.Item key={3} icon={<CgGames/>}>
            <Link to='/country'>Country</Link>
        </Menu.Item>

        <Menu.Item key={4} icon={<CompassOutlined />}>
            <Link to='/discover'>Discover</Link>
        </Menu.Item>

        <Menu.Item key={5} danger={true} icon={<YoutubeOutlined />}>
            <Link to='/youtube'>YtSearch</Link>
        </Menu.Item>

        <Menu.Item key={6} icon={<FiTwitter />}>
            <Link to='/tweetsearch'>Tweets</Link>
        </Menu.Item>
    </Menu>
    </>
    )}

    </div>
  )
}

export default Navbar