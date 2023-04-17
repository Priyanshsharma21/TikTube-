import React, { useState } from 'react'
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import { Layout, Typography, Space } from 'antd';
import './App.css'
import { Homepage,TweetUserDetail, SearchItem, Country, Navbar, VideoDetails, Discover, YoutubeSearch, YoutubeDetails, ChannelDetails, TweetSearch } from './components';


function App() {
  return (
    <div className="app">

      <div className="navbar">
        <Navbar />
      </div>

      <div className="main">

      <Layout>
        <div className="routes">

        <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/search" element={<SearchItem />} />
            <Route exact path="/country" element={<Country />} />
            <Route exact path="/video/:id" element={<VideoDetails />} />
            <Route exact path="/discover" element={<Discover />} />
            <Route exact path="/youtube" element={<YoutubeSearch />} />
            <Route exact path="/yt/:id" element={<YoutubeDetails />} />
            <Route exact path="/channel/:id" element={<ChannelDetails />} />
            <Route exact path="/tweetsearch" element={<TweetSearch />} />
            <Route exact path="/tweetuser/:id" element={<TweetUserDetail />} />
        </Routes>

        </div>
      </Layout>

        <div className="footer">

        <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
          <Link to="/">
             TIKTUBE
          </Link> <br />
            All Rights Reserved.
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/country">Country</Link>
        </Space>
        
        </div>
    </div>
      
    </div>
  );
}

export default App;
