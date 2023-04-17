import { LikeOutlined, MessageOutlined, ShareAltOutlined } from '@ant-design/icons'
import React from 'react'
import millify from 'millify';

import '../assets/Video.css'



const VideoSideBar = ({likes,messages,shares}) => {
  return (
        <div className="video_side_bar">
            <div className="sideBar_button">
                <LikeOutlined />
                <p>{millify(likes)}</p>
            </div>

            <div className="sideBar_button">
                <MessageOutlined />
                <p>{millify(messages)}</p>
            </div>

            <div className="sideBar_button">
                <ShareAltOutlined />
                <p>{millify(shares)}</p>
            </div>
        </div>
  )
}

export default VideoSideBar