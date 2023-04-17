import React, { useEffect, useRef, useState } from 'react'
import {useUserByIdQuery,useUserTweetsQuery} from '../services/tweetApi'
import { Typography, Row, Col, Statistic, Image, Card,Input, Avatar, Button, Collapse,Comment, Tooltip   } from 'antd';
import { Link,useParams } from 'react-router-dom';
import Loader from './Loader';
import moment from 'moment';
import millify from 'millify';
import { CommentOutlined, EyeFilled, LikeFilled,DislikeFilled, DislikeOutlined, LikeOutlined  } from '@ant-design/icons';
import demo from '../assets/pexels-marek-mucha-13339565.jpg'
import Video from './Video';
import {GoVerified} from 'react-icons/go'
import {AiOutlineCalendar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'

const { Search } = Input;
const { Meta } = Card;
const {Text,Title} = Typography
const { Panel } = Collapse;



const TweetUserDetail = () => {
    const params = useParams();
    const {id} = params

    const {data,isFetching} = useUserByIdQuery({id:id})
    // const {data:userT} = useUserTweetsQuery({id:id})
    // console.log(userT)
    const userData = data?.data?.user?.result

    // console.log(userData)

    if(isFetching) return <Loader />


  return (
    <div>
    <Row gutter={[10,10]}>
        <Col span={24} >
        <div className="banner" style={{paddingLeft:'10px'}}>
            <header
            className='banner'
            style={{
                backgroundSize : "cover",
                backgroundPosition:"center center",
                backgroundImage : `url("${userData?.legacy?.profile_banner_url}")`,
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
                <div className="channel_head_left channelDetail_head">
                    <div className="channel_avatars">
                        <Avatar src={userData?.legacy?.profile_image_url_https} size={128} className="banner_avatar_imgss" />
                    </div>
                </div>

                <div className="channel_head_rights">
                    <Button className="btn_subs" type="primary" danger target="_blank" href={`https://www.youtube.com/c/${''}`}>
                        Follow
                    </Button>
                </div>
            </div>
        </Col>
    </Row>
    <Row>
        <Col span={24} style={{marginLeft:'40px'}}>
            <div className="channelDetail_head2">
                <Text className="tweet_detail_name">{userData?.legacy?.name}{userData?.legacy?.verified ? <GoVerified /> : ''}</Text>
                <Text className="tweet_detail_desc">@{userData?.legacy?.screen_name}</Text>
            </div>
        </Col>
    </Row>

    <Row>
        <Col span={24} style={{marginLeft:'40px'}}>
            <div className="channelDetail_head2">
                <Text className="tweet_detail_desc descc">{userData?.legacy?.description}</Text>
            </div>
        </Col>
    </Row>

    <Row>
        <Col span={24} style={{marginLeft:'53px', marginTop:'15px'}}>
            <div className="tweet_detail_row3_details">
                <Text className="tweet_detail_desc des2"><GoLocation className="icons"/>&nbsp;{userData?.legacy?.location}</Text>
                <Text className="tweet_detail_desc"><AiOutlineCalendar className="icons"/>&nbsp;Joined {moment(userData?.legacy?.created_at).startOf('ss').fromNow()}</Text>
            </div>
        </Col>
    </Row>

    <Row>
        <Col span={24} style={{marginLeft:'53px', marginTop:'15px'}}>
            <div className="tweet_detail_row3_details">
            <Text className="channel_names2 hh">{millify(userData?.legacy?.media_count)}&nbsp;Media Count</Text>
            <Text className="channel_names2 hh" style={{marginLeft:'20px'}}>{millify(userData?.legacy?.followers_count)}&nbsp;Followers</Text>
            </div>
        </Col>
    </Row>
    </div>
  )
}

export default TweetUserDetail