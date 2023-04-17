import React, { useEffect, useState } from 'react'
import {useRelatedVideosQuery,useVideoDetailsQuery,useChannelDetailsQuery,useChannelVideosQuery} from '../services/youtubeApi'
import { Typography, Row, Col, Statistic, Image, Card,Input, Avatar, Button, Collapse  } from 'antd';
import { Link,useParams } from 'react-router-dom';
import Loader from './Loader';
import moment from 'moment';
import millify from 'millify';
import { CommentOutlined, EyeFilled, LikeFilled } from '@ant-design/icons';


const { Search } = Input;
const { Meta } = Card;
const {Text,Title} = Typography
const { Panel } = Collapse;


const ChannelDetails = () => {
    const params = useParams();
    const {id} = params

  const {data,isFetching} = useChannelVideosQuery({id:id})
  const {data:channelDetail} = useChannelDetailsQuery({id:id})

  const channelData = data?.items
  const channelDetails = channelDetail?.items[0]

  if(isFetching) return <Loader />


  return (
    <div>
    <Row gutter={[10,10]}>
        <Col span={24}>
        <div className="banner">
            <header
            className='banner'
            style={{
                backgroundSize : "cover",
                backgroundPosition:"center center",
                backgroundImage : `url("${channelDetails?.brandingSettings?.image?.bannerExternalUrl}")`,
            }}
            >

            <div className="banner--fadeBottom-channel" />
            </header>

            </div>
        </Col>
    </Row>

    <Row>
        <Col span={24} style={{marginTop:'40px'}}>
            <div className="channel_head">
                <div className="channel_head_left channelDetail_heads">
                    <div className="channel_avatar">
                        <Avatar src={channelDetails?.snippet?.thumbnails?.high?.url} size={128} className="banner_avatar_imgs" />
                    </div>
                    <div className="channelDetail_head2">
                        <Text className="channel_names hh">{channelDetails?.snippet?.title}</Text>
                        <Text className="channel_names2 hh">{millify(channelDetails?.statistics?.subscriberCount)}&nbsp;subscribers</Text>
                    </div>
                </div>

                <div className="channel_head_right">
                    <Button className="btn_subs" type="primary" danger target="_blank" href={`https://www.youtube.com/c/${''}`}>
                        Subscribe
                    </Button>
                </div>
            </div>
        </Col>
    </Row>

    <Row>
    {channelData?.map(item=>(
            <Col xs={24} sm={12} lg={6}  style={{padding:'20px',paddingLeft:'25px'}}>
                <Link to={`/yt/${item?.id?.videoId}`} style={{display: 'flex', justifyContent:'center'}}>
                <Card
                    style={{ width: 300 }}
                    hoverable
                    cover={
                    <img
                        alt="example"
                        src={item?.snippet?.thumbnails?.high?.url}
                    />
                    }
                >
                    <Meta
                    className="cardItem"
                    avatar={<Avatar src={item?.snippet?.thumbnails?.default?.url} />}
                    title={item?.snippet?.title}
                    description={item?.snippet?.description.slice(0,20)}
                    />
                     <Meta
                     className="cardItem"
                     style={{paddingLeft:"47px", paddingTop:'5px'}}
                    description={moment(item?.snippet?.publishedAt).startOf('ss').fromNow()}
                    />
                </Card>
                </Link>
            </Col>
        ))}
    </Row>

    </div>
  )
}

export default ChannelDetails