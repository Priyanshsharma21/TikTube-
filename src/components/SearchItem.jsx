import React, { useEffect, useRef, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'
import { Card, Row, Col,Input, Space, Select, Button } from 'antd';
import { AudioOutlined,CommentOutlined,EyeOutlined, PlayCircleTwoTone, ShareAltOutlined, UserOutlined, YoutubeOutlined  } from '@ant-design/icons';
import {searchCategory} from '../assets/constant'
import { useGetCategorySearchQuery } from '../services/appApi';
import { useGetFeedQuery } from '../services/appApi';
import Loader from './Loader';
import demo from '../assets/pexels-marek-mucha-13339565.jpg'


const { Search } = Input;
const { Option } = Select;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);






const SearchItem = ({simplified}) => {

  const [searchCategoryList, setSearchCategoryList] = useState('video')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchQueryFinal, setSearchQueryFinal] = useState('cats')
  const handleSearch = ()=>{
    setSearchQueryFinal(searchQuery)
  }

  const { data: items, isFetching } = useGetCategorySearchQuery({cato:searchCategoryList,query:searchQueryFinal});
  const results = items?.aweme_list
  const music = items?.music
  const users = items?.user_list
  const top = items?.data
  const challanges = items?.challenge_list

  if (isFetching) return <Loader />;

  console.log(items)


  return (
  <div>

  <Row  gutter={[10,10]} style={{padding:'20px',paddingLeft:'60px'}}>
    <Space>
    <Col lg={4} sm={3} xs={3}>
    <Select
        className='select-news' 
        placeholder="Search Category" 
        optionFilterProp="children"
        onChange={(value)=>setSearchCategoryList(value)}
        filterOption={(input, option)=>option.children.toLowerCase().indexOf(input.toLowerCase())>= 0}
        >

        <Option>video</Option>
        {searchCategory.map((cato)=><Option value={cato}>{cato}</Option>)}
        </Select>
    </Col>

    <Col lg={24} sm={20} xs={20}>
      <Search placeholder="input search text" onPressEnter={handleSearch} onChange={(e)=>setSearchQuery(e.target.value)} enterButton />
    </Col>
    </Space>
  </Row>




  <Row gutter={[10,10]} style={{padding:'20px', paddingLeft:'60px'}}>
    
        {items?.aweme_list &&(
          <>
          {results?.map(result=>(
        <Col xs={24} sm={12} lg={6}>
          <Link to={`/video/${result?.aweme_id}`}>



          <div className="card_home"
          style={{
              width: 240,
              minHeight : '400px',
              marginTop:30,
              marginBottom:20,
              marginLeft:20,
              borderRadius:50,
              backgroundImage : `linear-gradient(to right, #00000080 0%, #0e003d80 60%, #35003d80 100%), url("${result.video?.cover.url_list[0] ? result.video?.cover?.url_list[0]:demo}")`,
              backgroundSize : 'cover',
              backgroundPosition : 'center center',
              border : '1px solid white',
            }}
          >
            <div className="video_detailssearch__home_shorts">
              <div className=" search_on_details">
              <EyeOutlined />&nbsp;{millify(result?.statistics?.play_count)}
              </div>
              <div className=" search_on_details">
              <CommentOutlined />&nbsp;{millify(result?.statistics?.comment_count)}
              </div>
              <div className=" search_on_details" >
              <ShareAltOutlined />&nbsp;{millify(result?.statistics?.share_count)}
              </div>
            </div>
          </div>

          </Link>
          </Col>
      ))}
          </>
        )}



        {items?.music ?(
          <>
          {music?.map(result=>(
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            style={{ width: 220 }}
            cover={<img alt="example" className="search_img" src={result.cover_large?.url_list[0] ? result.cover_large?.url_list[0]:demo} />}
          >
          <p>{result?.album}</p>
          <div className="audio">
           <audio src={result?.play_url?.url_list[0]} controls />
          </div>

          </Card>
          </Col>
      ))}
          </>
        ):(
          <div className="message">
            No Music Found For This
          </div>
        )}



        {items?.user_list &&(
          <>
          {users?.map(result=>(
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            style={{ width: 220 }}
            cover={<img 
            alt="example" 
            className="search_img" 
            src={result?.user_info.avatar_larger?.url_list[0] || result?.user_info.avatar_larger?.url_list[1]? result?.user_info?.avatar_larger?.url_list[0]:demo} />}
          >
          <p>{result?.user_info?.nickname}</p>
          <p>{millify(result?.user_info?.follower_count)}</p>

          {result?.user_info?.youtube_channel_id &&(
                    <div className="youtube">
                        <Button type="primary" danger target="_blank" href={`https://www.youtube.com/channel/${result?.user_info.youtube_channel_id}`}>
                        <YoutubeOutlined />-{result?.user_info?.youtube_channel_title.slice(0,10)}...
                        </Button>
                    </div>
                )}
              
              </Card>
              </Col>
          ))}
          </>
        )}




        {items?.data &&(
          <>
          {top?.map(result=>(
        <Col xs={24} sm={12} lg={6}>
          <Link to={`/video/${result?.aweme_info?.aweme_id}`}>
          <div className="card_home"
          style={{
              width: 240,
              minHeight : '400px',
              marginTop:30,
              marginBottom:20,
              marginLeft:20,
              borderRadius:50,
              backgroundImage : `linear-gradient(to right, #00000080 0%, #0e003d80 60%, #35003d80 100%), url("${result?.aweme_info?.video?.cover.url_list[0] ? result?.aweme_info?.video?.cover.url_list[0]:demo}")`,
              backgroundSize : 'cover',
              backgroundPosition : 'center center',
              border : '1px solid white',
            }}
          >
            <div className="video_detailssearch__home_shorts">
              <div className=" search_on_details">
              <EyeOutlined />&nbsp;{millify(result?.aweme_info?.statistics?.play_count)}
              </div>
              <div className=" search_on_details">
              <CommentOutlined />&nbsp;{millify(result?.aweme_info?.statistics?.comment_count)}
              </div>
              <div className=" search_on_details" >
              <ShareAltOutlined />&nbsp;{millify(result?.aweme_info?.statistics?.share_count)}
              </div>
            </div>
          </div>
          </Link>
          </Col>
      ))}
          </>
        )}











        {items?.challenge_list &&(
          <>
          {challanges?.map(result=>(
        <Col xs={24} sm={12} lg={6}>
          <div className="hasmap">
            <p>{result?.challenge_info?.cha_name.slice(0,20)}...</p>
            <p><EyeOutlined />&nbsp;{millify(result?.challenge_info?.view_count)}</p>
            <p><UserOutlined />&nbsp;{millify(result?.challenge_info?.user_count)}</p>
          </div>
          </Col>
      ))}
          </>
        )}



      
  </Row>
        
  </div>



  )
}

export default SearchItem
































