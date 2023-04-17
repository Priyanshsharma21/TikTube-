import React, { useEffect, useRef, useState } from 'react'
import {useSearchTweetsQuery} from '../services/tweetApi'
import { Typography, Row, Col, Statistic, Image, Card,Input, Avatar, Button, Collapse,Comment, Tooltip   } from 'antd';
import { Link,useParams } from 'react-router-dom';
import Loader from './Loader';
import moment from 'moment';
import millify from 'millify';
import { CommentOutlined, EyeFilled, LikeFilled,DislikeFilled, DislikeOutlined, LikeOutlined  } from '@ant-design/icons';
import demo from '../assets/pexels-marek-mucha-13339565.jpg'
import Video from './Video';


const { Search } = Input;
const { Meta } = Card;
const {Text,Title} = Typography
const { Panel } = Collapse;





const TweetSearch = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchQueryFinal, setSearchQueryFinal] = useState('trending')
    const handleSearch = ()=>{
        setSearchQueryFinal(searchQuery)
    }
    const [playing, setPlaying] = useState(false)
    const videoRef = useRef(null)
    const onVideoPress=()=>{
        if(playing){
            videoRef.current.pause()
            setPlaying(false)
        }else{
            videoRef.current.play()
            setPlaying(true)
        }
    }


    const {data,isFetching} = useSearchTweetsQuery({query:searchQueryFinal})
    const tweets = data?.globalObjects?.tweets
    const users = data?.globalObjects?.users

    // console.log(tweets)



    if(isFetching) return <Loader />
    


// console.log(users)

  return (
    <>
        <Row gutter={[10,10]}>
            <Col span={24} style={{padding:'20px',paddingLeft:'25px'}}>
                <Search 
                placeholder="Search User" 
                onPressEnter={handleSearch} 
                onChange={(e)=>setSearchQuery(e.target.value)} 
                enterButton />
            </Col>
        </Row>

        <Row gutter={[10,10]}>
            <Col span={24} style={{padding:'20px',paddingLeft:'25px'}}>
                <div className="home-heading-container">
                    <Title level={2} className="home-title">Latest Tweets</Title>
                </div>
            </Col>
        </Row>

        <Row gutter={[10,10]}>
            {Object.keys(tweets)?.map(tweet=>(
                <Col key={tweet?.user_id} span={24} className="tweeterCol" style={{padding:'20px',paddingLeft:'45px', display: 'flex', justifyContent: 'flex-start',alignItems:'flex-start',flexDirection:'column'}}>
                    {console.log(tweets[tweet])}
                    <Link to={`/tweetuser/${tweets[tweet].user_id}`}>
                    <Comment
                    author={<a>{tweets[tweet]?.card?.name ? tweets[tweet]?.card?.name : 'User'}</a>}
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                    content={
                        <p>
                        {tweets[tweet]?.full_text}
                        </p>
                    }
                    datetime={
                        <Tooltip title={moment().format()}>
                        <span>{moment(tweets[tweet]?.created_at).startOf('ss').fromNow()}</span>
                        </Tooltip>
                    }
                    />
                    </Link>

                    {tweets[tweet]?.entities?.hashtags[0]?.text &&(
                        <div className="hashtag">
                            {tweets[tweet]?.entities?.hashtags?.map(hash=>(
                                <div className="tag">
                                    #{hash?.text}
                                </div>
                            ))}
                        </div>
                    )}

                    {tweets[tweet]?.extended_entities?.media[0].media_url &&(
                        <div className="tweet_any_image" style={{padding:'10px',paddingLeft:'40px'}}>
                           {tweets[tweet]?.extended_entities?.media[0]?.type==='photo' ? (<>
                            <Image 
                                width={400}
                                height={300}
                                src={tweets[tweet]?.extended_entities?.media[0].media_url}
                                />
                           </>):(
                            <>
                               <Video 
                               key={tweets[tweet]?.user_id} 
                               videoUrl={tweets[tweet]?.extended_entities?.media[0].video_info?.variants[0].url} />
                            </>
                           )}
                        </div>
                    )}

                    
                  
                </Col>
            ))}
        </Row>
    </>
  )
}

export default TweetSearch



{/*  */}