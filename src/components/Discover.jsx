import React, { useRef, useState } from 'react'
import { Avatar, Col, Row, Statistic,Typography,Button } from 'antd';
import '../assets/Video.css'
import {VideoSideBar,VideoFooter,Video} from './index';
import { useGetFeedQuery, useGetCountryFeedQuery } from '../services/appApi';


const Discover = () => {
    const { data, isFetching }  =  useGetFeedQuery()
    const video_info = data?.aweme_list


    
  return (
    <div>
    <Row>
        <Col span={24} className='app_video'>
            {video_info?.map(video=>(
                <>
                <div className="video_container">
                <Video key={video?.aweme_id} videoUrl={video?.video?.play_addr?.url_list[0]}/>
                <VideoSideBar key={video?.aweme_id} likes={video?.statistics?.play_count} messages={video?.statistics?.comment_count} shares={video?.statistics?.share_count}/>
                <VideoFooter key={video?.aweme_id} userName={video?.author?.nickname} desc={video?.desc} trackImg={video?.music?.avatar_thumb?.url_list[0]}/>
                </div>

                </>
            ))}
        </Col>
    </Row>
    </div>
  )
}

export default Discover