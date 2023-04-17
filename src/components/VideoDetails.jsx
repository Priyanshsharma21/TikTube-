import React, { useEffect, useRef, useState } from 'react'
import { useGetVideoDetailsQuery } from '../services/appApi';
import {Link, useParams} from 'react-router-dom';
import { Avatar, Col, Row, Statistic,Typography,Button } from 'antd';
import millify from 'millify';
import {motion} from 'framer-motion'
import Loader from './Loader';
import "../App.css"
import Ticker from 'react-ticker'
const {Title,Text} = Typography

const colors = ["#F2F2F2AA", "#F9F9F9AA", "#D8D8D8AA", "#FFC8A8AA", "#FFA0A0AA", "#E28B8BAA", "#A97C7CAA", "#5E7C8CAA", "#FBE5C4AA", "#EED5A5AA", "#D8BA74AA", "#94BFA2AA", "#6A8E8BAA", "#515D5EAA", "#DCEEA8AA", "#C0D77AAA", "#A4B451AA", "#F2A4A4AA", "#7EBEDCAA", "#576B7BAA"];

const VideoDetails = () => {
  const params = useParams();
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
        // eslint-disable-next-line no-unused-expressions
        const number = Math.floor(Math.random() * colors.length);
        setColorIndex(number);
    //   setColorIndex((colorIndex) => (colorIndex + 1) % colors.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

 
  const { data, isFetching }  =  useGetVideoDetailsQuery(params.id)
  const videoDetails = data?.aweme_detail

  const onVideoPress=()=>{
    if(playing){
        videoRef.current.pause()
        setPlaying(false)
    }else{
        videoRef.current.play()
        setPlaying(true)
    }
}


  if(isFetching) return <Loader />;


  const color = colors[colorIndex];
  const color2 = colors[colorIndex + 1]


  return (
    <div>

    <header
        className='banner banner_details header_video'>
        <div className="banner__contents">
            <Row>
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <div className="main_video_content">
                        {/* <Row> */}
                            <Col span={12}>
                                <motion.div 
                                className="video"
                                whileTap={{ scale: 0.9 }}
                                >
                                    <video style={{ boxShadow: `0px 0px 600px 10px ${color}, 0px 0px 600px 10px ${color2}` }} className="video__player" autoplay loop ref={videoRef} src={videoDetails?.video?.play_addr?.url_list[0]} onClick={onVideoPress} />
                                </motion.div>

                                <div className="col_2">

                                {videoDetails?.author?.youtube_channel_id &&(
                                <div className="youtube">
                                    <Link to={`/channel/${videoDetails?.author.youtube_channel_id}`}>
                                    <Button type="primary" danger>
                                        Youtube-{videoDetails?.author?.youtube_channel_title}
                                    </Button>
                                    </Link>
                                </div>
                                )}
                                
                                </div>
                            </Col>

                          
                        {/* </Row> */}
                </div>
            </Col>
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
            <Col className="home_details_box"  span={12}>
                    <Title level={5}>
                        <div className="title">
                        {videoDetails.desc.slice(0,50)}...
                        </div>
                    </Title>
                </Col>

                <Col className="home_details_box" span={12}><Statistic valueStyle={{color:'white'}} title="Total Comment Count" value={millify(videoDetails?.statistics?.comment_count)}/></Col>
                <Col className="home_details_box"  span={12}><Statistic valueStyle={{color:'white'}} title="Total Follower's" value={millify(videoDetails?.statistics?.digg_count)}/></Col>
                <Col className="home_details_box"  span={12}><Statistic valueStyle={{color:'white'}} title="Total Download Count" value={millify(videoDetails?.statistics?.download_count)}/></Col>
                <Col className="home_details_box" span={12}><Statistic valueStyle={{color:'white'}} title="Total Views" value={millify(videoDetails?.statistics?.play_count)}/></Col>
                <Col className="home_details_box"  span={12}><Statistic valueStyle={{color:'white'}} title="Total Shares" value={millify(videoDetails?.statistics?.share_count)}/></Col>
                <Col className="home_details_box"  span={12}><Statistic valueStyle={{color:'white'}} title="Total Whatsapp Share" value={millify(videoDetails?.statistics?.whatsapp_share_count)}/></Col>
                
            </Col>
                
            </Row>
        </div>
        {/* <div className="banner--fadeBottom" /> */}
    </header>






    
    
    
    
    
    
    </div>
  )
}

export default VideoDetails