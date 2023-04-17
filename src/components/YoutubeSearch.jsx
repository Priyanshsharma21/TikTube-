import React, { useState } from 'react'
import {useSearchVideoQuery} from '../services/youtubeApi'
import { Typography, Row, Col, Statistic, Image, Card,Input, Avatar  } from 'antd';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import moment from 'moment';


const { Search } = Input;
const { Meta } = Card;
const {Text} = Typography

const YoutubeSearch = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchQueryFinal, setSearchQueryFinal] = useState('justin bieber')
    const handleSearch = ()=>{
        setSearchQueryFinal(searchQuery)
    }

    const {data, isFetching} = useSearchVideoQuery({query:searchQueryFinal})
    const items = data?.items

    if (isFetching) return <Loader />;


  return (
    <>
    <Row gutter={[10,10]}>
        <Col lg={24} sm={20} xs={20} style={{padding:'20px',paddingLeft:'25px'}}>
            <Search 
            placeholder="input search text" 
            onPressEnter={handleSearch} 
            onChange={(e)=>setSearchQuery(e.target.value)} 
            enterButton />
        </Col>
        {items?.map(item=>(
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
    
    </>
  )
}

export default YoutubeSearch


